/**
 * --- Fonctions pour le Header (Menu Traduire) ---
 */

// Affiche ou masque le menu déroulant de traduction.
function toggleDropdown() {
    document.getElementById("translate-dropdown").classList.toggle("show");
}

// Ferme le menu déroulant si l'utilisateur clique en dehors de celui-ci
window.onclick = function(event) {
    if (!event.target.matches('.translate-btn') && !event.target.closest('.translate-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/**
 * --- Fonction Générique pour les Onglets de Section ---
 * Cette fonction gère n'importe quelle section d'onglets (À Propos, Compétences, etc.)
 * en se basant sur la classe du bouton.
 */
function setupTabs(tabButtonClass, contentClass) {
    // 1. Cibler tous les boutons de la section
    const tabButtons = document.querySelectorAll(tabButtonClass);
    
    // Sortir si aucun bouton n'est trouvé
    if (tabButtons.length === 0) return; 

    // 2. Parcourir chaque bouton pour ajouter l'écouteur d'événement
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // 3. Désactiver tous les boutons du même type
            document.querySelectorAll(tabButtonClass).forEach(btn => btn.classList.remove('active'));
            
            // 4. Désactiver tous les contenus du même type
            document.querySelectorAll(contentClass).forEach(content => content.classList.remove('active'));

            // 5. Activer le bouton cliqué
            button.classList.add('active');

            // 6. Afficher le contenu correspondant
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                 targetContent.classList.add('active');
            }
        });
    });
}

/**
 * --- Initialisation au Chargement de la Page ---
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des onglets 'À Propos'
    // Cible : .about-tab-btn et .about-tab-content
    setupTabs('.about-tab-btn', '.about-tab-content');
    
    // Initialisation des onglets 'Compétences'
    // Cible : .skill-tab-btn et .skill-tab-content
    setupTabs('.skill-tab-btn', '.skill-tab-content');
    
    // Initialisation des onglets 'Projets'
    setupTabs('.project-tab-btn', '.project-tab-content');
});

/**
 * --- Fonctions pour la Section CV ---
 */

// 1. Mise à jour du CV (Vignette et Lien de Téléchargement)
/**
 * --- Fonctions pour la Section CV ---
 */

// 1. Mise à jour du CV (Vignette et Lien de Téléchargement)
function updateCV() {
    const lang = document.getElementById('cv-language').value;
    
    let thumbnailName;
    let pdfName;
    
    // Définition des noms de fichiers basés sur la sélection
    if (lang === 'fr') {
        thumbnailName = 'CV_FR_vignette.png';
        pdfName = 'CV_FR.pdf';
    } else { // lang === 'en'
        thumbnailName = 'CV_Anglais_vignette.png';
        pdfName = 'CV_Anglais.pdf';
    }

    const path = 'images/CV/'; // Le chemin du dossier

    // Mettre à jour la source de la vignette
    document.getElementById('cv-thumbnail').src = path + thumbnailName;
    document.getElementById('cv-thumbnail').alt = `Vignette du CV en ${lang === 'fr' ? 'Français' : 'Anglais'}`;

    // Mettre à jour le lien de téléchargement PDF
    document.getElementById('download-link').href = path + pdfName;
}

// 2. Ouvrir la Modale d'Aperçu
function openModal(event) {
    event.preventDefault(); // Empêche le lien de naviguer
    
    const lang = document.getElementById('cv-language').value;
    
    let pdfUrl;
    // Utilisation des noms de fichiers corrigés
    if (lang === 'fr') {
        pdfUrl = 'images/CV/CV_FR.pdf';
    } else { 
        pdfUrl = 'images/CV/CV_Anglais.pdf';
    }

    // Met à jour l'iframe avec le PDF actuel
    document.getElementById('cv-iframe').src = pdfUrl;
    
    // Affiche la modale
    document.getElementById('cv-modal').classList.add('show');
}

// 3. Fermer la Modale d'Aperçu
function closeModal() {
    // Masque la modale
    document.getElementById('cv-modal').classList.remove('show');
    
    // Arrête le chargement/affichage du PDF dans l'iframe
    document.getElementById('cv-iframe').src = ""; 
}

// Initialisation (Optionnel mais bonne pratique) : 
// Assurez-vous que le CV en français est chargé au départ
document.addEventListener('DOMContentLoaded', () => {
    // ... (Appels setupTabs précédents) ...
    
    updateCV(); // Charge le CV par défaut au démarrage
});