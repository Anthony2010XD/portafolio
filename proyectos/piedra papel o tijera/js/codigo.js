function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
  let resultado = "";
  if (jugada == 1) {
    resultado = "Piedra✊";
  } else if (jugada == 2) {
    resultado = "Papel📄";
  } else if (jugada == 3) {
    resultado = "Tijera✂️";
  } else {
    resultado = "Mal elegido";
  }
  return resultado;
}

// --- DOM: conectar elementos del HTML ----

const btnPiedra = document.getElementById("btnPiedra");
const btnPapel = document.getElementById("btnPapel");
const btnTijera = document.getElementById("btnTijera");
const btnReiniciar = document.getElementById("btnReiniciar");

const txtJugador = document.getElementById("txtJugador");
const txtPc = document.getElementById("txtPc");
const txtResultado = document.getElementById("txtResultado");
const txtTriunfos = document.getElementById("txtTriunfos");
const txtPerdidas = document.getElementById("txtPerdidas");
const txtEmpates = document.getElementById("txtEmpates");

const sonidowin = new Audio("sounds/superpuyofans1234-winner-game-sound-404167.mp3");
const sonidolose = new Audio("sounds/drummusiclooper5000-lose-sfx-365579.mp3");

// 1 es piedra, 2 es papel, 3 es tijera

let jugador = 0;
let pc = 0;
let triunfos = 0;
let perdidas = 0;
let empates = 0;
let JuegoTerminado = false;

function jugarRonda(jugador, event) {
  const boton = event.target;
  boton.classList.add("animar");
    setTimeout(() => {
      boton.classList.remove("animar");
    }, 300);

  if (JuegoTerminado) {
    return;
  }
  pc = aleatorio(1, 3);

  txtJugador.textContent = eleccion(jugador);
  txtPc.textContent = eleccion(pc);

  if (jugador == pc) {
    txtResultado.textContent = "EMPATE";
    empates = empates + 1;
  } else if (jugador == 1 && pc == 3) {
    txtResultado.textContent = "GANASTE!";
    triunfos = triunfos + 1;
  } else if (jugador == 2 && pc == 1) {
    txtResultado.textContent = "GANASTE!";
    triunfos = triunfos + 1;
  } else if (jugador == 3 && pc == 2) {
    txtResultado.textContent = "GANASTE!";
    triunfos = triunfos + 1;
  } else {
    txtResultado.textContent = "PERDISTE";
    perdidas = perdidas + 1;
  }

  txtTriunfos.textContent = triunfos;
  txtPerdidas.textContent = perdidas;
  txtEmpates.textContent = empates;

  if (triunfos >= 3) {
    txtResultado.textContent = `🏆 Ganaste el juego! (${triunfos} - ${perdidas})`;
    txtResultado.classList.add("ganar");
    sonidowin.play();
    JuegoTerminado = true;
  } else if (perdidas >= 3) {
    txtResultado.textContent = "Lo siento, has perdido el juego. 😞";
    txtResultado.classList.add("perder");
    sonidolose.play();
    JuegoTerminado = true;
  }

  
}

function reiniciarJuego() {

  jugador = 0;
  pc = 0;
  triunfos = 0;
  perdidas = 0;
  empates = 0;

  txtJugador.textContent = "-";
txtPc.textContent = "-";
txtResultado.textContent = "Haz click en un botón para jugar";
txtTriunfos.textContent = "0";
txtPerdidas.textContent = "0";
txtEmpates.textContent = "0";
txtResultado.classList.remove("ganar", "perder");
JuegoTerminado = false;
  }

// Evento de los botones

btnPiedra.addEventListener("click", (event) => jugarRonda(1, event));
btnPapel.addEventListener("click", (event) => jugarRonda(2, event));
btnTijera.addEventListener("click", (event) => jugarRonda(3, event));
btnReiniciar.addEventListener("click", reiniciarJuego);

//estado inicial
reiniciarJuego();

