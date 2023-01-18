$(document).ready(function(){
    $("button#enviar").click(function(){
        $("#numero").post("EjercicioUD9-1AJAX.php");
    });

    $("#obtener").click(function(){
        alert("hola")
    });
});