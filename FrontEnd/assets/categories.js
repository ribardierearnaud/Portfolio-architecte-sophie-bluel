import { generateWorks } from "./assets.js";

// Récupération des travaux depuis l'API
const reponse = await fetch(`http://localhost:5678/api/categories/`);
const categories = await reponse.json();

// Génération de la page avec le filtre "Tous"
generateFiltersPerCategories(categories);

async function generateFiltersPerCategories(categories) {
    // Création du filtre "Tous"
    const sectionGalleryFilter = document.querySelector(".gallery-filters");
    const allFilterElement = document.createElement("button");
    // Ajout de la classe gallery-filter
    allFilterElement.classList.add("gallery-filter"); 
    // Ajout de la classe selectionné au chargement de la page
    allFilterElement.classList.add("selected"); 
    // Ajout du libellé Tous
    allFilterElement.innerText = "Tous";

    // On ajoute l'event listener pour permettre la sélection des données et le changement d'affichage du bouton
    allFilterElement.addEventListener("click", function() {
        // Désélection de tous les autres filtres
        deselectAllFilters();
        // Sélection du filtre "All"
        allFilterElement.classList.add("selected");
        // Appel à la fonction pour filtrer les travaux avec la catégorie "All"
        generateWorks(allFilterElement.innerText,"main");
    });

    // On rattache l'élément filterElement à la section galleryFilter
    sectionGalleryFilter.appendChild(allFilterElement);

    // Itération à travers les catégories récupérées depuis l'API
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        // Création d'un élément div dédié à un filtre par nature de projet
        const filterElement = document.createElement("button");
        // Ajout de la classe gallery-filter
        filterElement.classList.add("gallery-filter"); 
        // Création des balises contenant le nom de la catégorie
        filterElement.innerText = category.name;
        // On rattache l'élément filterElement à la section galleryFilter
        sectionGalleryFilter.appendChild(filterElement);

        // On ajoute l'event listener pour permettre la sélection des données et le changement d'affichage du bouton
        filterElement.addEventListener("click", function() {
            // Désélection de tous les autres filtres
            deselectAllFilters();
            // Sélection du filtre cliqué
            filterElement.classList.add("selected");
            // Appel à la fonction pour filtrer les travaux avec la catégorie correspondante
            generateWorks(category.id,"main");
        });
    }

    // Fonction pour désélectionner tous les filtres
    function deselectAllFilters() {
        const filterElements = document.querySelectorAll(".gallery-filter");
        filterElements.forEach(filterElement => {
            filterElement.classList.remove("selected");
        });
    }
}
