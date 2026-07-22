import pg from 'pg';
import type { Lead, Conversation, Message, Quote } from '$lib/types/database';

const { Pool } = pg;

// Load config from environment or use local PostgreSQL default
// We will use standard postgres environment variables:
const PGHOST = process.env.PGHOST || 'localhost';
const PGPORT = parseInt(process.env.PGPORT || '5432');
const PGUSER = process.env.PGUSER || 'postgres';
const PGPASSWORD = process.env.PGPASSWORD || 'postgres'; // standard local password or change as needed
const PGDATABASE = process.env.PGDATABASE || 'postgres'; // default db

console.log(`🔌 Connecting to PostgreSQL at ${PGUSER}@${PGHOST}:${PGPORT}/${PGDATABASE}`);

const pool = new Pool({
	host: PGHOST,
	port: PGPORT,
	user: PGUSER,
	password: PGPASSWORD,
	database: PGDATABASE,
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
});

// ==================== IN-MEMORY STORAGE FOR MOCK TESTING ====================
const mockLeads: Record<string, Lead> = {};
const mockConversations: Record<string, Conversation> = {};
const mockMessages: Message[] = [];
const mockQuotes: Quote[] = [];

// Test connection and auto-run table initialization
const useInMemoryMock = !PGHOST || !PGUSER;
let isMockFallbackActive = useInMemoryMock;

try {
	pool.connect((err, client, release) => {
		if (err) {
			console.error('❌ Failed to connect to PostgreSQL. Falling back to In-Memory Mock Database.', err.message);
			isMockFallbackActive = true;
			return;
		}
		console.log('✅ Connected to PostgreSQL successfully!');
		
		// Create tables if they do not exist
		const initSql = `
			CREATE TABLE IF NOT EXISTS leads (
				id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
				whatsapp_number TEXT UNIQUE,
				name TEXT,
				company TEXT,
				city TEXT,
				email TEXT,
				business_type TEXT,
				products_services TEXT,
				vehicle_count INTEGER,
				vehicle_type TEXT,
				main_need TEXT,
				budget TEXT,
				implementation_date TEXT,
				requested_functions TEXT[],
				lead_score TEXT DEFAULT 'cold',
				channel TEXT DEFAULT 'whatsapp',
				status TEXT DEFAULT 'new',
				notes TEXT,
				created_at TIMESTAMPTZ DEFAULT NOW(),
				updated_at TIMESTAMPTZ DEFAULT NOW()
			);

			CREATE TABLE IF NOT EXISTS conversations (
				id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
				lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
				whatsapp_number TEXT,
				current_flow TEXT DEFAULT 'WELCOME',
				current_step TEXT,
				flow_data JSONB DEFAULT '{}',
				is_active BOOLEAN DEFAULT true,
				is_transferred BOOLEAN DEFAULT false,
				transferred_to TEXT,
				last_message_at TIMESTAMPTZ DEFAULT NOW(),
				created_at TIMESTAMPTZ DEFAULT NOW()
			);

			CREATE TABLE IF NOT EXISTS messages (
				id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
				conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
				whatsapp_number TEXT,
				direction TEXT NOT NULL,
				content TEXT NOT NULL,
				message_type TEXT DEFAULT 'text',
				whatsapp_message_id TEXT,
				intent_detected TEXT,
				metadata JSONB DEFAULT '{}',
				created_at TIMESTAMPTZ DEFAULT NOW()
			);

			CREATE TABLE IF NOT EXISTS quotes (
				id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
				lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
				conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
				business_type TEXT,
				requirements TEXT,
				vehicle_count INTEGER,
				functions_needed TEXT[],
				summary TEXT,
				status TEXT DEFAULT 'pending',
				created_at TIMESTAMPTZ DEFAULT NOW()
			);
		`;
		
		client.query(initSql, (err) => {
			release();
			if (err) {
				console.error('❌ Error creating tables:', err);
			} else {
				console.log('✅ PostgreSQL tables verified/created successfully!');
			}
		});
	});
} catch (connectError: any) {
	console.error('❌ Synchronous connect exception. Falling back to In-Memory Mock.', connectError.message);
	isMockFallbackActive = true;
}

export const supabase = null; // compatibility stub

// Helper to determine if we should execute queries on local pg or mock DB
function getDBMode() {
	return isMockFallbackActive;
}

// ==================== LEADS ====================

export async function findOrCreateLead(whatsappNumber: string, contactName?: string): Promise<Lead> {
	if (getDBMode()) {
		if (mockLeads[whatsappNumber]) {
			return mockLeads[whatsappNumber];
		}
		const newLead: Lead = {
			id: crypto.randomUUID(),
			whatsapp_number: whatsappNumber,
			name: contactName || null,
			company: null,
			city: null,
			email: null,
			business_type: null,
			products_services: null,
			vehicle_count: null,
			vehicle_type: null,
			main_need: null,
			budget: null,
			implementation_date: null,
			requested_functions: null,
			lead_score: 'cold',
			channel: 'whatsapp',
			status: 'new',
			notes: null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};
		mockLeads[whatsappNumber] = newLead;
		return newLead;
	}

	try {
		const res = await pool.query('SELECT * FROM leads WHERE whatsapp_number = $1', [whatsappNumber]);
		if (res.rows.length > 0) {
			return res.rows[0];
		}

		const insertRes = await pool.query(
			`INSERT INTO leads (whatsapp_number, name, channel, lead_score, status) 
			 VALUES ($1, $2, 'whatsapp', 'cold', 'new') 
			 RETURNING *`,
			[whatsappNumber, contactName || null]
		);
		return insertRes.rows[0];
	} catch (e) {
		console.error('Database query error (leads), falling back to mock:', e);
		isMockFallbackActive = true; // Switch to mock mode on first failure
		return findOrCreateLead(whatsappNumber, contactName);
	}
}

export async function updateLead(whatsappNumber: string, data: Record<string, any>): Promise<void> {
	if (getDBMode()) {
		if (mockLeads[whatsappNumber]) {
			mockLeads[whatsappNumber] = {
				...mockLeads[whatsappNumber],
				...data,
				updated_at: new Date().toISOString()
			};
		}
		return;
	}

	try {
		const keys = Object.keys(data);
		if (keys.length === 0) return;

		const setClause = keys.map((key, index) => {
			const colMap: Record<string, string> = {
				name: 'name',
				company: 'company',
				city: 'city',
				email: 'email',
				businessType: 'business_type',
				productsServices: 'products_services',
				vehicleCount: 'vehicle_count',
				vehicleType: 'vehicle_type',
				mainNeed: 'main_need',
				budget: 'budget',
				implementationDate: 'implementation_date',
				requestedFunctions: 'requested_functions',
				leadScore: 'lead_score',
				channel: 'channel',
				status: 'status',
				notes: 'notes'
			};
			const colName = colMap[key] || key;
			return `${colName} = $${index + 2}`;
		}).join(', ');

		const values = Object.values(data);
		await pool.query(
			`UPDATE leads SET ${setClause}, updated_at = NOW() WHERE whatsapp_number = $1`,
			[whatsappNumber, ...values]
		);
	} catch (e) {
		console.error('Database update error (leads):', e);
	}
}

export async function updateLeadScore(whatsappNumber: string, score: 'cold' | 'warm' | 'hot'): Promise<void> {
	await updateLead(whatsappNumber, { leadScore: score });
}

// ==================== CONVERSATIONS ====================

export async function findOrCreateConversation(whatsappNumber: string, leadId?: string): Promise<Conversation> {
	if (getDBMode()) {
		const existing = Object.values(mockConversations).find(
			(c) => c.whatsapp_number === whatsappNumber && c.is_active
		);
		if (existing) return existing;

		const newConvo: Conversation = {
			id: crypto.randomUUID(),
			lead_id: leadId || null,
			whatsapp_number: whatsappNumber,
			current_flow: 'WELCOME',
			current_step: null,
			flow_data: {},
			is_active: true,
			is_transferred: false,
			transferred_to: null,
			last_message_at: new Date().toISOString(),
			created_at: new Date().toISOString()
		};
		mockConversations[newConvo.id] = newConvo;
		return newConvo;
	}

	try {
		const res = await pool.query(
			`SELECT * FROM conversations 
			 WHERE whatsapp_number = $1 AND is_active = true 
			 ORDER BY created_at DESC LIMIT 1`,
			[whatsappNumber]
		);
		if (res.rows.length > 0) {
			const convo = res.rows[0];
			return {
				...convo,
				current_flow: convo.current_flow,
				current_step: convo.current_step,
				flow_data: convo.flow_data || {}
			};
		}

		const insertRes = await pool.query(
			`INSERT INTO conversations (whatsapp_number, lead_id, current_flow, current_step, flow_data, is_active, is_transferred) 
			 VALUES ($1, $2, 'WELCOME', null, '{}', true, false) 
			 RETURNING *`,
			[whatsappNumber, leadId || null]
		);
		const newConvo = insertRes.rows[0];
		return {
			...newConvo,
			flow_data: newConvo.flow_data || {}
		};
	} catch (e) {
		console.error('Database query error (conversations), falling back to mock:', e);
		isMockFallbackActive = true;
		return findOrCreateConversation(whatsappNumber, leadId);
	}
}

export async function updateConversation(conversationId: string, data: Record<string, any>): Promise<void> {
	if (getDBMode()) {
		if (mockConversations[conversationId]) {
			mockConversations[conversationId] = {
				...mockConversations[conversationId],
				...data,
				last_message_at: new Date().toISOString()
			};
		}
		return;
	}

	try {
		const keys = Object.keys(data);
		if (keys.length === 0) return;

		const setClause = keys.map((key, index) => {
			const colMap: Record<string, string> = {
				currentFlow: 'current_flow',
				current_flow: 'current_flow',
				currentStep: 'current_step',
				current_step: 'current_step',
				flowData: 'flow_data',
				flow_data: 'flow_data',
				isActive: 'is_active',
				is_active: 'is_active',
				isTransferred: 'is_transferred',
				is_transferred: 'is_transferred',
				transferredTo: 'transferred_to',
				transferred_to: 'transferred_to'
			};
			const colName = colMap[key] || key;
			return `${colName} = $${index + 2}`;
		}).join(', ');

		const values = Object.values(data);
		await pool.query(
			`UPDATE conversations SET ${setClause}, last_message_at = NOW() WHERE id = $1`,
			[conversationId, ...values]
		);
	} catch (e) {
		console.error('Database update error (conversations):', e);
	}
}

export async function getConversationHistory(conversationId: string, limit = 20): Promise<Message[]> {
	if (getDBMode()) {
		return mockMessages
			.filter((m) => m.conversation_id === conversationId)
			.slice(-limit);
	}

	try {
		const res = await pool.query(
			`SELECT * FROM messages 
			 WHERE conversation_id = $1 
			 ORDER BY created_at DESC LIMIT $2`,
			[conversationId, limit]
		);
		return res.rows.reverse();
	} catch (e) {
		console.error('Database query error (history):', e);
		return [];
	}
}

// ==================== MESSAGES ====================

export async function saveMessage(data: {
	conversation_id: string;
	whatsapp_number: string;
	direction: 'inbound' | 'outbound';
	content: string;
	message_type?: string;
	whatsapp_message_id?: string;
	intent_detected?: string;
	metadata?: Record<string, any>;
}): Promise<void> {
	if (getDBMode()) {
		const newMsg: Message = {
			id: crypto.randomUUID(),
			conversation_id: data.conversation_id,
			whatsapp_number: data.whatsapp_number,
			direction: data.direction,
			content: data.content,
			message_type: (data.message_type || 'text') as any,
			whatsapp_message_id: data.whatsapp_message_id || null,
			intent_detected: data.intent_detected || null,
			metadata: data.metadata || {},
			created_at: new Date().toISOString()
		};
		mockMessages.push(newMsg);
		return;
	}

	try {
		await pool.query(
			`INSERT INTO messages (conversation_id, whatsapp_number, direction, content, message_type, whatsapp_message_id, intent_detected, metadata) 
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				data.conversation_id,
				data.whatsapp_number,
				data.direction,
				data.content,
				data.message_type || 'text',
				data.whatsapp_message_id || null,
				data.intent_detected || null,
				JSON.stringify(data.metadata || {})
			]
		);
	} catch (e) {
		console.error('Database insert error (messages):', e);
	}
}

// ==================== QUOTES ====================

export async function createQuote(data: {
	lead_id: string;
	conversation_id: string;
	business_type?: string;
	requirements?: string;
	vehicle_count?: number;
	functions_needed?: string[];
	summary?: string;
}): Promise<Quote> {
	if (getDBMode()) {
		const newQuote: Quote = {
			id: crypto.randomUUID(),
			lead_id: data.lead_id,
			conversation_id: data.conversation_id,
			business_type: data.business_type || null,
			requirements: data.requirements || null,
			vehicle_count: data.vehicle_count || null,
			functions_needed: data.functions_needed || null,
			summary: data.summary || null,
			status: 'pending',
			created_at: new Date().toISOString()
		};
		mockQuotes.push(newQuote);
		return newQuote;
	}

	try {
		const res = await pool.query(
			`INSERT INTO quotes (lead_id, conversation_id, business_type, requirements, vehicle_count, functions_needed, summary, status) 
			 VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') 
			 RETURNING *`,
			[
				data.lead_id,
				data.conversation_id,
				data.business_type || null,
				data.requirements || null,
				data.vehicle_count || null,
				data.functions_needed || null,
				data.summary || null
			]
		);
		return res.rows[0];
	} catch (e) {
		console.error('Database insert error (quotes):', e);
		throw e;
	}
}
