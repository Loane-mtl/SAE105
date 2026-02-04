// Séance 1 - SAÉ 105
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM chargé");

    // On charge les données JSON depuis images.json
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            console.log("Données chargées :", data);

            // Code qui utilise DATA
            let listeImagesDiv = document.querySelector('.liste-images');
            data.forEach((objet, index) => {
                listeImagesDiv.innerHTML +=
                    '<div class="card">' +
                    '<img src="' + objet.src + '" class="taille-image2 image-cliquable" alt="' + objet.alt + '">' +
                    '<div class="card-text">' +
                    '<h2>' + objet.titre + '</h2>' +
                    '<p>' + objet.descriptionImage + '</p>' +
                    '<p>Pourquoi j’ai choisi cette image ? ' + objet.choixImage + '</p>' +
                    '<p>Source : ' + objet.urlSource + '</p>' +
                    '<p>Propriétaire : ' + objet.proprietaire + '</p>' +
                    '</div>' +
                    '</div>';

                console.log('Image ajoutée :', objet.titre);
            });

            // Event listeners sur images cliquables (fenêtre modal) 
            const modal = document.getElementById('modal');
            const bouttonClose = document.getElementById('close-modal');
            const modalBackground = document.getElementById("modal-background")
            const modalImage = document.getElementById('image-modal');
            const imagesCliquable = document.querySelectorAll('.image-cliquable');

            imagesCliquable.forEach(function (image) {
                image.addEventListener('click', function () {
                    modalImage.src = image.src;
                    modal.style.display = "flex";
                });
            });

            bouttonClose.addEventListener('click', function () {
                modal.style.display = "none";
            });

            modalBackground.addEventListener('click', function () {
                modal.style.display = "none";
            });
        })
        .catch(error => console.error("Erreur lors du chargement du JSON :", error));

    //code SAÉ 105 - Séance 5 & 6 
    //QUESTION 3, 4 & 5 
    let champTitreCommentaire = document.getElementById('comments-title');
    let champCommentaire = document.getElementById('comments');
    let champImage = document.getElementById("image");

    let zonePreviewImage = document.getElementById("preview-image");
    let zonePreviewTitle = document.getElementById('preview-title');
    let zonePreviewText = document.getElementById('preview-text');


    //Aperçu image 
    champImage.addEventListener("keyup", function () {
        zonePreviewImage.src = champImage.value;
    });

    //Relâche une touche dans le titre
    champTitreCommentaire.addEventListener('keyup', function () {
        console.log("Touche relâchée !");
        console.log("Nouvelle valeur du champ titre :", champTitreCommentaire.value);
        zonePreviewTitle.innerHTML = champTitreCommentaire.value;
    });

    //Relâche une touche dans le commentaire 
    champCommentaire.addEventListener('keyup', function () {
        console.log("Touche relâchée !");
        console.log("Nouvelle valeur du champ commentaire :", champCommentaire.value);
        zonePreviewText.innerHTML = champCommentaire.value;
    });

    //code pour validité adresse-mail saisie
    console.log("Champ email :", document.getElementById('email'));
    document.getElementById('email').addEventListener('input', function () {
        let email = document.getElementById("email").value;
        let text = document.getElementById('text-email');
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        text.style.display = "block";

        if (email.match(pattern)) {
            text.innerHTML = "Votre adresse Mail est valide";
            text.style.color = "#1a961a";
        } else {
            text.innerHTML = "Votre adresse Mail est invalide";
            text.style.color = "#e52c2c";
        }
        console.log("Valeur saisie :", email);
        console.log("Texte affiché :", text.innerHTML)
    });

    //code pour validité de l'url saisie 
    document.getElementById('image').addEventListener('input', function () {
        let url = document.getElementById("image").value;
        let textURL = document.getElementById('text-url');

        let pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

        textURL.style.display = "block";

        if (url === "") {
            textURL.innerHTML = "Veuillez saisir l’URL de votre image.";
            textURL.style.color = "#e52c2c";
        }
        else if (pattern.test(url)) {
            textURL.innerHTML = "L’URL est valide";
            textURL.style.color = "#1a961a";
        }
        else {
            textURL.innerHTML = "L’URL n’est pas valide";
            textURL.style.color = "#e52c2c";
        }

        console.log("URL saisie :", url);
        console.log("Texte affiché :", textURL.innerHTML);
    });



    //code messages qui s'affichent si les champs ne sont pas remplis
    let form = document.querySelector('form');
    let textErreur = document.getElementById('message-erreur');
    const bouton = document.getElementById('valider');

    bouton.addEventListener('click', function () {
        // Simule l'événement submit
        form.dispatchEvent(new Event('submit'));
    });


    form.addEventListener('submit', function (event) {
        let champsObligatoire = document.querySelectorAll('[required]');
        let erreur = false;

        champsObligatoire.forEach(function (champ) {

            let messageChampErreur = champ.nextElementSibling;


            if (champ.value === "") {
                erreur = true;
                event.preventDefault();
                document.title = "Le formulaire contient des erreurs. Veuillez corriger les champs signalés.";
                textErreur.innerHTML = "Le formulaire contient des erreurs. Veuillez corriger les champs signalés.";
                champ.classList.add('error')
            }

            if (champ.value === "") {
                if (champ.id === "name") {
                    messageChampErreur.innerHTML = "Veuillez saisir votre prénom.";
                }
                else if (champ.id === "email") {
                    messageChampErreur.innerHTML = "Veuillez saisir votre adresse email.";
                    champ.classList.add('error');
                }
                else if (champ.id === "pseudo") {
                    messageChampErreur.innerHTML = "Veuillez saisir votre pseudo dans le jeu.";
                    champ.classList.add('error');
                }
                else if (champ.id === "image") {
                    messageChampErreur.innerHTML = "Veuillez saisir l’URL de votre image.";
                    champ.classList.add('error');
                }
                else if (champ.id === "comments") {
                    messageChampErreur.innerHTML = "Le commentaire doit contenir au moins 20 caractères.";
                    champ.classList.add('error');

                }

                messageChampErreur.style.color = "#e52c2c";
                messageChampErreur.style.display = "block";

            }

        });


        let bouttonRadio = document.querySelectorAll('input[name="choix"]');
        let messageRadio = document.querySelector('fieldset .champs-erreur');
        let radioCoche = false;

        bouttonRadio.forEach(function (radio) {

            if (radio.checked) {
                radioCoche = true;
            }

            if (radioCoche === false) {
                event.preventDefault();
                messageRadio.innerHTML = "Veuillez choisir une option.";
                messageRadio.style.color = "#e52c2c";
                messageRadio.style.display = "flex";
            } else {
                messageRadio.style.display = "none";
            }
        });

        console.log("Le script2 fonctionne")

        let checkbox = document.querySelector('#autorisation');
        let messageCheckbox = document.getElementById('erreur-autorisation');


        if (checkbox.checked === false) {
            event.preventDefault();
            messageCheckbox.innerHTML = "Cette autorisation est obligatoire.";
            messageCheckbox.style.color = "#e52c2c";
            messageCheckbox.style.display = "block";
        } else {
            messageCheckbox.style.display = "none";
        }

        console.log("Le script3 fonctionne")

        //code après validation du formulaire 
        if (!erreur && radioCoche === true && checkbox.checked === true) {
            event.preventDefault();
            form.style.display = "none";
            document.getElementById('confirmation').style.display = "block";

            // APPEL À L'API - qui ne fonctionne pas :(
            const login = "martinel";
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("comments").value.trim();

            const apiURL = `https://gambette.butmmi.o2switch.site/api.php?login=${encodeURIComponent(login)}&mail=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    console.log("Réponse API :", data);
                    if (data.status === "success") {
                        console.log("Message envoyé avec succès !");
                    } else {
                        alert("Erreur lors de l'envoi : " + data.error);
                    }
                })
                .catch(error => {
                    console.error("Erreur réseau :", error);
                    alert("Impossible de contacter l'API.");
                });
        }

    });



    //code pour que les messages d'erreur s'effacent 
    let champsTexte = document.querySelectorAll('#name, #pseudo, #comments');

    champsTexte.forEach(function (champ) {
        champ.addEventListener('input', function () {
            let messageChampErreur = champ.nextElementSibling;

            if (champ.id === "comments") {
                if (champ.value.length >= 20) {
                    messageChampErreur.style.display = "none";
                }
            } else if (champ.value !== "") {
                // Si le champ n'est pas vide, on masque le message d'erreur
                messageChampErreur.style.display = "none";
            }
            else {
                if (champ.value !== "") {
                    messageChampErreur.style.display = "none";
                }
            }
        });
    });
    let checkbox = document.querySelector('#autorisation');
    let messageCheckbox = document.getElementById('erreur-autorisation');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked === true) {
            messageCheckbox.style.display = "none";
        }
    });
    let bouttonRadio = document.querySelectorAll('input[name="choix"]');
    let messageRadio = document.querySelector('fieldset .champs-erreur');

    bouttonRadio.forEach(function (radio) {
        radio.addEventListener('change', function () {
            messageRadio.style.display = "none";
        });
        console.log("Message checkbox masqué");
    });
    //savoir taille du navigateur 
    console.log(window.innerWidth);
});

