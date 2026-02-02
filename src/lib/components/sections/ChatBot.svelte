<script lang="ts">
	import { getTranslations, getLanguage } from "$lib/i18n/index.svelte";
	import { fly, fade } from "svelte/transition";

	const t = getTranslations();

	interface Message {
		role: "user" | "assistant";
		content: string;
		model?: string;
		bookingCreated?: boolean;
		meetLink?: string;
	}

	// Single free model with high limits (256K context, no daily caps)
	const MODEL_ID = "stepfun/step-3.5-flash:free";

	let messages = $state<Message[]>([]);
	let inputValue = $state("");
	let isLoading = $state(false);
	let chatContainer = $state<HTMLDivElement | null>(null);
	let isExpanded = $state(false);

	const suggestedQuestions = $derived(
		getLanguage() === "es"
			? [
					"¿Cómo funciona el desarrollo gratis?",
					"¿Cómo defino mi modelo de negocio?",
					"Quiero agendar una reunión",
					"¿Qué servicios ofreces?",
				]
			: [
					"How does free development work?",
					"How do I define my business model?",
					"I want to book a meeting",
					"What services do you offer?",
				],
	);

	async function sendMessage(content: string) {
		if (!content.trim() || isLoading) return;

		const userMessage: Message = { role: "user", content: content.trim() };
		messages = [...messages, userMessage];
		inputValue = "";
		isLoading = true;
		isExpanded = true;

		// Scroll to bottom
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 50);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: messages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
					language: getLanguage(),
					model: MODEL_ID,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();
			const assistantMessage: Message = {
				role: "assistant",
				content: data.message,
				bookingCreated: data.bookingCreated || false,
				meetLink: data.meetLink,
			};

			if (data.bookingCreated) {
				chatEmotion = "happy";
				// Reset emotion after 30 seconds
				setTimeout(() => {
					chatEmotion = "neutral";
				}, 30000);
			}

			messages = [...messages, assistantMessage];
		} catch (error) {
			console.error("Chat error:", error);
			chatEmotion = "sad";
			setTimeout(() => {
				chatEmotion = "neutral";
			}, 5000);
			const errorMessage: Message = {
				role: "assistant",
				content:
					getLanguage() === "es"
						? "Lo siento, hubo un error. Por favor, intenta de nuevo o reserva una llamada directamente."
						: "Sorry, there was an error. Please try again or book a call directly.",
			};
			messages = [...messages, errorMessage];
		} finally {
			isLoading = false;
			// Scroll to bottom after response
			setTimeout(() => {
				if (chatContainer) {
					chatContainer.scrollTop = chatContainer.scrollHeight;
				}
			}, 50);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage(inputValue);
		}
	}

	import Eyes from "$lib/components/ui/Eyes.svelte";

	let chatState = $state<"idle" | "typing" | "thinking">("idle");
	let chatEmotion = $state<"neutral" | "happy" | "sad">("happy");

	$effect(() => {
		if (isLoading) {
			chatState = "thinking";
			chatEmotion = "neutral";
		} else if (inputValue.trim().length > 0 && isFocused) {
			chatState = "typing";
			chatEmotion = "neutral";
		} else {
			chatState = "idle";
		}
	});

	let isFocused = $state(false);
</script>

<section class="py-16 px-4">
	<div class="max-w-3xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-6">
			<h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
				{getLanguage() === "es"
					? "¿Tienes preguntas?"
					: "Got questions?"}
			</h2>
			<p class="text-dark-300">
				{getLanguage() === "es"
					? "Pregúntame lo que quieras sobre mis servicios"
					: "Ask me anything about my services"}
			</p>
		</div>

		<!-- Interactive Eyes -->
		<div class="mb-4">
			<Eyes interactionState={chatState} emotion={chatEmotion} />
		</div>

		<!-- Chat Container -->
		<div
			class="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl overflow-hidden transition-all duration-300"
			class:h-[500px]={isExpanded}
			class:h-auto={!isExpanded}
		>
			<!-- Messages Area -->
			{#if messages.length > 0}
				<div
					bind:this={chatContainer}
					class="p-4 space-y-4 overflow-y-auto"
					class:h-[380px]={isExpanded}
					class:max-h-[300px]={!isExpanded}
				>
					{#each messages as message, i (i)}
						<div
							class="flex flex-col"
							class:items-end={message.role === "user"}
							in:fly={{ y: 10, duration: 200 }}
						>
							{#if message.role === "assistant" && message.model}
								<span class="text-xs text-dark-500 mb-1 ml-1"
									>{message.model}</span
								>
							{/if}
							<div
								class="max-w-[85%] px-4 py-3 rounded-2xl {message.role ===
								'user'
									? 'bg-primary-500 text-white rounded-br-md'
									: message.bookingCreated
										? 'bg-emerald-900/50 border border-emerald-500/30 text-dark-100 rounded-bl-md'
										: 'bg-dark-800 text-dark-100 rounded-bl-md'}"
							>
								{#if message.bookingCreated}
									<div
										class="flex items-center gap-2 mb-2 text-emerald-400"
									>
										<span
											class="material-icons-round text-lg"
											>event_available</span
										>
										<span class="text-sm font-medium">
											{getLanguage() === "es"
												? "¡Reunión confirmada!"
												: "Meeting confirmed!"}
										</span>
									</div>
								{/if}
								<p class="text-sm whitespace-pre-wrap">
									{message.content}
								</p>
								{#if message.meetLink}
									<a
										href={message.meetLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1 mt-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
									>
										<span
											class="material-icons-round text-sm"
											>videocam</span
										>
										{getLanguage() === "es"
											? "Enlace a Google Meet"
											: "Google Meet link"}
									</a>
								{/if}
							</div>
						</div>
					{/each}

					{#if isLoading}
						<div class="flex" in:fade>
							<div
								class="bg-dark-800 px-4 py-3 rounded-2xl rounded-bl-md"
							>
								<div class="flex gap-1">
									<span
										class="w-2 h-2 bg-dark-400 rounded-full animate-bounce"
									></span>
									<span
										class="w-2 h-2 bg-dark-400 rounded-full animate-bounce"
										style="animation-delay: 0.1s"
									></span>
									<span
										class="w-2 h-2 bg-dark-400 rounded-full animate-bounce"
										style="animation-delay: 0.2s"
									></span>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Suggested Questions (only when no messages) -->
			{#if messages.length === 0}
				<div class="p-4">
					<p class="text-dark-400 text-sm mb-3">
						{getLanguage() === "es"
							? "Sugerencias:"
							: "Suggestions:"}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each suggestedQuestions as question}
							<button
								onclick={() => sendMessage(question)}
								class="px-3 py-2 text-sm bg-dark-800 hover:bg-dark-700 text-dark-200 hover:text-white rounded-full transition-colors border border-dark-700 hover:border-primary-500/50"
							>
								{question}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Input Area -->
			<div class="p-4 border-t border-dark-700">
				<div class="flex gap-3">
					<input
						type="text"
						bind:value={inputValue}
						onfocus={() => (isFocused = true)}
						onblur={() => (isFocused = false)}
						onkeydown={handleKeydown}
						placeholder={getLanguage() === "es"
							? "Escribe tu pregunta..."
							: "Type your question..."}
						disabled={isLoading}
						class="flex-1 bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
					/>
					<button
						onclick={() => sendMessage(inputValue)}
						disabled={isLoading || !inputValue.trim()}
						class="px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2"
					>
						<span class="material-icons-round">send</span>
					</button>
				</div>
			</div>
		</div>

	</div>
</section>
