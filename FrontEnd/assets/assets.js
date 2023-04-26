// Récupération des travaux depuis l'API
const reponse = await fetch(`http://localhost:5678/api/works/`);
const works = await reponse.json();

// Génération de la page sans filtre
generateWorks("Tous");

export default function generateWorks(category) {
    // on supprime l'ancien contenu
    document.querySelector(".gallery").innerHTML = "";

    if (category === "Tous") {
        for (let i = 0; i < works.length; i++) {

            const figure = works[i];
            // Récupération de l'élément du DOM qui peuplera la "gallery"
            const sectionGallery = document.querySelector(".gallery");
            // Création d’une balise dédiée à un projet d'architecture
            const figureElement = document.createElement("figure");
            // Création des balises 
            const imageElement = document.createElement("img");
            imageElement.src = figure.imageUrl;
            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = figure.title;
    
            
            // On rattache la balise figure à la section Gallery
            sectionGallery.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
        }
    
    }
    
    else for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        const categoryWork = works[i].category.id;

        console.log(categoryWork);
        console.log(category);

        if (categoryWork ===  category) {
        // Récupération de l'élément du DOM qui peuplera la "gallery"
        const sectionGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet d'architecture
        const figureElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = figure.title;

        
        // On rattache la balise figure à la section Gallery
        sectionGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        }
    }
}

