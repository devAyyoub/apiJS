// URL de la API
const apiUrl = "https://rickandmortyapi.com/api/character";

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
    // Hacer algo con los datos obtenidos de la API
    console.log('Datos de la API:', data);
    // saca el name de los personajes y los pone en el html
    data.results.forEach(result => {
      console.log(result.name);
    });
  })
  .catch(error => {
    // Manejar errores de red o de la API
    console.error('Error al obtener datos de la API:', error);
  });