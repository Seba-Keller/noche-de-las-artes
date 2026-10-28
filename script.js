/* Noche de las Artes — interacción del sitio beta.
   Colocá las fotos en assets/img/ y los PDF en assets/pdf/. */

const IMAGE_COUNT = 17;

const GROUPS = [
  {
    number: 1,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 1',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_01.pdf'
  },
  {
    number: 2,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 2',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_02.pdf'
  },
  {
    number: 3,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 3',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_03.pdf'
  },
  {
    number: 4,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 4',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_04.pdf'
  },
  {
    number: 5,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 5',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_05.pdf'
  },
  {
    number: 6,
    course: 'Curso por confirmar',
    title: 'Producción del grupo 6',
    description: 'Investigación, diseño o prototipo sobre contaminación sonora.',
    file: 'grupo_06.pdf'
  }
];

// Elementos de la galería
const galleryImage = document.getElementById('galleryImage');
const galleryPlaceholder = document.querySelector('.gallery-placeholder');
const galleryCount = document.getElementById('galleryCount');
const imageIndex = document.getElementById('imageIndex');
const imageLabel = document.getElementById('imageLabel');

let currentImage = 1;
let loadedImageCount = 0;

// Genera la ruta de cada fotografía
function imagePath(number) {
  return `assets/img/img_${String(number).padStart(2, '0')}.jpg`;
}

// Actualiza la fotografía del carrusel
function updateGallery() {
  if (!galleryImage) return;

  const path = imagePath(currentImage);
  const testImage = new Image();

  testImage.onload = () => {
    loadedImageCount++;

    galleryImage.src = path;
    galleryImage.hidden = false;

    if (galleryPlaceholder) {
      galleryPlaceholder.hidden = true;
    }

    if (galleryCount) {
      galleryCount.textContent =
        `${String(currentImage).padStart(2, '0')} / ${String(IMAGE_COUNT).padStart(2, '0')}`;
    }

    if (imageIndex) {
      imageIndex.textContent =
        `${String(currentImage).padStart(2, '0')} — ${String(IMAGE_COUNT).padStart(2, '0')}`;
    }

    if (imageLabel) {
      imageLabel.textContent =
        `Registro del proyecto ${String(currentImage).padStart(2, '0')}`;
    }
  };

  testImage.onerror = () => {
    if (loadedImageCount === 0) {
      galleryImage.hidden = true;

      if (galleryPlaceholder) {
        galleryPlaceholder.hidden = false;
      }

      if (galleryCount) {
        galleryCount.textContent =
          `01 / ${String(IMAGE_COUNT).padStart(2, '0')}`;
      }
    } else {
      currentImage = (currentImage % IMAGE_COUNT) + 1;

      if (currentImage <= IMAGE_COUNT) {
        updateGallery();
      }
    }
  };

  testImage.src = path;
}

// Avanza o retrocede en el carrusel
function moveGallery(direction) {
  currentImage =
    ((currentImage - 1 + direction + IMAGE_COUNT) % IMAGE_COUNT) + 1;

  updateGallery();
}

document.getElementById('prevImage')?.addEventListener('click', () => {
  moveGallery(-1);
});

document.getElementById('nextImage')?.addEventListener('click', () => {
  moveGallery(1);
});

// Elementos del visor de PDF
const groupGrid = document.getElementById('groupGrid');
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const pdfTitle = document.getElementById('pdfTitle');

// Abre un PDF dentro de la página
function openPdf(group) {
  if (!pdfModal || !pdfViewer) return;

  pdfTitle.textContent = `${group.title} · ${group.course}`;

  pdfViewer.src =
    `assets/pdf/${group.file}#toolbar=1&navpanes=0`;

  pdfModal.classList.add('is-open');
  pdfModal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');

  document.getElementById('closeModal')?.focus();
}

// Cierra el visor de PDF
function closePdf() {
  if (!pdfModal || !pdfViewer) return;

  pdfModal.classList.remove('is-open');
  pdfModal.setAttribute('aria-hidden', 'true');

  pdfViewer.src = 'about:blank';

  document.body.classList.remove('modal-open');
}

// Crea las tarjetas de los grupos
function renderGroups() {
  if (!groupGrid) return;

  groupGrid.innerHTML = '';

  GROUPS.forEach(group => {
    const card = document.createElement('article');
    card.className = 'group-card';

    const top = document.createElement('div');
    top.className = 'group-top';

    const tag = document.createElement('span');
    tag.className = 'group-tag';
    tag.textContent = group.course;

    const number = document.createElement('span');
    number.className = 'group-no';

    number.textContent =
      `GRUPO ${String(group.number).padStart(2, '0')}`;

    top.append(tag, number);

    const title = document.createElement('h3');
    title.textContent = group.title;

    const description = document.createElement('p');
    description.textContent = group.description;

    const button = document.createElement('button');
    button.className = 'pdf-button';
    button.type = 'button';
    button.textContent = 'Ver producción ↗';

    button.addEventListener('click', () => {
      openPdf(group);
    });

    card.append(top, title, description, button);

    groupGrid.append(card);
  });
}

// Eventos para cerrar el visor
document.getElementById('closeModal')?.addEventListener('click', closePdf);

document.querySelectorAll('[data-close-modal]').forEach(element => {
  element.addEventListener('click', closePdf);
});

// Cierra el visor al presionar Escape
document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    pdfModal?.classList.contains('is-open')
  ) {
    closePdf();
  }
});

// Menú de navegación para celulares
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Cierra el menú después de elegir una sección
mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');

    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Inicialización de la página
renderGroups();
updateGallery();
