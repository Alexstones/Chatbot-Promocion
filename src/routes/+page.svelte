<script lang="ts">
	import { onMount } from 'svelte';

	interface Message {
		role: 'user' | 'assistant';
		content: string;
		buttons?: Array<{ id: string; title: string }>;
		list?: {
			buttonText: string;
			sections: Array<{
				title: string;
				rows: Array<{ id: string; title: string; description?: string }>;
			}>;
		};
	}

	let messages = $state<Message[]>([]);
	let inputValue = $state('');
	let loading = $state(false);
	let whatsappNumber = $state('521234567890');
	let contactName = $state('Usuario Prueba');

	onMount(() => {
		// Start conversation with a greeting
		sendGreeting();
	});

	async function sendGreeting() {
		loading = true;
		try {
			const res = await fetch('/api/whatsapp/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: 'Hola',
					whatsappNumber,
					contactName,
					messageType: 'text'
				})
			});
			const data = await res.json();
			if (data.success && data.result) {
				messages = [
					{
						role: 'assistant',
						content: data.result.text,
						buttons: data.result.buttons,
						list: data.result.list
					}
				];
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	async function handleSendMessage(text: string, type: 'text' | 'button_reply' | 'list_reply' = 'text', buttonId?: string) {
		if (!text.trim() && type === 'text') return;

		// Add user message to UI
		messages = [...messages, { role: 'user', content: text }];
		const userMsg = text;
		inputValue = '';
		loading = true;

		try {
			const res = await fetch('/api/whatsapp/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMsg,
					whatsappNumber,
					contactName,
					messageType: type,
					buttonId
				})
			});
			const data = await res.json();
			if (data.success && data.result) {
				messages = [
					...messages,
					{
						role: 'assistant',
						content: data.result.text,
						buttons: data.result.buttons,
						list: data.result.list
					}
				];
			} else {
				messages = [
					...messages,
					{
						role: 'assistant',
						content: '⚠️ Error al conectar con el motor del chatbot. Verifica la configuración de Supabase u Ollama.'
					}
				];
			}
		} catch (e) {
			messages = [
				...messages,
				{
					role: 'assistant',
					content: '⚠️ Error de red. Asegúrate de tener Ollama activo si no estás usando una API Key de DeepSeek.'
				}
			];
		} finally {
			loading = false;
			// Scroll to bottom
			setTimeout(() => {
				const container = document.getElementById('chat-container');
				if (container) container.scrollTop = container.scrollHeight;
			}, 50);
		}
	}
</script>

<main class="app-layout">
	<header class="navbar">
		<div class="logo">
			<span class="logo-icon">🤖</span>
			<div>
				<h1>Chatbot Promoción (WhatsApp Web Tester)</h1>
				<p>Prueba el flujo del chatbot de WhatsApp en vivo</p>
			</div>
		</div>
		<div class="settings">
			<label>
				<span>Número:</span>
				<input type="text" bind:value={whatsappNumber} />
			</label>
			<label>
				<span>Nombre:</span>
				<input type="text" bind:value={contactName} />
			</label>
		</div>
	</header>

	<div class="chat-wrapper">
		<div class="chat-box" id="chat-container">
			{#each messages as msg}
				<div class="message-row {msg.role}">
					<div class="avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
					<div class="message-bubble">
						<div class="message-text">{msg.content}</div>

						<!-- Buttons layout -->
						{#if msg.buttons && msg.buttons.length > 0}
							<div class="interactive-buttons">
								{#each msg.buttons as btn}
									<button class="action-btn" onclick={() => handleSendMessage(btn.title, 'button_reply', btn.id)}>
										{btn.title}
									</button>
								{/each}
							</div>
						{/if}

						<!-- List layout -->
						{#if msg.list}
							<div class="interactive-list">
								<div class="list-title">📋 {msg.list.buttonText}</div>
								{#each msg.list.sections as section}
									<div class="section-group">
										<div class="section-title">{section.title}</div>
										{#each section.rows as row}
											<button class="list-row-btn" onclick={() => handleSendMessage(row.title, 'list_reply', row.id)}>
												<div class="row-title">{row.title}</div>
												{#if row.description}
													<div class="row-desc">{row.description}</div>
												{/if}
											</button>
										{/each}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}

			{#if loading}
				<div class="message-row assistant loading-row">
					<div class="avatar">🤖</div>
					<div class="message-bubble typing-bubble">
						<span class="dot"></span>
						<span class="dot"></span>
						<span class="dot"></span>
					</div>
				</div>
			{/if}
		</div>

		<div class="input-panel">
			<input
				type="text"
				placeholder="Escribe un mensaje aquí..."
				bind:value={inputValue}
				onkeydown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
			/>
			<button class="send-btn" onclick={() => handleSendMessage(inputValue)}>Enviar</button>
		</div>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
		background: #0f172a;
		color: #e2e8f0;
	}

	.app-layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
		max-width: 900px;
		margin: 0 auto;
		background: #1e293b;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
	}

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 24px;
		background: #0f172a;
		border-bottom: 1px solid #334155;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-icon {
		font-size: 32px;
	}

	.logo h1 {
		margin: 0;
		font-size: 18px;
		font-weight: 700;
		color: #38bdf8;
	}

	.logo p {
		margin: 2px 0 0 0;
		font-size: 12px;
		color: #94a3b8;
	}

	.settings {
		display: flex;
		gap: 16px;
	}

	.settings label {
		display: flex;
		flex-direction: column;
		font-size: 11px;
		color: #94a3b8;
	}

	.settings input {
		background: #1e293b;
		border: 1px solid #334155;
		color: #fff;
		padding: 4px 8px;
		border-radius: 4px;
		margin-top: 4px;
		font-size: 12px;
		outline: none;
	}

	.chat-wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
	}

	.chat-box {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
		background: radial-gradient(circle at top, #1e293b 0%, #0f172a 100%);
	}

	.message-row {
		display: flex;
		gap: 12px;
		max-width: 80%;
	}

	.message-row.user {
		align-self: flex-end;
		flex-direction: row-reverse;
	}

	.message-row.assistant {
		align-self: flex-start;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #334155;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		flex-shrink: 0;
	}

	.message-row.user .avatar {
		background: #0ea5e9;
	}

	.message-bubble {
		background: #1e293b;
		border: 1px solid #334155;
		padding: 12px 16px;
		border-radius: 16px;
		border-top-left-radius: 4px;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.message-row.user .message-bubble {
		background: #0ea5e9;
		color: #fff;
		border: none;
		border-radius: 16px;
		border-top-right-radius: 4px;
	}

	.message-text {
		font-size: 14px;
		line-height: 1.5;
		white-space: pre-wrap;
	}

	.interactive-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 4px;
	}

	.action-btn {
		background: #38bdf8;
		color: #0f172a;
		border: none;
		padding: 8px 16px;
		border-radius: 9999px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background: #0ea5e9;
		color: #fff;
		transform: translateY(-1px);
	}

	.interactive-list {
		background: #0f172a;
		border-radius: 8px;
		border: 1px solid #334155;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 4px;
	}

	.list-title {
		font-size: 12px;
		font-weight: 700;
		color: #94a3b8;
		padding: 4px 8px;
		border-bottom: 1px solid #1e293b;
	}

	.section-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.section-title {
		font-size: 10px;
		font-weight: 700;
		color: #64748b;
		padding: 4px 8px 2px 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.list-row-btn {
		background: transparent;
		border: none;
		text-align: left;
		padding: 8px;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s;
		width: 100%;
	}

	.list-row-btn:hover {
		background: #1e293b;
	}

	.row-title {
		font-size: 13px;
		font-weight: 600;
		color: #38bdf8;
	}

	.row-desc {
		font-size: 11px;
		color: #94a3b8;
		margin-top: 2px;
	}

	.input-panel {
		display: flex;
		padding: 16px 24px;
		background: #0f172a;
		border-top: 1px solid #334155;
		gap: 12px;
	}

	.input-panel input {
		flex: 1;
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		padding: 12px 16px;
		color: #fff;
		outline: none;
		font-size: 14px;
	}

	.input-panel input:focus {
		border-color: #38bdf8;
	}

	.send-btn {
		background: #38bdf8;
		color: #0f172a;
		border: none;
		border-radius: 8px;
		padding: 0 20px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.send-btn:hover {
		background: #0ea5e9;
	}

	/* Typing Indicator */
	.typing-bubble {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 10px 16px;
	}

	.dot {
		width: 6px;
		height: 6px;
		background: #94a3b8;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.dot:nth-child(1) { animation-delay: -0.32s; }
	.dot:nth-child(2) { animation-delay: -0.16s; }

	@keyframes bounce {
		0%, 80%, 100% { transform: scale(0); }
		40% { transform: scale(1.0); }
	}
</style>
