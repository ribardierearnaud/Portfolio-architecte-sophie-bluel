

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
                        iconsElement.innerHTML = `<div class="enlarge"><i class="fa-solid fa-arrows-up-down-left-right"></i></div> <div class="bin"><i class="fa-solid fa-trash-can"></i></div>`;
    
                        // Création de la balise figcaption pour le texte "éditer"
                        const figcaptionElement = document.createElement("figcaption");
                        figcaptionElement.innerText = "éditer";
    
                        // Ajout des icônes et du texte à la figure
                        figureElement.appendChild(iconsElement);
                        figureElement.appendChild(figcaptionElement);
                    }
    
                    // Ajout de la figure à l'élément de galerie correspondant
                    sectionGallery.appendChild(figureElement);
                } else {
                    const categoryWork = works[j].category.id;
            
                    if (categoryWork ===  category) {
                    // Création d’une balise dédiée à un projet d'architecture
                    const figureElement = document.createElement("figure");
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
    
    /* if (context === "modale") {
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
*/
