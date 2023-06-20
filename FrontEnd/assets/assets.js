

// Génération de la page sans filtre
generateWorks("Tous","main");

export async function generateWorks(category, context) {

    // Récupération des travaux depuis l'API
    fetch(`http://localhost:5678/api/works/`).then(response=>{
        return response.json();  
    }
    ).then(
    works => {
        // on vérifie la présence d'une galerie sur la page et l'on supprime son éventuel contenu
    const gallery = document.querySelector(".gallery");
    if (!gallery) {
        // Si l'élément avec la classe "gallery" n'est pas trouvé, on quitte la fonction
        return;
    }
    
    if (context === "modale") {
        for (let i = 0; i < works.length; i++) {

            const figure = works[i];
            // Récupération de l'élément du DOM qui peuplera la "gallery" de la modale
            const sectionModaleGallery = document.querySelector(".gallery-modal");
            // Création d’une balise dédiée à un projet d'architecture
            const figureElement = document.createElement("figure");
            figureElement.classList.add("figureModale");

            // Création des balises 
            const imageElement = document.createElement("img");
            imageElement.src = figure.imageUrl;

            const iconsElement = document.createElement("div");
            iconsElement.classList.add("icons");
            iconsElement.innerHTML = `<div class="enlarge"><i class="fa-solid fa-arrows-up-down-left-right"></i></div> <div class="bin"><i class="fa-solid fa-trash-can"></i></div>`

            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = "éditer";
    
            
            // On rattache la balise figure à la section Gallery
            sectionModaleGallery.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            figureElement.appendChild(iconsElement);
        }

    } else if (context === "main") {

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
}
)
}

