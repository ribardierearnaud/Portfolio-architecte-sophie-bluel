const credentials = window.sessionStorage.getItem("credentials");
const loginLink = document.getElementById("login-link");
loginLink.innerHTML = "Login";

// Vérifier si la page actuelle est la page de connexion (login.html)
if (document.body.classList.contains('login-page')) {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Récupération des valeurs des champs email et mot de passe
    const email = loginForm.email.value;
    const password = loginForm.password.value;


    // Envoi des données de connexion à l'API pour vérification
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
        if (response.ok) {
            // Si la réponse est OK, on retourne les données JSON
            return response.json();
        } else {
            // Si la réponse est un échec, on rejette la promesse avec une erreur
            throw new Error("Erreur de connexion");
        }
        })
        .then((credentials) => {
        // Les données de connexion sont retournées ici
        const credentialIntoJson = JSON.stringify(credentials);
        // On stocke les données de la session
        window.sessionStorage.setItem("credentials", credentialIntoJson);
        // On redirige vers la page des projets si la connexion est réussie
        window.location.replace("./index.html");
        })
        .catch((error) => {
        // Gestion des erreurs ici
        console.error(error);
        alert("Le login ou le mot de passe est erroné");
        });
    });

} else if (document.body.classList.contains('index-page')) {

    const pannel = document.getElementById("admin-pannel");
    const mainpicturebutton = document.getElementById("edit-main-picture1");
    const projectsbutton = document.getElementById("edit-projects1");
    const filters = document.getElementById("gallery-filters1");

    if (credentials) {
        pannel.innerHTML = '<p class="edition-intro"><i class="fa-regular fa-pen-to-square"></i>Mode édition</p><p class="edition-input"><input type="submit" class="edition-changes" value="publier les changements"></p>';
        mainpicturebutton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier</p>';
        projectsbutton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier</p>';

        // Ajout d'un événement d'écoute pour le bouton modifier l'image
        mainpicturebutton.addEventListener("click", () => {
            // Afficher une information comme quoi le changement d'image n'est pas encore disponible
            alert("Feature not available yet");
        })

        // Ajout d'un événement d'écoute pour le bouton modifier les projets
        projectsbutton.addEventListener("click", () => {
            // Afficher une information comme la modale n'est pas encore disponible
            alert("Affichage de la modale à venir");
        })

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
    loginLink.innerHTML = '<a href="./login.html">login</a>';
}