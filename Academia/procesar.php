<?php
// header('Content-Type: application/json; charset=utf-8');

// He cambiado los $valores para que luego me devuelva un JSON valido al hacer json_encode. Lo que he hecho ha sido meterlo en un array con claves

// Tambien he añadido la consulta necesaria para insertar datos

// cambiar los datos si es necesario
$HOST = "localhost";
$USER = "root";
$PASS = "";
$DB = "academia";

$conexion = new mysqli($HOST, $USER, $PASS, $DB);

// He añadido todos los campos
if (isset($_POST['dni']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['edad']) && isset($_POST['exp_curso'])) {

    $dni = $_POST['dni'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $edad = $_POST['edad'];
    $exp_curso = $_POST['exp_curso'];

    if ($dni === "" || $nombre === "" || $apellidos === "" || $edad === "" || $exp_curso === "") {
        $valores = array("error" => "Rellena todos los campos");
    } else {
        $sql = "INSERT INTO alumnos VALUES ('$dni', '$nombre', '$apellidos', '$edad', '$exp_curso')";

        if ($conexion->query($sql)) {
            $valores = array("data" => array("dni" => $dni, "nombre" => $nombre, "apellidos" => $apellidos, "edad" => $edad, "exp_curso" => $exp_curso));
        } else {
            $valores = array("error" => "Error: " . $conexion->error);
        }
    }
} else {
    $valores = array("error" => "No vienes del sitio adecuado.");
}
// Lo he cambiado a 1 segundo ya que 3 era bastante y mi tiempo vale oro y no se malgasta
sleep(1);

echo json_encode($valores);
