// Récupération des travaux depuis l'API en local
const reponse = await fetch(`http://localhost:5678/api/works/`);
const works = await reponse.json();

generateWorks(works);

function generateWorks(works){
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