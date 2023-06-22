const credentials = window.sessionStorage.getItem("credentials");
const menu = document.querySelector("nav");

menu.innerHTML = `<ul><li id="portfolio-link">projets</li>
<li id="contact-link">contact</li>
<li id="login-link"></li>
<li id="insta-link"><img src="./assets/icons/instagram.png" alt="Instagram"></li></ul>`

const portfolioLink = document.getElementById("portfolio-link");
portfolioLink.addEventListener("click", () => {
    // Rediriger vers la page la page de connexion
    window.location.replace("./index.html#portfolio");
});

const contactLink = document.getElementById("contact-link");
contactLink.addEventListener("click", () => {
    // Rediriger vers la page la page de connexion
    window.location.replace("./index.html#contact");
});

const instaLink = document.getElementById("insta-link");
instaLink.addEventListener("click", () => {
    // Rediriger vers la page la page de connexion
    window.open("https://www.instagram.com/sophiebluel/", '_blank');
});

const loginLink = document.getElementById("login-link");
loginLink.innerHTML = "login";

if (credentials) {

    // Gestion de l'affichage "Login"/"Logout"
    loginLink.innerHTML = "logout";

    // Ajout d'un événement d'écoute pour déconnecter
    loginLink.addEventListener("click", () => {
        // Supprimer les informations de connexion de la session
        window.sessionStorage.removeItem("credentials");
        // Rediriger vers la page la page d'accueil
        window.location.replace("./index.html");
    });
} else {
    loginLink.innerHTML = `login`;
    loginLink.addEventListener("click", () => {
        // Rediriger vers la page la page de connexion
        window.location.replace("./login.html");
    });
}