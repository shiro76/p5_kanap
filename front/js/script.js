import {getArticles} from "./getArticles.js";
class Articles{

    // Répartition des données de l'API dans le DOM
    async AddOnPage() {
        await getArticles()
        .then(function (resultatAPI){

            console.log(resultatAPI);
            const articles = resultatAPI;
            for (let article in articles) {

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${resultatAPI[article]._id}`;

                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatAPI[article].imageUrl;
                productImg.alt = resultatAPI[article].altTxt;

                // Insertion du titre "h3"
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultatAPI[article].name;

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultatAPI[article].description;
            }
        })
        .catch (function(error){
            return error;
        });
    }
}
function init(){
    let article = new Articles;
    article.AddOnPage();
}init();




