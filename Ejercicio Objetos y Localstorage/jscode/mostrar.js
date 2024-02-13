let section = document.querySelector('section');
let book = JSON.parse(sessionStorage.getItem('book'));
let titulo = document.createElement('h1');
titulo.innerText=book.title;
section.appendChild(titulo);
let tabla = document.createElement('table');

for (let elemento in book) {
    if (elemento !== "cover") {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = elemento;
        let td2 = document.createElement("td");
        td2.innerText = book[elemento];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tabla.appendChild(tr);
    }
}
section.appendChild(tabla);


let imagen = document.createElement('img');
imagen.src=book.cover


section.appendChild(imagen);

let botonVolver = document.querySelector('a');

botonVolver.addEventListener('click', () => {
    location.href="inicio.html";
})

sessionStorage.removeItem('book');