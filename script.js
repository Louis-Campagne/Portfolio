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
    
    // NOTE : Si vous ajoutez une autre section d'onglets plus tard, 
    // vous n'aurez qu'à ajouter une ligne ici !
});