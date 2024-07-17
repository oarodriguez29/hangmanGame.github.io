const palabra = ["javascript","programacion","juego","ahorcado","ganador","perdedor"];
const cantidadIntentos = 6;
let palabraObtenida;
let ocultarPalabra;
let letraErrada;
let intentosRestantes;

document.addEventListener("DOMContentLoaded", () => {
    iniciarJuego();
    document.getElementById("adivinar").addEventListener("click",adivinarLetra);
    document.getElementById("reiniciar").addEventListener("click",iniciarJuego);
    document.getElementById("letra").addEventListener("keyup",(e) => {
        if (e.key === "Enter") {
            adivinarLetra();
        }
    });
});

function iniciarJuego() {
    
}

function adivinarLetra() {
    
}

function actualizarInterfaz() {
    document.getElementById("palabraOculta").textContent = ocultarPalabra.join(" ");
    document.getElementById("letraErrada").textContent = `Letras Erradas: ${letraErrada.join(", ")}`;
    document.getElementById("ahorcado").textContent = `Intentos Restantes: ${intentosRestantes}`;
}

function gameOver() {
    document.getElementById("adivinar").style.display = "none";
    document.getElementById("reiniciar").style.display = "inline-block";
}