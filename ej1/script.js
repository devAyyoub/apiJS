// URL de la API
const apiUrl = "https://www.jaimeweb.es/medac/books.json";

// Función para obtener los datos de la API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    // Verificar si la solicitud fue exitosa (código de respuesta 200)
    if (!response.ok) {
      throw new Error(`Error al obtener los datos. Código: ${response.status}`);
    }

    // Convertir la respuesta a formato JSON
    const data = await response.json();

    // Imprimir los títulos de los libros en la consola
    data.library.forEach(libro => {
      console.log(libro.book.author.otherBooks[0]);
    });

    data.library[0].book.author.otherBooks.forEach(libro => {
      console.log(libro);
    });

    // Obtener el elemento contenedor por su ID
    const div = document.getElementById("contenedor");

    // Crear un elemento <ul> para listar los títulos
    const ul = document.createElement("ul");

    // Iterar sobre los libros y crear elementos <li> para cada título
    data.library.forEach(libro => {
      const li = document.createElement("li");
      li.innerText = libro.book.title;
      ul.appendChild(li);
    });

    // Agregar la lista al contenedor
    div.appendChild(ul);

    // Devolver los datos para su posterior uso
    return data;
  } catch (error) {
    console.error(`Error al obtener los datos: ${error.message}`);
  }
}

// Llamar a la función para obtener los datos
fetchData();
