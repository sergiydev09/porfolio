<script lang="ts">
	import { getLanguage } from "$lib/i18n/index.svelte";
</script>

<svelte:head>
	<title>{getLanguage() === "es" ? "Aviso Legal" : "Legal Notice"} | SAV AI Tech</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-dark-950 py-16 px-4">
	<div class="max-w-3xl mx-auto">
		<a href="/" class="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8">
			<span class="material-icons-round">arrow_back</span>
			{getLanguage() === "es" ? "Volver al inicio" : "Back to home"}
		</a>

		{#if getLanguage() === "es"}
			<h1 class="text-3xl md:text-4xl font-bold text-white mb-8">Aviso Legal</h1>

			<div class="prose prose-invert prose-lg max-w-none space-y-6 text-dark-200">
				<p class="text-dark-300 text-sm">Última actualización: Febrero 2026</p>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">1. Información del Titular</h2>
					<p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:</p>
					<ul class="list-none space-y-2 mt-4">
						<li><strong>Titular:</strong> Sergiy Alonso Villar</li>
						<li><strong>Actividad:</strong> Servicios de desarrollo de software, consultoría tecnológica y liderazgo técnico</li>
						<li><strong>Email:</strong> contacto.savaitech@gmail.com</li>
						<li><strong>Ubicación:</strong> Madrid, España</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">2. Objeto del Sitio Web</h2>
					<p>Este sitio web tiene como finalidad:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Presentar los servicios profesionales de desarrollo de software e IA</li>
						<li>Facilitar el contacto y la contratación de servicios</li>
						<li>Permitir la reserva de reuniones de consultoría</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">3. Condiciones de Uso</h2>
					<p>El acceso y uso de este sitio web implica la aceptación de las siguientes condiciones:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios</li>
						<li>Queda prohibido el uso del sitio con fines ilícitos o que perjudiquen a terceros</li>
						<li>El usuario es responsable de la veracidad de los datos proporcionados</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">4. Propiedad Intelectual</h2>
					<p>Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico, código fuente, logos y marcas, son propiedad de Sergiy Alonso Villar o se utilizan con la debida autorización.</p>
					<p class="mt-2">Queda prohibida la reproducción, distribución o transformación de estos contenidos sin autorización expresa.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">5. Exclusión de Responsabilidad</h2>
					<p>El titular no se hace responsable de:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Errores u omisiones en los contenidos</li>
						<li>Daños derivados del uso del sitio web</li>
						<li>La disponibilidad y continuidad del sitio</li>
						<li>Contenidos de sitios web de terceros enlazados</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">6. Enlaces Externos</h2>
					<p>Este sitio puede contener enlaces a páginas externas. El titular no se responsabiliza del contenido ni de las políticas de privacidad de dichos sitios.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">7. Legislación Aplicable</h2>
					<p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, España.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">8. Contacto</h2>
					<p>Para cualquier consulta sobre este aviso legal, puedes contactar en:</p>
					<p class="mt-2"><a href="mailto:contacto.savaitech@gmail.com" class="text-primary-400 hover:text-primary-300">contacto.savaitech@gmail.com</a></p>
				</section>
			</div>
		{:else}
			<h1 class="text-3xl md:text-4xl font-bold text-white mb-8">Legal Notice</h1>

			<div class="prose prose-invert prose-lg max-w-none space-y-6 text-dark-200">
				<p class="text-dark-300 text-sm">Last updated: February 2026</p>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">1. Owner Information</h2>
					<p>In compliance with Spanish Law 34/2002 (LSSI-CE), we inform:</p>
					<ul class="list-none space-y-2 mt-4">
						<li><strong>Owner:</strong> Sergiy Alonso Villar</li>
						<li><strong>Activity:</strong> Software development services, technology consulting, and technical leadership</li>
						<li><strong>Email:</strong> contacto.savaitech@gmail.com</li>
						<li><strong>Location:</strong> Madrid, Spain</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">2. Website Purpose</h2>
					<p>This website aims to:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Present professional software development and AI services</li>
						<li>Facilitate contact and service contracting</li>
						<li>Allow booking of consulting meetings</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">3. Terms of Use</h2>
					<p>Access and use of this website implies acceptance of the following conditions:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Users commit to making appropriate use of content and services</li>
						<li>Use of the site for illegal purposes or to harm third parties is prohibited</li>
						<li>Users are responsible for the accuracy of data provided</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">4. Intellectual Property</h2>
					<p>All website content, including texts, images, graphic design, source code, logos, and trademarks, are owned by Sergiy Alonso Villar or used with proper authorization.</p>
					<p class="mt-2">Reproduction, distribution, or transformation of this content without express authorization is prohibited.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">5. Disclaimer</h2>
					<p>The owner is not responsible for:</p>
					<ul class="list-disc pl-6 space-y-2">
						<li>Errors or omissions in content</li>
						<li>Damages derived from website use</li>
						<li>Website availability and continuity</li>
						<li>Content of linked third-party websites</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">6. External Links</h2>
					<p>This site may contain links to external pages. The owner is not responsible for the content or privacy policies of such sites.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">7. Applicable Law</h2>
					<p>This legal notice is governed by Spanish law. For any dispute, the parties submit to the courts of Madrid, Spain.</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-white mt-8 mb-4">8. Contact</h2>
					<p>For any questions about this legal notice, you can contact:</p>
					<p class="mt-2"><a href="mailto:contacto.savaitech@gmail.com" class="text-primary-400 hover:text-primary-300">contacto.savaitech@gmail.com</a></p>
				</section>
			</div>
		{/if}
	</div>
</main>
