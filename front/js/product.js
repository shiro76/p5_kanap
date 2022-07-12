class Produit {
    // Récupération des articles de l'API    

    getArticle() {
        let zis = this;
        this.str = window.location.href;
        this.url = new URL(this.str);
        this.idProduct = this.url.searchParams.get("id");
        console.log(this.idProduct);
        let article = "";

        this.colorPicked = document.querySelector("#colors");
        this.quantityPicked = document.querySelector("#quantity");

        fetch("http://localhost:3000/api/products/" + this.idProduct)
            .then((res) => {
                console.log('info', res)
                return res.json();
            })

            // Répartition des données de l'API dans le DOM
            .then(async function (resultatAPI) {
                article = await resultatAPI;
                console.table(article);
                if (article) {
                    zis.generatePost(article);
                    zis.addToCart(article);
                }
            })
            .catch((error) => {
                console.log("Erreur de la requête API");
            })
    }

    generatePost(article) {
        // Insertion de l'image
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        // Modification du titre "h1"
        let productName = document.getElementById('title');
        productName.innerHTML = article.name;

        // Modification du prix
        let productPrice = document.getElementById('price');
        productPrice.innerHTML = article.price;

        // Modification de la description
        let productDescription = document.getElementById('description');
        productDescription.innerHTML = article.description;

        // Insertion des options de couleurs
        for (let colors of article.colors) {
            console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }

    }

    //Gestion du panier
    addToCart(article) {
        const btn_envoyerPanier = document.querySelector("#addToCart");

        //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
        btn_envoyerPanier.addEventListener("click", (event) => {
            if (this.quantityPicked.value > 0 && this.quantityPicked.value <= 100 && this.quantityPicked.value != 0) {

                //Recupération du choix de la couleur
                let choixCouleur = this.colorPicked.value;

                //Recupération du choix de la quantité
                let choixQuantite = this.quantityPicked.value;

                //Récupération des options de l'article à ajouter au panier
                let optionsProduit = {
                    idProduit: this.idProduct,
                    couleurProduit: choixCouleur,
                    quantiteProduit: Number(choixQuantite),
                    nomProduit: article.name,
                    prixProduit: article.price,
                    descriptionProduit: article.description,
                    imgProduit: article.imageUrl,
                    altImgProduit: article.altTxt
                };

                //Initialisation du local storage
                let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

                //fenêtre pop-up
                const popupConfirmation = () => {
                    if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
            Pour consulter votre panier, cliquez sur OK`)) {
                        window.location.href = "cart.html";
                    }
                }

                //Importation dans le local storage
                //Si le panier comporte déjà au moins 1 article
                if (produitLocalStorage) {
                    const resultFind = produitLocalStorage.find(
                        (el) => el.idProduit === this.idProduct && el.couleurProduit === choixCouleur);
                    //Si le produit commandé est déjà dans le panier
                    if (resultFind) {
                        let newQuantite =
                            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                        resultFind.quantiteProduit = newQuantite;
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        popupConfirmation();
                        //Si le produit commandé n'est pas dans le panier
                    } else {
                        produitLocalStorage.push(optionsProduit);
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        popupConfirmation();
                    }
                    //Si le panier est vide
                } else {
                    produitLocalStorage = [];
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                }
            }
        });
    }
}

function init() {
    let produit = new Produit;
    produit.getArticle();
} init();

