<script lang="ts">
	import { getLanguage } from "$lib/i18n/index.svelte";
</script>

<svelte:head>
	<title>{getLanguage() === "es" ? "Política de Privacidad" : "Privacy Policy"} | SAV AI Tech</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-dark-950 py-16 px-4">
	<div class="max-w-3xl mx-auto">
		<a href="/" class="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8">
			<span class="material-icons-round">arrow_back</span>
			{getLanguage() === "es" ? "Volver al inicio" : "Back to home"}
		</a>

		{#if getLanguage() === "es"}
			<h1 class="text-3xl md:text-4xl font-bold text-white mb-8">Política de Privacidad</h1>

			<div class="prose prose-invert prose-lg max-w-none space-y-6 text-dark-200">
				<p class="text-dark-300 text-sm">Última actualización: Febrero 2026</p>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">1. Responsable del Tratamiento</h2>
					<ul class="list-none space-y-1">
						<li><strong>Identidad:</strong> Sergiy Alonso Villar</li>
						<li><strong>Actividad:</strong> Servicios de desarrollo de software y consultoría tecnológica</li>
						<li><strong>Email de contacto:</strong> contacto.savaitech@gmail.com</li>
						<li><strong>Ubicación:</strong> Madrid, España</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">2. Datos que Recopilamos</h2>
					<p>Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Datos de contacto:</strong> Nombre completo y dirección de correo electrónico</li>
						<li><strong>Datos de reuniones:</strong> Fecha, hora y objetivo de las reuniones agendadas</li>
						<li><strong>Datos de comunicación:</strong> Mensajes enviados a través del chat de la web</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">3. Finalidad del Tratamiento</h2>
					<p>Utilizamos tus datos para:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Gestionar y confirmar las reuniones que solicites</li>
						<li>Enviarte invitaciones de calendario por email</li>
						<li>Responder a tus consultas a través del chat</li>
						<li>Contactarte en relación a los servicios solicitados</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">4. Base Legal</h2>
					<p>El tratamiento de tus datos se basa en:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Ejecución de un contrato:</strong> Para gestionar las reuniones y servicios que solicitas (Art. 6.1.b RGPD)</li>
						<li><strong>Interés legítimo:</strong> Para responder a tus consultas y mejorar nuestros servicios (Art. 6.1.f RGPD)</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">5. Conservación de Datos</h2>
					<p>Conservamos tus datos personales durante:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Datos de reuniones:</strong> 2 años desde la fecha de la reunión</li>
						<li><strong>Datos de contacto:</strong> Mientras exista una relación comercial o hasta que solicites su eliminación</li>
						<li><strong>Mensajes del chat:</strong> No se almacenan de forma permanente</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">6. Destinatarios de los Datos</h2>
					<p>Tus datos pueden ser compartidos con:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Google (Calendar/Meet):</strong> Para crear eventos de calendario y videollamadas</li>
						<li><strong>Firebase (Google Cloud):</strong> Para el almacenamiento seguro de datos</li>
					</ul>
					<p class="mt-2">No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">7. Tus Derechos</h2>
					<p>Tienes derecho a:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
						<li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
						<li><strong>Supresión:</strong> Solicitar la eliminación de tus datos ("derecho al olvido")</li>
						<li><strong>Limitación:</strong> Restringir el tratamiento de tus datos</li>
						<li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
						<li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
					</ul>
					<p class="mt-4">Para ejercer estos derechos, contacta con nosotros en: <a href="mailto:contacto.savaitech@gmail.com" class="text-primary-400 hover:text-primary-300">contacto.savaitech@gmail.com</a></p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">8. Seguridad</h2>
					<p>Implementamos medidas técnicas y organizativas para proteger tus datos, incluyendo:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Cifrado en tránsito (HTTPS/TLS)</li>
						<li>Almacenamiento seguro en Firebase (Google Cloud)</li>
						<li>Acceso restringido a los datos</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">9. Cookies</h2>
					<p>Este sitio web utiliza únicamente cookies técnicas esenciales para:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Mantener la sesión de usuario (si aplica)</li>
						<li>Recordar preferencias de idioma</li>
					</ul>
					<p class="mt-2">No utilizamos cookies de seguimiento, analíticas ni publicitarias.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">10. Autoridad de Control</h2>
					<p>Si consideras que el tratamiento de tus datos no es adecuado, puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">Agencia Española de Protección de Datos (AEPD)</a>.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">11. Cambios en esta Política</h2>
					<p>Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva política en esta página.</p>
				</section>
			</div>
		{:else}
			<h1 class="text-3xl md:text-4xl font-bold text-white mb-8">Privacy Policy</h1>

			<div class="prose prose-invert prose-lg max-w-none space-y-6 text-dark-200">
				<p class="text-dark-300 text-sm">Last updated: February 2026</p>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">1. Data Controller</h2>
					<ul class="list-none space-y-1">
						<li><strong>Identity:</strong> Sergiy Alonso Villar</li>
						<li><strong>Activity:</strong> Software development and technology consulting services</li>
						<li><strong>Contact email:</strong> contacto.savaitech@gmail.com</li>
						<li><strong>Location:</strong> Madrid, Spain</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">2. Data We Collect</h2>
					<p>We collect the following personal data when you use our services:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Contact data:</strong> Full name and email address</li>
						<li><strong>Meeting data:</strong> Date, time, and objective of scheduled meetings</li>
						<li><strong>Communication data:</strong> Messages sent through the website chat</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">3. Purpose of Processing</h2>
					<p>We use your data to:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Manage and confirm meetings you request</li>
						<li>Send you calendar invitations by email</li>
						<li>Respond to your inquiries through the chat</li>
						<li>Contact you regarding requested services</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">4. Legal Basis</h2>
					<p>The processing of your data is based on:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Contract performance:</strong> To manage meetings and services you request (Art. 6.1.b GDPR)</li>
						<li><strong>Legitimate interest:</strong> To respond to your inquiries and improve our services (Art. 6.1.f GDPR)</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">5. Data Retention</h2>
					<p>We retain your personal data for:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Meeting data:</strong> 2 years from the meeting date</li>
						<li><strong>Contact data:</strong> While a business relationship exists or until you request deletion</li>
						<li><strong>Chat messages:</strong> Not stored permanently</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">6. Data Recipients</h2>
					<p>Your data may be shared with:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Google (Calendar/Meet):</strong> To create calendar events and video calls</li>
						<li><strong>Firebase (Google Cloud):</strong> For secure data storage</li>
					</ul>
					<p class="mt-2">We do not sell or share your data with third parties for commercial purposes.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">7. Your Rights</h2>
					<p>You have the right to:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li><strong>Access:</strong> Request a copy of your personal data</li>
						<li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
						<li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
						<li><strong>Restriction:</strong> Restrict the processing of your data</li>
						<li><strong>Portability:</strong> Receive your data in a structured format</li>
						<li><strong>Objection:</strong> Object to the processing of your data</li>
					</ul>
					<p class="mt-4">To exercise these rights, contact us at: <a href="mailto:contacto.savaitech@gmail.com" class="text-primary-400 hover:text-primary-300">contacto.savaitech@gmail.com</a></p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">8. Security</h2>
					<p>We implement technical and organizational measures to protect your data, including:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Encryption in transit (HTTPS/TLS)</li>
						<li>Secure storage in Firebase (Google Cloud)</li>
						<li>Restricted data access</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">9. Cookies</h2>
					<p>This website only uses essential technical cookies for:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Maintaining user session (if applicable)</li>
						<li>Remembering language preferences</li>
					</ul>
					<p class="mt-2">We do not use tracking, analytics, or advertising cookies.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">10. Supervisory Authority</h2>
					<p>If you believe that the processing of your data is not appropriate, you can file a complaint with the <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">Spanish Data Protection Agency (AEPD)</a>.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">11. Changes to this Policy</h2>
					<p>We may update this privacy policy occasionally. We will notify you of any significant changes by posting the new policy on this page.</p>
				</section>
			</div>
		{/if}
	</div>
</main>
