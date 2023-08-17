package com.hangmangame.game;
import java.util.ArrayList;
import java.util.List;

class Usuario {
    private List<Character> letrasAdivinadas;
    private int vidas;
    private int puntaje;

    public Usuario() {
        letrasAdivinadas = new ArrayList<>();
        vidas = 3;
        puntaje = 0;
    }

    public void adivinarLetra(char letra, Palabra palabraActual, int intentos) {
        if (!letrasAdivinadas.contains(letra)) {
            letrasAdivinadas.add(letra);

            if (palabraActual.contieneLetra(letra)) {
                puntaje += 10;
            } else {
                if (intentos == 6) {
                    vidas--;
                }
            }
        }
    }

    public int getVidas() {
        return vidas;
    }
    
    public void setVidas(int nuevasVidas) {
        vidas = nuevasVidas;
    }

    public int getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(int nuevoPuntaje) {
        puntaje = nuevoPuntaje;
    }

    public List<Character> getLetrasAdivinadas() {
        return letrasAdivinadas;
    }
}
