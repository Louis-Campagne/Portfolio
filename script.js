/**
 * --- Script Portfolio ---
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation du CV
    updateCV();

    // 2. Année automatique footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    
    // 3. Initialisation AOS (Animations)
    // "once: false" permet de rejouer l'animation à chaque fois qu'on scrolle
    // "mirror: true" permet d'animer aussi quand on scrolle vers le haut
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false, 
            mirror: true,
            offset: 50
        });
    }

    // 4. Correction du bug des onglets vides (Rafraichir AOS)
    const tabButtons = document.querySelectorAll('button[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', () => {
            AOS.refresh(); 
        });
    });
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

    const thumb = document.getElementById('cv-thumbnail');
    if (thumb) {
        thumb.src = path + thumbnailName;
        thumb.alt = `Vignette CV ${lang}`;
    }

    const link = document.getElementById('download-link');
    if (link) {
        link.href = path + pdfName;
    }
}

function openModal(e) {
    if(e) e.preventDefault();
    
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

// ============================================================
// 🌟 LOGIQUE D'ANIMATION SCROLL (HAUT / BAS) - CUSTOM
// ============================================================
window.addEventListener('scroll', () => {
    // Liste des éléments animés individuellement
    // J'ai retiré h3 et h4 pour ne pas bugger dans les onglets
    const elementsToAnimate = document.querySelectorAll(`
        h1, h2, 
        .subtitle, 
        .profile-picture-container,
        .nav-pills, 
        .tab-content, 
        .card-custom, 
        .content-box,
        .contact-info, 
        .project-thumbnail,
        .btn-earth,
        .cv-container
    `);
    
    // Trigger ajusté pour ne pas cacher trop vite
    const triggerHeight = 80; 

    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('scroll-item')) {
            el.classList.add('scroll-item');
        }

        const rect = el.getBoundingClientRect();
        
        // Si le haut de l'élément tape le menu
        if (rect.top < triggerHeight) {
            el.classList.add('scroll-out-top');
        } else {
            el.classList.remove('scroll-out-top');
        }
    });
});