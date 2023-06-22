import { generateWorks } from "./works.js";
const credentials = window.sessionStorage.getItem("credentials");

function openModal() {
    // Vérification qu'une boite modale n'est pas déjà ouverte
    
    if (document.getElementsByClassName('active')[0]) {
        return;
    }

    else {

        const modal = document.getElementById("modal1");
        const overlay = document.getElementById("overlay1");
        
        //Ajout de la classe active pour afficher la modale et l'overlay
        modal.classList.add('active');
        overlay.classList.add('active');

        const crossButton = document.getElementById("close-modal-button");

        // Ajout d'un événement d'écoute pour fermer la modale sur la croix
        crossButton.addEventListener("click", () => {
            // Afficher une information comme quoi le changement d'image n'est pas encore disponible
            closeModal();
        })

        // Ajout d'un événement d'écoute pour fermer la modale sur l'overlay
        overlay.addEventListener("click", () => {
            // Afficher une information comme quoi le changement d'image n'est pas encore disponible
            closeModal();
        })

        // Appeler la fonction generateWorks pour afficher les travaux dans la gallery
        generateWorks("Tous","modale");


    }
}

function closeModal() {
    if (document.getElementById("modal1")) {
        const modal = document.getElementById("modal1");
        const overlay = document.getElementById("overlay1");
        modal.classList.remove("active");
        overlay.classList.remove("active");
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

