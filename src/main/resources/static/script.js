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
    constructor() {
        this.usuario = new Usuario();
        this.intentos = 0;
        this.maxIntentos = 6;
        this.palabraActual = null;
        this.mostrarVidasPuntaje();
        this.mensaje = document.getElementById('message');
        this.mensaje.style.display = 'none';
    }

    obtenerPalabraAleatoriaInicio() {
        fetch('/api/palabra/nuevapalabra')
        .then(response => response.json())
        .then(data => {
            console.log(data.palabra);
            this.palabraActual = new Palabra(data.palabra);
            this.comenzarJuego();
        })
        .catch(error => console.error('Error al obtener una nueva palabra:', error));
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
                    this.mostrarMensaje('Acertaste la palabra! 😃');
                    this.usuario.puntaje += 50;
                    this.actualizarVidasPuntaje();
                    this.nuevaPalabra();
                }
            } else {
                this.intentos++;
                this.actualizarAhorcado();
                if (this.intentos >= this.maxIntentos) {
                    this.mostrarMensaje('Perdiste 😔. La palabra era: ' + this.palabraActual.palabra);
                    this.usuario.vidas--;
                    this.actualizarVidasPuntaje();
                    if(this.usuario.vidas == 0){
                        this.mostrarMensaje('Game Over 🎮❌, te has quedado sin vidas');
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
        this.mensaje.textContent = mensaje;
        this.mensaje.style.display = 'block';
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = '';
        setTimeout(() => {
            this.mensaje.style.display = 'none';
        }, 2000);
    }

    actualizarAhorcado() {
        const hangman = document.getElementById('hangman');
        hangman.style.backgroundImage = `url('images/hangman_${this.intentos}.png')`;
        hangman.style.backgroundSize = `cover`;
    }

    nuevaPalabra() {
        fetch('/api/palabra/nuevapalabra')
        .then(response => response.json())
        .then(data => {
            console.log(data.palabra);
            this.palabraActual = new Palabra(data.palabra);
            this.intentos = 0;
            this.usuario.letrasAdivinadas = [];
            this.mostrarPalabra();
            this.actualizarAhorcado();
            this.crearTeclado();
        })
        .catch(error => console.error('Error al obtener una nueva palabra:', error));
    }

    comenzarJuego() {
        this.iniciarJuego();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego();
    juego.obtenerPalabraAleatoriaInicio();
});

