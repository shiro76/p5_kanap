import {getArticles} from "./getArticles.js";

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

let articlesBdd = await getArticles();
console.log('Article', articlesBdd)
class Panier {
    constructor() {
        //Initialisation du local storage
        console.table(produitLocalStorage);
        this.positionEmptyCart = document.querySelector("#cart__items");
    }

    //insertion des élements du panier
    displayCart() {
        //si le panier est vide
        if (produitLocalStorage === null || produitLocalStorage == 0) {
            const emptyCart = `<p>Votre panier est vide</p>`;
            this.positionEmptyCart.innerHTML = emptyCart;

        } else {
            for (let produit in produitLocalStorage) {
                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                document.querySelector("#cart__items").appendChild(productArticle);
                productArticle.className = "cart__item";
                productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

                // Insertion de l'élément "div"
                let productDivImg = document.createElement("div");
                productArticle.appendChild(productDivImg);
                productDivImg.className = "cart__item__img";

                // Insertion de l'image
                let productImg = document.createElement("img");
                productDivImg.appendChild(productImg);
                productImg.src = produitLocalStorage[produit].imgProduit;
                productImg.alt = produitLocalStorage[produit].altImgProduit;

                // Insertion de l'élément "div"
                let productItemContent = document.createElement("div");
                productArticle.appendChild(productItemContent);
                productItemContent.className = "cart__item__content";

                // Insertion de l'élément "div"
                let productItemContentTitlePrice = document.createElement("div");
                productItemContent.appendChild(productItemContentTitlePrice);
                productItemContentTitlePrice.className = "cart__item__content__titlePrice";

                // Insertion du titre h3
                let productTitle = document.createElement("h2");
                productItemContentTitlePrice.appendChild(productTitle);
                productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

                // Insertion de la couleur
                let productColor = document.createElement("p");
                productTitle.appendChild(productColor);
                productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
                productColor.style.fontSize = "20px";

                // Insertion du prix
                let productPrice = document.createElement("p");
                productItemContentTitlePrice.appendChild(productPrice);
                productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

                // Insertion de l'élément "div"
                let productItemContentSettings = document.createElement("div");
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.className = "cart__item__content__settings";

                // Insertion de l'élément "div"
                let productItemContentSettingsQuantity = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

                // Insertion de "Qté : "
                let productQte = document.createElement("p");
                productItemContentSettingsQuantity.appendChild(productQte);
                productQte.innerHTML = "Qté : ";

                // Insertion de la quantité
                let productQuantity = document.createElement("input");
                productItemContentSettingsQuantity.appendChild(productQuantity);
                productQuantity.value = produitLocalStorage[produit].quantiteProduit;
                productQuantity.className = "itemQuantity";
                productQuantity.setAttribute("type", "number");
                productQuantity.setAttribute("min", "1");
                productQuantity.setAttribute("max", "100");
                productQuantity.setAttribute("name", "itemQuantity");

                // Insertion de l'élément "div"
                let productItemContentSettingsDelete = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsDelete);
                productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

                // Insertion de "p" supprimer
                let productSupprimer = document.createElement("p");
                productItemContentSettingsDelete.appendChild(productSupprimer);
                productSupprimer.className = "deleteItem";
                productSupprimer.innerHTML = "Supprimer";
            }
        }
    }

    //total de produits et prix
    updateTotals() {

        // Récupération du total des quantités
        var elemsQtt = document.getElementsByClassName('itemQuantity');
        var myLength = elemsQtt.length,
            totalQtt = 0;

        for (var i = 0; i < myLength; ++i) {
            totalQtt += elemsQtt[i].valueAsNumber;
        }

        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
        console.log(totalQtt);

        // Récupération du prix total
        let totalPrice = 0;
        

        for (var i = 0; i < myLength; ++i) {
            let prix = 0;
            let idProduit = produitLocalStorage[i].idProduit
            console.log('id',idProduit );

            let  article = articlesBdd.find(function(art){
                console.log(art)
                return  art._id === idProduit;
            })
            console.log('test',article);
            prix = article.price;
            totalPrice += (elemsQtt[i].valueAsNumber * prix);
            // totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
        }

        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }

    //modifier la quantité
    updateQtt() {
        let qttModif = document.querySelectorAll(".itemQuantity");

        for (let k = 0; k < qttModif.length; k++) {
            qttModif[k].addEventListener("change", (event) => {
                event.preventDefault();

                //Selection de l'element à modifier en fonction de son id ET sa couleur
                let quantityModif = produitLocalStorage[k].quantiteProduit;
                let qttModifValue = qttModif[k].valueAsNumber;

                const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

                resultFind.quantiteProduit = qttModifValue;
                produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                // refresh rapide
                location.reload();
            })
        }
    }

    deleteProduct() {
        let btn_supprimer = document.querySelectorAll(".deleteItem");

        for (let j = 0; j < btn_supprimer.length; j++) {
            btn_supprimer[j].addEventListener("click", (event) => {
                event.preventDefault();

                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = produitLocalStorage[j].idProduit;
                let colorDelete = produitLocalStorage[j].couleurProduit;

                produitLocalStorage = produitLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                //Alerte produit supprimé et refresh
                alert("Ce produit a bien été supprimé du panier");
                location.reload();
            })
        }
    }
}
let hasError = false;

class Formulaire {
    initAndDisplayForm () {
        // Ajout des Regex
        let form = document.querySelector(".cart__order__form");

        //Création des expressions régulières
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
        let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");



        // Ecoute de la modification du prénom
        form.firstName.addEventListener('change', async function () {
            validFirstName(this);
        });

        // Ecoute de la modification du nom
        form.lastName.addEventListener('change', async function () {
            validLastName(this);
        });

        // Ecoute de la modification de l'adresse
        form.address.addEventListener('change', async function () {
            validAddress(this);
        });

        // Ecoute de la modification de la ville
        form.city.addEventListener('change', async function () {
            validCity(this);
        });

        // Ecoute de la modification de l'email
        form.email.addEventListener('change', async function () {
            validEmail(this);
        });



        //validation du prénom
        const validFirstName = function (inputFirstName) {
            let firstNameErrorMsg = inputFirstName.nextElementSibling;

            if (charRegExp.test(inputFirstName.value)) {
                firstNameErrorMsg.innerHTML = '';
                hasError = false
            } else {
                firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
                hasError = true
            }
        };

        //validation du nom
        const validLastName = function (inputLastName) {
            let lastNameErrorMsg = inputLastName.nextElementSibling;

            if (charRegExp.test(inputLastName.value)) {
                lastNameErrorMsg.innerHTML = '';
                hasError = false
            } else {
                hasError = true
                lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };

        //validation de l'adresse
        const validAddress = function (inputAddress) {
            let addressErrorMsg = inputAddress.nextElementSibling;

            if (addressRegExp.test(inputAddress.value)) {
                hasError = false
                addressErrorMsg.innerHTML = '';
            } else {
                hasError = true
                addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };

        //validation de la ville
        const validCity = function (inputCity) {
            let cityErrorMsg = inputCity.nextElementSibling;

            if (charRegExp.test(inputCity.value)) {
                hasError = false
                cityErrorMsg.innerHTML = '';
            } else {
                hasError = true
                cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };

        const validEmail = async function (inputEmail) {
            let emailErrorMsg = inputEmail.nextElementSibling;
            let button = document.getElementById('order')

            if (emailRegExp.test(inputEmail.value)) {
                emailErrorMsg.innerHTML = '';
                hasError = false
                // button.style.pointerEvents = "visible";
                // button.style.cursor = "pointer";

            } else {
                emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
                hasError = true
                // button.style.pointerEvents = "none";
                // button.style.cursor = "default";

            }

        };
    }

    postForm() {
        const btn_commander = document.getElementById("order");
        //Ecouter le panier

        btn_commander.addEventListener("click", (event) => {
            event.preventDefault();
            if (hasError === false) {
                //Récupération des coordonnées du formulaire client
            let inputName = document.getElementById('firstName');
            let inputLastName = document.getElementById('lastName');
            let inputAdress = document.getElementById('address');
            let inputCity = document.getElementById('city');
            let inputMail = document.getElementById('email');

            //si le panier est vide 
            if (produitLocalStorage === null || produitLocalStorage == 0) {
                alert('votre panier est vide')
            }

            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i < produitLocalStorage.length; i++) {
                idProducts.push(produitLocalStorage[i].idProduit);
            }
            console.log(idProducts);

            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };


            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    const validationForm = async function () {
                        if (data.orderId == undefined) {
                            alert('Veuillez renseigner tous les champs');;
                        } else {
                            document.location.href = "confirmation.html";
                        }
                    }; validationForm();
                })

                .catch((err) => {
                    alert("Problème avec fetch : " + err.message);
                });
            }
        })
    }
}

function initPanier() {
    let panier = new Panier;
    panier.displayCart();
    panier.updateTotals();
    panier.updateQtt();
    panier.deleteProduct();
} initPanier();

function initFormulaire() {
    let form = new Formulaire();
    form.initAndDisplayForm();
    form.postForm();
} initFormulaire();
