/**
 * AJOEMCA - Asociación de Jóvenes Empresarios del Campo (Pitalito, Huila)
 * Script interactivo principal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de AOS con soporte para movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: false,
      duration: prefersReducedMotion ? 0 : 800,
      disable: prefersReducedMotion
    });
  }

  // Asegurar visibilidad de elementos AOS tras carga completa
  window.addEventListener('load', () => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.classList.add('aos-animate');
    });
  });

  // Año actual dinámico en pie de página
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Control del Menú Móvil
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileIcon = document.getElementById('mobile-menu-icon');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
        if (mobileIcon) mobileIcon.textContent = 'close';
      } else {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.textContent = 'menu';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.textContent = 'menu';
      });
    });
  }

  // Datos y lógica de la galería Bento Grid
  const bentoItems = [
    {
      src: 'assets/images/hero-bg.jpg',
      tag: 'Destacados',
      title: 'Paisaje cafetero de origen',
      description: 'Valle verde y montañas cafeteras del sur del Huila al atardecer, cuna del café especial de AJOEMCA.'
    },
    {
      src: 'assets/images/granos-maduros.jpg',
      tag: 'Recientes',
      title: 'Selección de granos maduros',
      description: 'Cerezas frescas y granos rigurosamente seleccionados en finca para garantizar la máxima calidad en taza.'
    },
    {
      src: 'assets/images/arbusto-floracion.jpg',
      tag: 'Destacados',
      title: 'Floración en el cafetal',
      description: 'Arbusto de café en plena floración blanca en las laderas montañosas de Pitalito, Huila.'
    },
    {
      src: 'assets/images/ramas-frutos.jpg',
      tag: 'Recientes',
      title: 'Maduración y cosecha',
      description: 'Ramas de cafeto rebosantes de frutos maduros listos para la recolección selectiva manual.'
    },
    {
      src: 'assets/images/articulacion-reunion.jpg',
      tag: 'Destacados',
      title: 'Articulación comunitaria e institucional',
      description: 'Encuentro participativo con productores, familias y aliados en torno al desarrollo rural sostenible.'
    },
    {
      src: 'assets/images/bento-empaque.jpg',
      tag: 'Recientes',
      title: 'Alistamiento y empaque',
      description: 'Manejo y preparación de grano en bodega operativa para su conservación y posterior comercialización.'
    }
  ];

  let activeBentoIndex = 0;
  let isBentoActive = false;

  // Filtros de categoría Bento Grid
  const filterButtons = document.querySelectorAll('.bento-filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.setAttribute('aria-pressed', String(isActive));
        b.className = isActive
          ? 'bento-filter-btn rounded-full px-5 py-2 font-label text-label-md bg-primary text-on-primary shadow-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
          : 'bento-filter-btn rounded-full px-5 py-2 font-label text-label-md bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
      });

      document.querySelectorAll('.bento-card').forEach((card) => {
        const match = filter === 'todos' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Funciones de Lightbox / Modal de fotografías
  const lightboxBox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxNav = document.getElementById('lightbox-nav');

  function openBentoModal(index) {
    if (!lightboxBox || !lightboxImg) return;
    activeBentoIndex = index;
    isBentoActive = true;
    const item = bentoItems[activeBentoIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    if (lightboxTag) lightboxTag.textContent = item.tag;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.description;
    if (lightboxCounter) lightboxCounter.textContent = (activeBentoIndex + 1) + ' / ' + bentoItems.length;
    if (lightboxNav) lightboxNav.classList.remove('hidden');
    lightboxBox.classList.remove('hidden');
    lightboxBox.classList.add('flex');
    lightboxBox.focus();
    document.body.style.overflow = 'hidden';
  }

  function navigateBentoModal(step) {
    activeBentoIndex = (activeBentoIndex + step + bentoItems.length) % bentoItems.length;
    openBentoModal(activeBentoIndex);
  }

  function openLightbox(src, caption) {
    if (!lightboxBox || !lightboxImg) return;
    isBentoActive = false;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxTag) lightboxTag.textContent = 'Registro institucional';
    if (lightboxTitle) lightboxTitle.textContent = 'AJOEMCA — Pitalito, Huila';
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxNav) lightboxNav.classList.add('hidden');
    lightboxBox.classList.remove('hidden');
    lightboxBox.classList.add('flex');
    lightboxBox.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxBox) return;
    lightboxBox.classList.add('hidden');
    lightboxBox.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Modal de contacto rápido
  const contactModal = document.getElementById('contact-modal');

  function openContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('hidden');
    contactModal.classList.add('flex');
    contactModal.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.add('hidden');
    contactModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Cierre al presionar ESC o al hacer clic fuera del contenido
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxBox && !lightboxBox.classList.contains('hidden')) {
        closeLightbox();
      }
      if (contactModal && !contactModal.classList.contains('hidden')) {
        closeContactModal();
      }
    } else if (e.key === 'ArrowRight' && isBentoActive && lightboxBox && !lightboxBox.classList.contains('hidden')) {
      navigateBentoModal(1);
    } else if (e.key === 'ArrowLeft' && isBentoActive && lightboxBox && !lightboxBox.classList.contains('hidden')) {
      navigateBentoModal(-1);
    }
  });

  if (lightboxBox) {
    lightboxBox.addEventListener('click', (e) => {
      if (e.target === lightboxBox) {
        closeLightbox();
      }
    });
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  // Exponer funciones globales para llamadas inline
  window.openBentoModal = openBentoModal;
  window.navigateBentoModal = navigateBentoModal;
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.openContactModal = openContactModal;
  window.closeContactModal = closeContactModal;

  // Validación y envío de formulario de contacto rápido
  const quickForm = document.getElementById('quick-contact-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qc-name').value.trim();
      const email = document.getElementById('qc-email').value.trim();
      const msg = document.getElementById('qc-msg').value.trim();
      const feedback = document.getElementById('qc-feedback');
      if (!feedback) return;

      feedback.classList.remove('hidden', 'bg-error', 'text-on-error', 'bg-primary-container', 'text-on-primary-container');

      if (!name || !email || !msg) {
        feedback.classList.add('bg-error', 'text-on-error');
        feedback.textContent = 'Por favor completa tu nombre, correo y mensaje antes de enviar.';
        feedback.setAttribute('role', 'alert');
        return;
      }
      feedback.classList.add('bg-primary-container', 'text-on-primary-container');
      feedback.textContent = '¡Gracias por contactarnos! Tu consulta ha sido registrada exitosamente. Nos comunicaremos contigo a la brevedad.';
      feedback.setAttribute('role', 'status');
      quickForm.reset();
    });
  }

  // Validación y envío de formulario principal de contacto
  const mainForm = document.getElementById('main-contact-form');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mc-name').value.trim();
      const email = document.getElementById('mc-email').value.trim();
      const subject = document.getElementById('mc-subject').value.trim();
      const msg = document.getElementById('mc-msg').value.trim();
      const privacy = document.getElementById('mc-privacy').checked;
      const feedback = document.getElementById('main-contact-feedback');
      if (!feedback) return;

      feedback.classList.remove('hidden', 'bg-error', 'text-on-error', 'bg-primary-container', 'text-on-primary-container');

      if (!name || !email || !subject || !msg || !privacy) {
        feedback.classList.add('bg-error', 'text-on-error');
        feedback.textContent = 'Por favor completa los campos obligatorios (*) y autoriza el tratamiento de datos.';
        feedback.setAttribute('role', 'alert');
        return;
      }
      feedback.classList.add('bg-primary-container', 'text-on-primary-container');
      feedback.textContent = '¡Mensaje enviado con éxito! Tu solicitud ha sido radicada formalmente ante AJOEMCA. Te responderemos pronto.';
      feedback.setAttribute('role', 'status');
      mainForm.reset();
    });
  }
});

