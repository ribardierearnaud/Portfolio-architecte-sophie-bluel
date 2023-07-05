const credentials = window.sessionStorage.getItem("credentials");

if (credentials) {
    document.getElementsByClassName('login-section')[0].style.display = "none";
}
else {
    document.getElementsByClassName('already-connected')[0].style.display = "none";
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
}