class Palabra {
    constructor(palabra) {
        this.palabra = palabra.toUpperCase();
    }

    mostrarPalabraAdivinada(letrasAdivinadas) {
        let display = '';
        for (const letra of this.palabra) {
            if (letrasAdivinadas.includes(letra)) {
                display += letra + ' ';
            } else {
                display += '_ ';
            }
        }
        return display.trim();
    }

    contieneLetra(letra) {
        return this.palabra.includes(letra);
    }
}

class Usuario {
    constructor() {
        this.letrasAdivinadas = [];
        this.vidas = 3;
        this.puntaje = 0;
    }

    adivinarLetra(letra, palabraActual, intentos) {
        if (!this.letrasAdivinadas.includes(letra)) {
            this.letrasAdivinadas.push(letra);

            if (palabraActual.contieneLetra(letra)) {
                this.puntaje += 10;
            } else {
                if(intentos == 6){
                    this.vidas--;
                }
            }
        }
    }
}

class Juego {
    constructor(palabras) {
        this.palabras = palabras;
        this.usuario = new Usuario();
        this.intentos = 0;
        this.maxIntentos = 6;
        this.palabraActual = this.obtenerPalabraAleatoria();
        this.mostrarVidasPuntaje();
    }

    obtenerPalabraAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
        return new Palabra(this.palabras[indiceAleatorio]);
    }

    iniciarJuego() {
        this.mostrarPalabra();
        this.crearTeclado();
    }

    mostrarPalabra() {
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.textContent = this.palabraActual.mostrarPalabraAdivinada(this.usuario.letrasAdivinadas);
    }

    crearTeclado() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keyboard = document.getElementById('keyboard');

        for (const letra of alphabet) {
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = letra;
            button.addEventListener('click', () => this.adivinarLetra(letra, button));
            keyboard.appendChild(button);
        }
    }
    mostrarVidasPuntaje() {
        const vidasPuntajeDisplay = document.createElement('div');
        vidasPuntajeDisplay.classList.add('score');
        vidasPuntajeDisplay.textContent = `Vidas: ${this.usuario.vidas} - Puntaje: ${this.usuario.puntaje}`;
        document.body.appendChild(vidasPuntajeDisplay);
    }

    actualizarVidasPuntaje() {
        const vidasPuntajeDisplay = document.querySelector('.score');
        vidasPuntajeDisplay.textContent = `Vidas: ${this.usuario.vidas} - Puntaje: ${this.usuario.puntaje}`;
    }

    adivinarLetra(letra, button) {
        if (this.usuario.vidas > 0 && !this.isJuegoTerminado()) {
            this.usuario.adivinarLetra(letra, this.palabraActual, this.intentos);
            button.style.display = 'none';

            if (this.palabraActual.contieneLetra(letra)) {
                
                this.mostrarPalabra();
                this.actualizarVidasPuntaje();

                if (!this.palabraActual.mostrarPalabraAdivinada(this.usuario.letrasAdivinadas).includes('_')) {
                    this.mostrarMensaje('¡Ganaste! 😃');
                    this.usuario.puntaje += 50;
                    this.actualizarVidasPuntaje();
                    this.palabras.splice(this.palabras.indexOf(this.palabraActual.palabra),1);
                    this.nuevaPalabra();
                }
            } else {
                this.intentos++;
                this.actualizarAhorcado();
                if (this.intentos >= this.maxIntentos) {
                    this.mostrarMensaje('Perdiste. La palabra era: ' + this.palabraActual.palabra);
                    this.usuario.vidas--;
                    this.actualizarVidasPuntaje();
                    if(this.usuario.vidas == 0){
                        this.mostrarMensaje('Perdiste');
                        return;
                    }
                    this.nuevaPalabra();
                }
            }
        }
    }

    isJuegoTerminado() {
        return this.usuario.vidas <= 0 || !this.palabraActual.mostrarPalabraAdivinada(this.usuario.letrasAdivinadas).includes('_');
    }

    mostrarMensaje(mensaje) {
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.textContent = mensaje;
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = '';
    }

    actualizarAhorcado() {
        const hangman = document.getElementById('hangman');
        hangman.style.backgroundImage = `url('img/hangman_${this.intentos}.png')`;
        hangman.style.backgroundSize = `cover`;
    }

    nuevaPalabra() {
        this.palabraActual = this.obtenerPalabraAleatoria();
        this.intentos = 0;
        this.usuario.letrasAdivinadas = [];
        this.mostrarPalabra();
        this.actualizarAhorcado();
        this.crearTeclado();
    }
}

const palabras =  ["gato", "perro", "casa", "arbol", "cielo", "nube", "sol", "jugar", "amigo", "familia", "mesa", "silla", "mano", "pie", "nariz", "ojo", "oreja", "boca", "diente", "flor", "libro", "lapiz", "escuela", "estudiante", "profesor", "computadora", "telefono", "ventana", "puerta", "comida", "bebida", "pizza", "helado", "dulce", "hamburguesa", "juego", "musica", "pelicula", "deporte", "futbol", "tenis", "nadar", "correr", "saltar", "dormir", "soñar", "estudiar", "trabajar", "viajar", "avion", "auto", "bicicleta", "tren", "barco", "espacio", "planeta", "luna", "sol", "montaña", "rio", "mar", "playa", "bosque", "desierto", "ciudad", "pais", "idioma", "arte", "pintura", "escultura", "musica", "bailar", "cantar", "feliz", "triste", "enfadado", "sorpresa", "miedo", "amor", "odio", "risa", "llanto", "rojo", "verde", "azul", "amarillo", "negro", "blanco", "gris", "alto", "bajo", "largo", "corto", "grande", "pequeño", "caliente", "frio", "rapido", "lento", "nuevo", "viejo", "bueno", "malo", "dificil", "facil", "alegre", "triste", "gracioso", "aburrido"];
const juego = new Juego(palabras);
juego.iniciarJuego();
