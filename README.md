# AJOEMCA — Asociación de Jóvenes Empresarios del Campo

Plataforma web institucional oficial de **AJOEMCA** (*Asociación de Jóvenes Empresarios del Campo*), ubicada en **Pitalito, Huila, Colombia**.

Este proyecto impulsa el relevo generacional rural, la producción y comercialización de café de especialidad con denominación de origen Huila, servicios agroindustriales de secado mecánico, laboratorios de cata y proyectos comunitarios sostenibles.

---

## 📁 Estructura del Proyecto

El repositorio ha sido reorganizado de acuerdo con las mejores prácticas de la industria para sitios estáticos de alto rendimiento:

```text
ajoemca/
├── index.html                  # Punto de entrada principal (HTML5 semántico, accesible y optimizado para SEO)
├── robots.txt                  # Directivas de indexación para motores de búsqueda
├── sitemap.xml                 # Mapa del sitio en formato XML estándar
├── README.md                   # Documentación técnica del proyecto
├── assets/                     # Recursos estáticos organizados
│   ├── css/
│   │   └── styles.css          # Estilos personalizados, accesibilidad y ajustes de diseño
│   ├── js/
│   │   └── main.js             # Lógica interactiva: filtros de galería, lightbox, modales, menú móvil
│   └── images/                 # Imágenes optimizadas para web (alta resolución, baja latencia)
│       ├── logo-ajoemca.png
│       ├── logo-ajoemca-blanco.png
│       ├── favicon.png
│       ├── hero-bg.jpg
│       ├── acopio-sede.jpg
│       ├── cata-cafe.jpg
│       ├── secado-invernadero.jpg
│       ├── granos-verdes.jpg
│       ├── granos-maduros.jpg
│       ├── cultivo-montana.jpg
│       ├── cultivo-finca.jpg
│       ├── clasificador-cafe.jpg
│       ├── bodegon-cafe.jpg
│       ├── ramas-frutos.jpg
│       ├── articulacion-reunion.jpg
│       ├── bento-cosecha.jpg
│       ├── bento-seleccion.jpg
│       ├── bento-asistencia.jpg
│       ├── bento-formacion.jpg
│       ├── bento-acopio.jpg
│       ├── bento-empaque.jpg
│       ├── footer-cafe.jpg
│       ├── arbusto-floracion.jpg
│       ├── valle-agricola.jpg
│       └── valle-cielo-dramatico.jpg
├── ajoemca_inicio/
│   └── code.html               # Versión de respaldo vinculada a la nueva arquitectura
└── .archive/
    └── raw_exports/            # Respaldo seguro de carpetas y capturas de exportación originales
```

---

## ⚡ Optimizaciones Implementadas

### 1. Limpieza y Reestructuración de Código
- **Eliminación de código muerto**: Se purgaron más de 270 atributos residuales de exportación (`data-stitch-*`, `design-text-token`, `data-component-*`).
- **Reducción de tamaño del DOM**: El archivo HTML principal se redujo de **278 KB** a **80 KB** (reducción del 71%), eliminando más de 137.000 caracteres de datos base64 incrustados.
- **Modularización**: Se extrajeron los estilos personalizados a `assets/css/styles.css` y la lógica interactiva a `assets/js/main.js`.

### 2. Gestión y Optimización de Assets
- **Alojamiento 100% Local**: Se eliminaron dependencias de URLs externas inestables (`googleusercontent.com`) y rutas rotas (`../../uploads/...`).
- **Compresión sin pérdida visual perceptible**: Las imágenes fotográficas se optimizaron a resolución de hasta 1600px en JPEG calidad 85%, reduciendo el peso global de assets de **~58 MB** a **~8 MB** (ahorro superior al 86% en ancho de banda).
- **Logotipos Vectoriales/Nítidos**: Se preservó la transparencia y nitidez de los logotipos institucionales en PNG (`logo-ajoemca.png`, `logo-ajoemca-blanco.png`) y se generó el favicon oficial (`favicon.png`).

### 3. Rendimiento Web y Métricas Core Web Vitals
- **Atributos de dimensión explícitos**: Todas las etiquetas `<img>` incluyen `width` y `height` proporcionales para eliminar el salto de diseño (*Cumulative Layout Shift - CLS*).
- **Carga diferida inteligente**: Se implementó `loading="lazy"` y `decoding="async"` en todas las imágenes bajo el pliegue (*below-the-fold*), y `fetchpriority="high"` en los recursos críticos del Hero inicial (*LCP*).
- **Preconexión a CDNs**: Preconexión anticipada a Google Fonts.

### 4. Accesibilidad (WCAG 2.1 AA / a11y)
- **Enlace de salto**: Se integró `<a href="#inicio" class="skip-link">Saltar al contenido principal</a>` accesible por teclado.
- **Textos alternativos contextuales**: Cada imagen cuenta con `alt` descriptivo y específico de la labor cafetera o institucional.
- **Navegación por teclado completa**:
  - Cierre de modales y visor fotográfico mediante la tecla `Escape`.
  - Navegación entre fotografías con las teclas `Flecha Izquierda` y `Flecha Derecha`.
  - Trampa de foco y atributos `role="dialog"`, `aria-modal="true"` y `aria-labelledby`.
- **Formularios accesibles**: Asociación estricta de `<label for="...">` con `<input id="...">`, atributos `autocomplete`, `aria-required` y alertas accesibles (`role="alert"` / `role="status"`).
- **Contraste de color**: Cumplimiento de ratios de contraste cromático superiores a 4.5:1 / 7:1 en fondos y tipografías.

### 5. SEO Técnico
- **Etiquetas Meta Esenciales**: Título optimizado, meta descripción persuasiva y etiqueta canónica (`<link rel="canonical">`).
- **Open Graph y Twitter Cards**: Tarjetas enriquecidas configuradas para compartir en redes sociales y mensajería (WhatsApp, Telegram, Facebook, LinkedIn, Twitter/X).
- **Datos Estructurados Schema.org (JSON-LD)**: Marcado semántico para organizaciones no gubernamentales (`NGO`), geolocalizadas en Pitalito, Huila, con información de contacto y canales oficiales.
- **Indexación**: Archivos `robots.txt` y `sitemap.xml` configurados en la raíz.

---

## 🚀 Despliegue y Visualización Local

Al ser un proyecto web basado en estándares modernos (HTML5, Tailwind CSS, AOS, ES6), puede ejecutarse inmediatamente en cualquier servidor web o plataforma de alojamiento estático:

### Visualización rápida local
- **Opción 1**: Abrir directamente `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Safari, Edge).
- **Opción 2**: Iniciar un servidor local ligero:
  ```bash
  # Con Python (si está instalado)
  python -m http.server 8000

  # Con Node / npx (si está instalado)
  npx serve .
  ```

### Despliegue en producción
Compatible directamente con:
- **GitHub Pages**: Seleccionar la rama `main` y raíz `/` en la configuración de Pages del repositorio.
- **Vercel / Netlify / Cloudflare Pages**: Despliegue sin pasos de compilación adicionales (*Zero-config*).
