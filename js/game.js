const palabra = ["javascript","programacion","juego","ahorcado","ganador","perdedor"];
const cantidadIntentos = 9;
let palabraObtenida;
let ocultarPalabra;
let letraErrada;
let intentosRestantes;
let juegoFinalizado;

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
    juegoFinalizado = false;

    actualizarInterfaz();
    refrescarDibujo();

    document.getElementById("letra").value = "";
    document.getElementById("letra").focus();
    document.getElementById("adivinar").style.display = "inline-block";
    document.getElementById("reiniciar").style.display = "inline-block";
    document.getElementById("msj").textContent = "";

}

function adivinarLetra() {
    if (juegoFinalizado) {return;}

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
            actualizarDibujo();
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
}

function refrescarDibujo() {
    const partes = document.querySelectorAll('.cuerpo');
    partes.forEach(part => part.style.display = 'none');
}

function actualizarDibujo() {
    const partes = document.querySelectorAll('.cuerpo');
    const mostrarPartes = cantidadIntentos - intentosRestantes;
    for (let i = 0; i < mostrarPartes; i++) {
        partes[i].style.display = 'block';
    }    
}

function gameOver() {
    juegoFinalizado =  true;
    document.getElementById("adivinar").style.display = "none";
    document.getElementById("reiniciar").style.display = "inline-block";
}