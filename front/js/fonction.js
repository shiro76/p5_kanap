export async function getArticles(){
        let res = await fetch("http://localhost:3000/api/products/")
        let articles = await res.json();
        // console.log('toto-res', articles);
        return articles;
}

// export function {
//     getArticles: async function(){
//         let res = await fetch("http://localhost:3000/api/products/")
//         let articles = await res.json();
//         // console.log('toto-res', articles);
//         return articles;
//     }
// }
