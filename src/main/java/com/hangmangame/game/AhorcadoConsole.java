package com.hangmangame.game;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class AhorcadoConsole {
    private List<String> palabras;
    private Usuario usuario;
    private int intentos;
    private final int maxIntentos = 6;
    private Palabra palabraActual;
    private Scanner scanner;
    private String[] ahorcado = {
        "  ____ ",
        " |    |",
        " |    O",
        " |   /|\\",
        " |    /\\",
        "_|_"
    };
    

    public AhorcadoConsole(List<String> palabras) {
        this.palabras = palabras;
        usuario = new Usuario();
        intentos = 0;
        palabraActual = obtenerPalabraAleatoria();
        scanner = new Scanner(System.in);
    }

    public Palabra obtenerPalabraAleatoria() {
        Random rand = new Random();
        int indiceAleatorio = rand.nextInt(palabras.size());
        return new Palabra(palabras.get(indiceAleatorio));
    }

    public void iniciarJuego() throws InterruptedException {
        mostrarMensajeBienvenida();

        while (!isJuegoTerminado()) {
            char letra = leerLetra();
            Thread.sleep(1000);
            limpiarConsola();
            mostrarPalabra();
            adivinarLetra(letra);
            mostrarEstadoAhorcado();            
            actualizarVidasPuntaje();
        }

        mostrarResultadoFinal();
        scanner.close();
    }

    private void mostrarMensajeBienvenida() {
        System.out.println("¡Bienvenido al Juego del Ahorcado!");
        mostrarPalabra();
    }

    private void mostrarResultadoFinal() throws InterruptedException {
        if (usuario.getVidas() <= 0) {
            System.out.println("Perdiste :(. La palabra era: " + palabraActual);
            Thread.sleep(2000);
            limpiarConsola();
        } else {
            System.out.println("¡Felicitaciones! Acertaste la palabra: " + palabraActual);
            Thread.sleep(2000);
            limpiarConsola();
        }
        System.out.println("Tu puntaje final es: " + usuario.getPuntaje());
    }

    public void mostrarPalabra() {
        System.out.println("Palabra adivinada: " + palabraActual.mostrarPalabraAdivinada(usuario.getLetrasAdivinadas()));
    }

    public char leerLetra() {
        System.out.print("Ingresa una letra: ");
        String input = scanner.nextLine().toUpperCase();
        return input.charAt(0);
    }

    public void adivinarLetra(char letra) throws InterruptedException {
        if (usuario.getVidas() > 0 && !isJuegoTerminado()) {
            usuario.adivinarLetra(letra, palabraActual, intentos);
            if (palabraActual.contieneLetra(letra)) {
                if (!palabraActual.mostrarPalabraAdivinada(usuario.getLetrasAdivinadas()).contains("_")) {
                    usuario.setPuntaje(usuario.getPuntaje() + 50);
                    palabraActual = obtenerPalabraAleatoria();
                    intentos = 0;
                    usuario.getLetrasAdivinadas().clear();
                    System.out.println("¡Acertaste la palabra! :)");
                }
            } else {
                intentos++;
                if (intentos >= maxIntentos) {
                    usuario.setVidas(usuario.getVidas() - 1);
                    palabraActual = obtenerPalabraAleatoria();
                    intentos = 0;
                    usuario.getLetrasAdivinadas().clear();
                    System.out.println("Perdiste una vida. Vidas restantes: " + usuario.getVidas());
                    Thread.sleep(2000);
                    limpiarConsola();
                }
            }
        }
    }
    

    public void mostrarEstadoAhorcado() {
        System.out.println("Intentos restantes: " + (maxIntentos - intentos));
        for (int i = 0; i < intentos; i++) {
            System.out.println(ahorcado[i]);
        }
    }

    public void actualizarVidasPuntaje() {
        System.out.println("Vidas: " + usuario.getVidas() + " - Puntaje: " + usuario.getPuntaje());
    }

    public boolean isJuegoTerminado() {
        return usuario.getVidas() <= 0 || !palabraActual.mostrarPalabraAdivinada(usuario.getLetrasAdivinadas()).contains("_");
    }

    public static void limpiarConsola() {
        try {
            final String os = System.getProperty("os.name");
            if (os.contains("Windows")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                System.out.print("\033[H\033[2J");
                System.out.flush();
            }
        } catch (final Exception e) {
            System.out.println("Error al limpiar la consola: " + e.getMessage());
        }
    }
}