import { generateWorks } from "./works.js";
const credentials = window.sessionStorage.getItem("credentials");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const crossButton1 = document.getElementById("close-modal-button1");
const crossButton2 = document.getElementById("close-modal-button2");
const overlay = document.getElementById("overlay1");
const pannel = document.getElementById("admin-pannel");
const mainpicturebutton = document.getElementById("edit-main-picture1");
const projectsbutton = document.getElementById("edit-projects1");
const filters = document.getElementById("gallery-filters1");
const addproject = document.getElementById("add-project");
const previousButton = document.getElementById("previous-page1");
const inputElement = document.getElementById('image');
const previewElement = document.getElementById('imagePreview');
const pictureUploadButton = document.getElementById('selectPictureButton');
const categorySelection = document.getElementById('categorySelection')
const addProjectForm = document.getElementById('addProjectForm')



// Ajout d'un événement d'écoute pour fermer la modale sur la croix
crossButton1.addEventListener("click", () => {
    closeModal();
});


// Ajout d'un événement d'écoute pour fermer la modale sur la croix
crossButton2.addEventListener("click", () => {
    closeModal();
});

// Ajout d'un événement d'écoute pour fermer la modale sur l'overlay
overlay.addEventListener("click", () => {
    closeModal();
});


// Ajout d'un événement d'écoute pour afficher la page d'accueil de la modale
previousButton.addEventListener("click", () => {
    closeModal();
    openModal();
});


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

    // Ajout d'un événement d'écoute pour ajouter un projet
    addproject.addEventListener("click", addProjectModal);

};


export function openModal() {
    // Vérification qu'une boite modale n'est pas déjà ouverte
    
    if (document.getElementsByClassName('active')[0]) {
        return;
    }

    else {

        //Ajout de la classe active pour afficher la modale 1 et l'overlay
        modal1.classList.add('active');
        modal2.classList.remove('active');
        overlay.classList.add('active');

        // Appeler la fonction generateWorks pour afficher les travaux dans la gallery
        generateWorks("Tous");
    }
};

function addProjectModal() {

    modal1.classList.remove("active");
    modal2.classList.add("active");

    // Ajout des options de catégories à la liste déroulante
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {
        categories.forEach(category => {
          const option = document.createElement('option')
          option.value = category.id
          option.textContent = category.name
          categorySelection.appendChild(option)
        })
      })

};

export function closeModal() {
    
    modal1.classList.remove("active");
    modal2.classList.remove("active");
    overlay.classList.remove("active");
    categorySelection.innerHTML = '';
    addProjectForm.reset();
    pictureUploadButton.classList.remove('hidden');
    previewElement.classList.add('hidden');

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = "";

};
    
inputElement.addEventListener('change', e => {
    previewImage()
    if (inputElement.value !== '') {
        pictureUploadButton.classList.add('hidden');
            } else {
            pictureUploadButton.classList.remove('hidden');
            }
  })

function previewImage() {
    const file = inputElement.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', () => {
      previewElement.src = reader.result;
      previewElement.classList.remove('hidden');
    })
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  

  