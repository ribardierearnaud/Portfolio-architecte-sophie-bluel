import { generateWorks } from "./assets.js";
const credentials = window.sessionStorage.getItem("credentials");
const loginLink = document.getElementById("login-link");
loginLink.innerHTML = "Login";

function openModal() {

    // Vérification qu'une boite modale n'est pas déjà ouverte
    if (document.getElementById("modal1")) {
        return;
    }

    // Générer dynamiquement la modale <aside>
    const modal = document.createElement("aside");
    modal.id = "modal1";
    modal.classList.add("modal");
    modal.classList.add('active');

    // Générer dynamiquement l'overlay <div>
    const overlay = document.createElement("div");
    overlay.id = "overlay1"
    overlay.classList.add("overlay");
    overlay.classList.add('active');

    
  
    // Ajouter le contenu HTML à la modale
    modal.innerHTML = `
      <div class="close-modal" id="close-modal-button"><i class="fa-solid fa-xmark"></i></div>
      <h3>Galerie Photo</h3>
      <div class="gallery-modal"></div>
      <p><input type="button" class="button" value="Ajouter une photo"></input></p>
      <p><input type="button" class="delete-all" value="Supprimer la Galerie"></p>
    `;

  
    // Ajouter la modale et l'overlay à la page
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Ajout d'un événement d'écoute pour fermer la modale sur l'overlay
    overlay.addEventListener("click", () => {
        // Afficher une information comme quoi le changement d'image n'est pas encore disponible
        closeModal();
    })

    const crossButton = document.getElementById("close-modal-button");

    // Ajout d'un événement d'écoute pour fermer la modale sur la croix
    crossButton.addEventListener("click", () => {
        // Afficher une information comme quoi le changement d'image n'est pas encore disponible
        closeModal();
    })

    // Appeler la fonction generateWorks pour afficher les travaux dans la gallery
    generateWorks("Tous","modale");
    };

function closeModal() {
    if (document.getElementById("modal1")) {
        const modal = document.getElementById("modal1");
        const overlay = document.getElementById("overlay1");
        modal.remove();
        overlay.remove();
    }

    else {
        return;
    }

}
    
if (document.body.classList.contains('index-page')) {

    const pannel = document.getElementById("admin-pannel");
    const mainpicturebutton = document.getElementById("edit-main-picture1");
    const projectsbutton = document.getElementById("edit-projects1");
    const filters = document.getElementById("gallery-filters1");

    if (credentials) {
        pannel.innerHTML = `<p class="edition-intro"><i class="fa-regular fa-pen-to-square"></i>Mode édition</p><p class="edition-input"><input type="submit" class="edition-changes" value="publier les changements"></p>`;
        mainpicturebutton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier</p>`;
        projectsbutton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier</p>`;

        // Ajout d'un événement d'écoute pour le bouton modifier l'image
        mainpicturebutton.addEventListener("click", () => {
            // Afficher une information comme quoi le changement d'image n'est pas encore disponible
            alert("Feature not available yet");
        })

        // Ajout d'un événement d'écoute pour le bouton modifier les projets
        projectsbutton.addEventListener("click", openModal);

        // Masquer les filtres
        filters.classList.add('hidden');

    }

}

if (credentials) {

    // Gestion de l'affichage "Login"/"Logout"
    loginLink.innerHTML = "Logout";

    // Ajout d'un événement d'écoute pour déconnecter
    loginLink.addEventListener("click", () => {
        // Supprimer les informations de connexion de la session
        window.sessionStorage.removeItem("credentials");
        // Rediriger vers la page la page d'accueil
        window.location.replace("./index.html");
    });
} else {
    loginLink.innerHTML = `<a href="./login.html">login</a>`;
}