import { openModal } from "./modal.js";
import { closeModal } from "./modal.js";



// Génération de la page sans filtre
generateWorks("Tous");

export async function generateWorks(category) {

    // Récupération des travaux depuis l'API
    fetch(`http://localhost:5678/api/works/`).then(response=>{
        return response.json();  
    }
    ).then(
    works => {

        // on collecte l'ensemble des galleries de la page
        const galleries = document.getElementsByClassName("gallery");    
    
        // Vérification du nombre d'éléments de galeries
        if (galleries.length > 2) {
            console.error("Il y a trop d'éléments de galerie dans la page. Seule deux sont pris en compte actuellement (la page principale et la modale)");
            return;
        }
    
        // Boucle sur les éléments de galerie
        for (let i = 0; i < galleries.length; i++) {
            const sectionGallery = galleries[i];
            
            // Vidage du contenu de la galerie
            sectionGallery.innerHTML = "";

            // Boucle sur les travaux
            for (let j = 0; j < works.length; j++) {
                const figure = works[j];
                
                if (category === "Tous") {
                    // Création d'une balise figure pour chaque travaux
                    const figureElement = document.createElement("figure");
                    // Ajout de l'attribut data-work-id
                    figureElement.setAttribute("data-work-id", figure.id); 
    
                    // Création de la balise image et ajout d'un alt
                    const imageElement = document.createElement("img");
                    imageElement.src = figure.imageUrl;
                    imageElement.alt = figure.title;
    
                    // Ajout de la balise image à la figure
                    figureElement.appendChild(imageElement);
    
                    // Vérification du premier élément de galerie
                    if (i === 0) {
                        // Création de la balise figcaption pour le titre
                        const figcaptionElement = document.createElement("figcaption");
                        figcaptionElement.innerText = figure.title;
    
                        // Ajout du titre à la figure
                        figureElement.appendChild(figcaptionElement);
                    } else {
                        // Ajout de la class modale
                        figureElement.classList.add("figureModale");
                        // Création de la balise div pour les icônes
                        const iconsElement = document.createElement("div");
                        iconsElement.classList.add("icons");

                        // Création des icones poubelle et élargissement
                        const enlargeElement = document.createElement("div");
                        enlargeElement.classList.add("enlarge");
                        enlargeElement.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;

                        const binElement = document.createElement("div");
                        binElement.classList.add("bin");
                        binElement.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    
                        // Création de la balise figcaption pour le texte "éditer"
                        const figcaptionElement = document.createElement("figcaption");
                        figcaptionElement.innerText = "éditer";
    
                        // Ajout des icônes et du texte à la figure
                        figureElement.appendChild(iconsElement);
                        figureElement.appendChild(figcaptionElement);

                        // Ajout des icônes poubelle et élargissement à la div icones
                        iconsElement.appendChild(enlargeElement);
                        iconsElement.appendChild(binElement);

                        // Ajout d'un événement d'écoute sur la corbeille
                        binElement.addEventListener("click", (e) => {
                            e.preventDefault();
                            const workElement = e.target.closest("figure");
                            const workId = parseInt(workElement.dataset.workId); 
                            deleteWork(workId);
                            });

                        // Ajout d'un événement d'écoute sur le bouton supprimer tous les travaux de la galerie
                        const deleteAllWorksButton = document.getElementById("delete-all-works");
                        deleteAllWorksButton.addEventListener("click", deleteAllWorks);
                    }
    
                    // Ajout de la figure à l'élément de galerie correspondant
                    sectionGallery.appendChild(figureElement);
                } else {
                    const categoryWork = works[j].category.id;
            
                    if (categoryWork ===  category) {
                    // Création d’une balise dédiée à un projet d'architecture
                    const figureElement = document.createElement("figure");
                    // Ajout de l'attribut data-work-id
                    figureElement.setAttribute("data-work-id", figure.id); 

                    // Création des balises 
                    const imageElement = document.createElement("img");
                    imageElement.src = figure.imageUrl;
                    imageElement.alt = figure.title;
                    const figcaptionElement = document.createElement("figcaption");
                    figcaptionElement.innerText = figure.title;
            
                    
                    // On rattache la balise figure à la section Gallery
                    sectionGallery.appendChild(figureElement);
                    figureElement.appendChild(imageElement);
                    figureElement.appendChild(figcaptionElement);
            
                    }
                }
            }
        }
    });
}

function deleteAllWorks() {
    const workElements = document.querySelectorAll('[data-work-id]');

    // Crée un tableau pour stocker les valeurs des attributs data-work-id
    const workIds = [];

    // Parcourt tous les éléments et récupère la valeur de l'attribut data-work-id
    workElements.forEach((element) => {
        const workId = parseInt(element.getAttribute('data-work-id'));
        workIds.push(workId);
    });

    // On lance deleteWork pour l'ensemble des éléments :
    workIds.forEach((workId) => {
        deleteWork(workId);
    });
}

async function deleteWork(workId) {

    const credentials = JSON.parse(window.sessionStorage.getItem("credentials"));

    let response = await fetch(
      `http://localhost:5678/api/works/${workId}`,
        {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${credentials.token}`,
            },
        }
    );
    
    generateWorks("Tous");

    if (!response.ok) {
        alert("Echec de suppression");
      }
    }

    const form = document.querySelector('#addProjectForm')
    form.addEventListener('submit', event => {
      event.preventDefault()
    
      // Récupérer les données du formulaire
      const formData = new FormData(form)
    
      // Envoyer une requête POST pour ajouter un nouveau projet
      const credentials = JSON.parse(window.sessionStorage.getItem("credentials"));

      fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${credentials.token}`
        },
        body: formData
      })
        .then(response => {
          if (response.ok) {
            // Ajouter le nouveau projet à la liste des projets
            return response.json()
          } else {
            throw new Error("Erreur lors de l'ajout du projet")
          }
        })
        .then(newProject => {
          generateWorks("Tous");
    
          // Réafficher la page 1 de la modale
          closeModal();
          openModal();
        })
        .catch(error => {
          console.error(error)
          const errorMessage = document.getElementById('errorMessage');
          errorMessage.innerHTML =
            "Une erreur s'est produite. Veuillez vérifier que l'ensemble des champs du formulaire sont bien renseignés et réessayez."
        })
    })