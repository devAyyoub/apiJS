document.addEventListener('DOMContentLoaded', () => {
    // Le meto al boton el evento click que llama a enviarDatos
    document.querySelector('input[type="button"]').addEventListener('click', enviarDatos);
    // Ejecuto la funcion traerDatos una vez cargue el DOM (puedes poner el defer en el html tambien, o usar window.onload)
    traerDatos();

    // ? en este caso, academia.sql tiene una tabla alumnos, que tiene un campo 'exp_curso' el cual es una foreign key de la tabla de cursos
    // ? Por lo tanto he creado cursos.php el cual me devolverá todos los  expedientes y nombres de la tabla cursos

    // ? Para generar los options del select:
    // ?  Hago un fetch de cursos.php
    fetch('cursos.php')
        .then(response => response.json())
        // Al json le hago un foreach
        .then(data => data.forEach(curso => {
            // Selecciono el select y le añado una opcion, el primer argumento es lo que ve el usuario, y el segundo argumento será el value
            document.querySelector('select').add(new Option(curso.nombre, curso.expediente));
        }))
        .catch(error => console.log('Error:', error))


});

// ? Funcion para mostrar los datos de la BBDD
function traerDatos() {
    // En el fetch ponemos el nombre del archivo.php, en este caso queremos mostrar los datos por lo que haremos un fetch a consulta.php
    fetch('consulta.php')
        .then(response => response.json())
        // Hago un forEach de data y le paso la funcion insertarFilas
        // aqui automaticamente ya le estas pasando el parametro
        .then(data => data.forEach(insertarFilas))
        // ! Otra forma de hacerlo para que se entienda mejor (espero)
        // .then(data => data.forEach(alumno => {
        //     insertarFilas(alumno);
        // }))
        // ! esto es si eres subnormal y todavia no lo has entendido:
        // .then(data => {
        //     for (let i = 0; i < data.length; i++) {
        //         insertarFilas(data[i]);
        //     }
        // })
        // El catch por si sale algun error
        .catch(error => console.log('Error', error))
}

// ? Funcion para insertar los datos en la tabla
function enviarDatos() {
    // Hago un new FormData de mi formulario, esto me va a dar todos los datos del formulario
    const datos = new FormData(document.querySelector('form'));

    // Si quieres ver cierto valor de algun campo del formulario puedes hacer un .get y el nombre del campo:
    console.log(datos.get('dni'));

    // Hago un fetch de procesar.php
    fetch('procesar.php', {
        // Metodo POST
        method: 'POST',
        // En el body simplemente le pasas los datos del formulario
        body: datos
    })
        // ! Si el servidor te devuelve un JSON válido, puedes hacer .json(), si no te devuelve un JSON valido, pon .text()
        // ! lo que puso Jaime originalmente, no devolvia un JSON valido por lo que habia que hacer .text(). Lo he modificado para que devuelva un JSON valido
        .then(response => response.json())
        // .then(response => response.text())
        // Aqui hago un console.log de lo que me devuelva php
        //.then(data => console.log(data))
        // ? Incluso tambien podrías hacerle el form.submit().
         .then(data => document.querySelector('form').submit())
        .catch(error => console.log('Error:', error));
}

// ? Insertar los TR en el TBODY y le paso el objeto alumno por parametro
function insertarFilas(alumno) {
    // Creo el tr
    const tr = document.createElement('tr');

    // Uso for in para recorrer los campos
    for (const campo in alumno) {
        // Creo el TD
        const td = document.createElement('td');
        // Pongo de texto el valor del campo
        td.textContent = alumno[campo];
        // Meto el td en el tr
        tr.appendChild(td);
    }

    // ? con un foreach:

    // ! si lo quieres hacer con un foreach, primero tienes que convertir el objeto alumno a un array:
    // ! En este caso lo unico que me importa es el valor, por lo tanto hago un Object.values. Si te interesa tambien la clave, puedes hacer un Object.entries el cual te lo transforma a un array asi [clave, valor]

    // Object.values(alumno).forEach(valor => {
    //     const td = document.createElement('td');
    //     td.textContent = valor;
    //     tr.appendChild(td);
    // });

    // Meto el tr en el tbody
    document.querySelector('tbody').appendChild(tr);
}




// ! Esto de aqui es para que tambien muestre el nombre del curso, buscando el codigo. No creo que jaime pida algo así pero quien sabe
// ! En este caso, debo usar async y await ya que mas adelante voy a trabajar con el array, y me hace falta esperar a que se obtengan todos los datos.
// ! Aparte para usar esto debes traerte tambien el exp_curso desde PHP
// async function insertarFilas(alumno) {
//     // Creo el tr
//     const tr = document.createElement('tr');
//     // almaceno los cursos
//     const cursos = await fetch('cursos.php')
//         .then(response => response.json())
//         .catch(error => console.log('Error:', error))

//     // Uso for in para recorrer los campos
//     for (const campo in alumno) {
//         // Creo el TD
//         const td = document.createElement('td');
//         // Si el campo es exp_curso
//         if (campo === 'exp_curso') {
//             // Pongo de texto, el nombre del curso
//             // Lo que hace este find es buscarme el curso que tenga el mismo numero de expediente que el actual que esta recorriendo. Una vez me devuelva eso, le hago .nombre
//             td.textContent = cursos.find(curso => curso.expediente === alumno[campo]).nombre
//         } else {
//             // Si no es exp_curso
//             td.textContent = alumno[campo];
//         }

//         // ! Y esta version es para jaime:
//         // td.textContent = campo === 'exp_curso' ? cursos.find(curso => curso.expediente === alumno[campo]).nombre : alumno[campo];

//         // Meto el td en el tr
//         tr.appendChild(td);
//     }

//     // ? Con un foreach:

//     // ! En este caso me interesa tambien la clave por lo que le hago un .entries, para llevarme el campo y el valor

//     // Object.entries(alumno).forEach(([campo, valor]) => {
//     //     const td = document.createElement('td');
//     //     if (campo === 'exp_curso') {
//     //         td.textContent = cursos.find(curso => curso.expediente === valor).nombre;
//     //     } else {
//     //         td.textContent = valor;
//     //     }

//     //     // ! para jaime:
//     //     // td.textContent = campo === 'exp_curso' ? cursos.find(curso => curso.expediente === valor).nombre : valor

//     //     tr.appendChild(td);
//     // });

//     // Meto el tr en el tbody
//     document.querySelector('tbody').appendChild(tr);
// }