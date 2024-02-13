<?php

// Aqui simplemente hago una consulta de la tabla cursos para traerme el expediente y el nombre del curso, para así mostrarlos en el Select

// cambiar los datos si es necesario
$HOST = "localhost";
$USER = "root";
$PASS = "";
$DB = "academia";

$conexion = new mysqli($HOST, $USER, $PASS, $DB);

if ($conexion->connect_errno) {
    echo "Fallor: " . $conexion->connect_error;
    exit();
}

$consulta = "SELECT expediente, nombre FROM cursos";
$resultado = $conexion->query($consulta);
$res = $resultado->fetch_all(MYSQLI_ASSOC);

mysqli_close($conexion);

if ($resultado) {
    echo json_encode($res);
} else {
    echo "ERROR consulta";
}
