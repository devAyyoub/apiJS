document.getElementById('generarBtn').addEventListener('click', function () {
  // URL de la API
  const apiUrl = "https://jsonplaceholder.typicode.com/comments";

  fetch(apiUrl)
    .then(response => {
      // Verificar si la solicitud fue exitosa (código de respuesta 200)
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }

      // Parsear la respuesta como JSON
      return response.json();
    })
    .then(data => {
      // Seleccionar el contenedor de salida
      const salidaContainer = document.getElementById('salida');

      // Obtener un comentario aleatorio
      const comentarioAleatorio = data[Math.floor(Math.random() * data.length)];

      // Crear un párrafo con el cuerpo del comentario aleatorio
      const pElement = document.createElement('p');
      pElement.textContent = comentarioAleatorio.body;

      // Limpiar el contenido anterior del contenedor
      salidaContainer.innerHTML = '';

      // Insertar el párrafo en el contenedor
      salidaContainer.appendChild(pElement);
    })
    .catch(error => {
      // Manejar errores de red o de la API
      console.error('Error al obtener datos de la API:', error);
    });
});
