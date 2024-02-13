let section = document.querySelector('section');
let h1 = document.querySelector('h1').innerText= 'Hay '+ library.length+ " libros en la biblioteca";
for (const book in library) {
    let article = document.createElement('article');
    article.className="presentacion";
    let h3 =  document.createElement('h3');
    h3.innerText = library[book].title;
    let imagen = document.createElement('img');
    imagen.src = library[book].cover;
    article.appendChild(h3);
    article.appendChild(imagen);
    section.appendChild(article);
    article.addEventListener("click", function() {
        sessionStorage.setItem("book", JSON.stringify(library[book]));

        location.href="mostrar.html";       
    })
}