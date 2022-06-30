class Panier{

    static initCart(){
                //Initialisation du local storage
        this.produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        console.table(this.produitLocalStorage);
        this.positionEmptyCart = document.querySelector("#cart__items");      
    }

    static getCart(){
        if (this.produitLocalStorage === null || this.produitLocalStorage == 0) {
            const emptyCart = `<p>Votre panier est vide</p>`;
            this.positionEmptyCart.innerHTML = emptyCart;

        } else {
        for (let produit in this.produitLocalStorage){
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', this.produitLocalStorage[produit].idProduit);
        
            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
        
            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = this.produitLocalStorage[produit].imgProduit;
            productImg.alt = this.produitLocalStorage[produit].altImgProduit;
            
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
            productTitle.innerHTML = this.produitLocalStorage[produit].nomProduit;
        
            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = this.produitLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "20px";
        
            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = this.produitLocalStorage[produit].prixProduit + " €";
        
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
            productQuantity.value = this.produitLocalStorage[produit].quantiteProduit;
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
        }}
    }

    static getTotals(){

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
            totalPrice += (elemsQtt[i].valueAsNumber * this.produitLocalStorage[i].prixProduit);
        }
    
        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }

    static modifyQtt() {
        let qttModif = document.querySelectorAll(".itemQuantity");
    
        for (let k = 0; k < qttModif.length; k++){
            qttModif[k].addEventListener("change" , (event) => {
                event.preventDefault();
    
                //Selection de l'element à modifier en fonction de son id ET sa couleur
                let quantityModif = this.produitLocalStorage[k].quantiteProduit;
                let qttModifValue = qttModif[k].valueAsNumber;
                
                const resultFind = this.produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);
    
                resultFind.quantiteProduit = qttModifValue;
                this.produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;
    
                localStorage.setItem("produit", JSON.stringify(this.produitLocalStorage));
            
                // refresh rapide
                location.reload();
            })
        }
    }

    static deleteProduct() {
        let btn_supprimer = document.querySelectorAll(".deleteItem");
    
        for (let j = 0; j < btn_supprimer.length; j++){
            btn_supprimer[j].addEventListener("click" , (event) => {
                event.preventDefault();
    
                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = this.produitLocalStorage[j].idProduit;
                let colorDelete = this.produitLocalStorage[j].couleurProduit;
    
                this.produitLocalStorage = this.produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
                
                localStorage.setItem("produit", JSON.stringify(this.produitLocalStorage));
    
                //Alerte produit supprimé et refresh
                alert("Ce produit a bien été supprimé du panier");
                location.reload();
            })
        }
    }
}

class Formulaire{ 
    static getForm() {

        // Ajout des Regex
        let form = document.querySelector(".cart__order__form");
    
        //Création des expressions régulières
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
        let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    
        
    
        // Ecoute de la modification du prénom
        form.firstName.addEventListener('change', async function() {
            validFirstName(this);
        });
    
        // Ecoute de la modification du nom
        form.lastName.addEventListener('change', async function() {
            validLastName(this);
        });
    
        // Ecoute de la modification de l'adresse
        form.address.addEventListener('change', async function() {
            validAddress(this);
        });
    
        // Ecoute de la modification de la ville
        form.city.addEventListener('change', async function() {
            validCity(this);
        });
    
        // Ecoute de la modification de l'email
        form.email.addEventListener('change', async function() {
            validEmail(this);
        });
    
        
    
        //validation du prénom
        const validFirstName = function(inputFirstName) {
            let firstNameErrorMsg = inputFirstName.nextElementSibling;
    
            if (charRegExp.test(inputFirstName.value)) {
                firstNameErrorMsg.innerHTML = '';
            } else {
                firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };
    
        //validation du nom
        const validLastName = function(inputLastName) {
            let lastNameErrorMsg = inputLastName.nextElementSibling;
    
            if (charRegExp.test(inputLastName.value)) {
                lastNameErrorMsg.innerHTML = '';
            } else {
                lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };
    
        //validation de l'adresse
        const validAddress = function(inputAddress) {
            let addressErrorMsg = inputAddress.nextElementSibling;
    
            if (addressRegExp.test(inputAddress.value)) {
                addressErrorMsg.innerHTML = '';
            } else {
                addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };
    
        //validation de la ville
        const validCity = function(inputCity) {
            let cityErrorMsg = inputCity.nextElementSibling;
    
            if (charRegExp.test(inputCity.value)) {
                cityErrorMsg.innerHTML = '';
            } else {
                cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            }
        };
        
        const validEmail = async function(inputEmail) {
            let emailErrorMsg = inputEmail.nextElementSibling;
            let button = document.getElementById('order')

            if(emailRegExp.test(inputEmail.value)){
                emailErrorMsg.innerHTML = '';
                noPressEnter(false)
                button.style.pointerEvents = "visible";
                button.style.cursor = "pointer";

            }else {
                emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
                button.style.pointerEvents = "none";
                button.style.cursor = "default";

            }
            
        };
    }

    static postForm(){
        this.produitLocalStorage = Panier.produitLocalStorage;
        const btn_commander = document.getElementById("order");
    
        //Ecouter le panier
        btn_commander.addEventListener("click", (event)=>{
        event.preventDefault();
    
        
            //Récupération des coordonnées du formulaire client
            let inputName = document.getElementById('firstName');
            let inputLastName = document.getElementById('lastName');
            let inputAdress = document.getElementById('address');
            let inputCity = document.getElementById('city');
            let inputMail = document.getElementById('email');
    
            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i<this.produitLocalStorage.length;i++) {
                idProducts.push(this.produitLocalStorage[i].idProduit);
            }
            console.log(idProducts);
    
            const order = {
                contact : {
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
                const validationForm = async function(){
                    if (data.orderId == undefined) {
                        alert('Veuillez renseigner tous les champs');;
                    } else {
                        document.location.href = "confirmation.html";
                    }     
                };validationForm();
                
            })
            
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
            })
    }

    static noPressEnterKeyboard(){
        (function(n) {
            var f = function(e) {
                var c = e.which || e.keyCode;
                if (c == 13) {
                e.preventDefault();
                return false;
                }
            };
            window.noPressEnter = function(a, b) {
                b = (typeof b === 'boolean') ? b : true;
                if (b) {
                a.addEventListener(n, f);
                } else {
                a.removeEventListener(n, f);
                }
                return a;
            };
        })('keydown');
        
        let inputFieldEmail = document.getElementById('email')
        let inputFielLastName = document.getElementById('lastName')
        let inputFieldFirstName = document.getElementById('firstName')
        let inputFieldCity = document.getElementById('city')
        let inputFieldAddress = document.getElementById('address')
        
        noPressEnter(inputFieldEmail)
        noPressEnter(inputFielLastName);
        noPressEnter(inputFieldFirstName);
        noPressEnter(inputFieldCity);
        noPressEnter(inputFieldAddress);
    }
}

function initPanier(){
    Panier.initCart();
    Panier.getCart();
    Panier.getTotals();
    Panier.modifyQtt();
    Panier.deleteProduct();
}initPanier();

function initFormulaire(){
    Formulaire.getForm();
    Formulaire.postForm();
    Formulaire.noPressEnterKeyboard();
}initFormulaire();
