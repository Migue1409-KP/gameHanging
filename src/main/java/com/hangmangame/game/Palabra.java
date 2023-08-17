package com.hangmangame.game;
import java.util.List;

class Palabra {
    private String palabra;

    public Palabra(String palabra) {
        this.palabra = palabra.toUpperCase();
    }

    public String mostrarPalabraAdivinada(List<Character> letrasAdivinadas) {
        StringBuilder display = new StringBuilder();
        for (char letra : palabra.toCharArray()) {
            if (letrasAdivinadas.contains(letra)) {
                display.append(letra).append(' ');
            } else {
                display.append("_ ");
            }
        }
        return display.toString().trim();
    }

    public boolean contieneLetra(char letra) {
        return palabra.indexOf(letra) != -1;
    }
}
