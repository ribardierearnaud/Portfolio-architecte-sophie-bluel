const credentials = window.sessionStorage.getItem(`credentials`);
const menu = document.querySelector(`nav`);

menu.innerHTML = `<ul><li id='portfolio-link'><a href='./index.html#portfolio'>projets</a></li>
<li id='contact-link'><a href='./index.html#contact'>contact</a></li>
<li id='login-link'></li>
<li id='insta-link'><a href='https://www.instagram.com/sophiebluel/' target='_blank'><img src='./assets/icons/instagram.png' alt='Instagram'></a></li></ul>`;

const loginLink = document.getElementById(`login-link`);

if (credentials) {
    // Gestion de l'affichage `Login`/`Logout`
    loginLink.innerHTML = `logout`;

    // Ajout d'un événement d'écoute pour déconnecter
    loginLink.addEventListener(`click`, () => {
        // Supprimer les informations de connexion de la session
        window.sessionStorage.removeItem(`credentials`);
        // Rediriger vers la page la page d'accueil
        window.location.replace(`./index.html`);
    });
} else {
    loginLink.innerHTML = `<a href='./login.html'>login</a>`;
}