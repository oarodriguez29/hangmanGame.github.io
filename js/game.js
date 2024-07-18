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
    palabraObtenida = palabra[Math.floor(Math.random() * palabra.length)];
    ocultarPalabra = Array(palabraObtenida.length).fill("_");
    letraErrada = [];
    intentosRestantes = cantidadIntentos;

    actualizarInterfaz();

    document.getElementById("letra").value = "";
    document.getElementById("letra").focus();
    document.getElementById("adivinar").style.display = "inline-block";
    document.getElementById("reiniciar").style.display = "inline-block";
    document.getElementById("msj").textContent = "";

}

function adivinarLetra() {
    const input = document.getElementById("letra");
    const letra = input.value.toLowerCase();

    if (letra && !letraErrada.includes(letra) && !ocultarPalabra.includes(letra)) {
        if (palabraObtenida.includes(letra)) {
            for (let i = 0; i < palabraObtenida.length; i++) {
                if (palabraObtenida[i] === letra) {
                    ocultarPalabra[i] = letra;
                }
            }
        }else{
            letraErrada.push(letra);
            intentosRestantes--;
        }
        input.value = "";
        actualizarInterfaz();

        if (ocultarPalabra.join("") === palabraObtenida) {
            document.getElementById("msj").textContent = "¡Felicidades has Ganado el Juego!";
            gameOver();
        }else if (intentosRestantes <= 0) {
            document.getElementById("msj").textContent = `¡Has perdido el Juego, la palabra era "${palabraObtenida}"`;
            gameOver();
        }
    }
}

function actualizarInterfaz() {
    document.getElementById("palabraOculta").textContent = ocultarPalabra.join(" ");
    document.getElementById("letraErrada").textContent = `Letras Erradas: ${letraErrada.join(", ")}`;
    var intentos = document.getElementById("ahorcado");
    var mensaje = `Intentos Restantes: ${intentosRestantes}`;
    if (intentosRestantes >= 5) {        
        intentos.textContent = mensaje;
        intentos.style.color = "green";
        
    }else if ( (intentosRestantes === 4) || (intentosRestantes === 3 ) ) {
        intentos.textContent = mensaje;
        intentos.style.color = "yellowgreen";
    }else{
        intentos.textContent = mensaje;
        intentos.style.color = "darkred";
    }
    
    //console.log('intentos: ',bien);
}

function gameOver() {
    //document.getElementById("adivinar").style.display = "none";
    document.getElementById("reiniciar").style.display = "inline-block";
}