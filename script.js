/**
 * Affiche ou masque le menu déroulant de traduction.
 */
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

// NOTE : Pour une vraie traduction, vous devrez utiliser une librairie
// ou une API de traduction, ou recharger la page avec le contenu traduit.
// Ce script gère uniquement l'affichage du menu déroulant.