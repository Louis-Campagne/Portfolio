/**
 * --- Script Portfolio ---
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation du CV
    updateCV();

    // 2. Année automatique footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// --- Gestion CV ---
function updateCV() {
    const langElement = document.getElementById('cv-language');
    if (!langElement) return;

    const lang = langElement.value;
    const path = 'images/CV/';
    let thumbnailName, pdfName;
    
    if (lang === 'fr') {
        thumbnailName = 'CV_FR_vignette.png';
        pdfName = 'CV_FR.pdf';
    } else { 
        thumbnailName = 'CV_Anglais_vignette.png';
        pdfName = 'CV_Anglais.pdf';
    }

    // Mise à jour image
    const thumb = document.getElementById('cv-thumbnail');
    if (thumb) {
        thumb.src = path + thumbnailName;
        thumb.alt = `Vignette CV ${lang}`;
    }

    // Mise à jour lien
    const link = document.getElementById('download-link');
    if (link) {
        link.href = path + pdfName;
    }
}

function openModal(event) {
    if(event) event.preventDefault();
    
    const lang = document.getElementById('cv-language').value;
    const pdfUrl = (lang === 'fr') ? 'images/CV/CV_FR.pdf' : 'images/CV/CV_Anglais.pdf';

    const iframe = document.getElementById('cv-iframe');
    if (iframe) iframe.src = pdfUrl;

    const myModal = new bootstrap.Modal(document.getElementById('cv-modal'));
    myModal.show();
}

function closeModal() {
    const iframe = document.getElementById('cv-iframe');
    if (iframe) iframe.src = "";
}