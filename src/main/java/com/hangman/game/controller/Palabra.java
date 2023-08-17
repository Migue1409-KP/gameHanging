package com.hangman.game.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Palabra {
    
    public List<String> Palabras = new ArrayList<String>();

    @GetMapping("/api/palabra/nuevapalabra")
    @ResponseBody
    public Map<String, String> obtenerNuevaPalabra() {
        if (Palabras.isEmpty()) {
            cargarPalabra();
        }
        Random random = new Random();
        int ramdomIndex = random.nextInt(Palabras.size());
        String palabra = Palabras.get(ramdomIndex);
        
        Map<String, String> response = new HashMap<>();
        response.put("palabra", palabra);

        return response;
    }
    
    private void cargarPalabra() {
        Palabras.add("gato");
        Palabras.add("perro");
        Palabras.add("casa");
        Palabras.add("arbol");
        Palabras.add("cielo");
        Palabras.add("nube");
        Palabras.add("sol");
        Palabras.add("jugar");
        Palabras.add("amigo");
        Palabras.add("familia");
        Palabras.add("mesa");
        Palabras.add("silla");
        Palabras.add("mano");
        Palabras.add("pie");
        Palabras.add("nariz");
        Palabras.add("ojo");
        Palabras.add("oreja");
        Palabras.add("boca");
        Palabras.add("diente");
        Palabras.add("flor");
        Palabras.add("libro");
        Palabras.add("lapiz");
        Palabras.add("escuela");
        Palabras.add("estudiante");
        Palabras.add("profesor");
        Palabras.add("computadora");
        Palabras.add("telefono");
        Palabras.add("ventana");
        Palabras.add("puerta");
        Palabras.add("comida");
        Palabras.add("bebida");
        Palabras.add("pizza");
        Palabras.add("helado");
        Palabras.add("dulce");
        Palabras.add("hamburguesa");
        Palabras.add("juego");
        Palabras.add("musica");
        Palabras.add("pelicula");
        Palabras.add("deporte");
        Palabras.add("futbol");
        Palabras.add("tenis");
        Palabras.add("nadar");
        Palabras.add("correr");
        Palabras.add("saltar");
        Palabras.add("dormir");
        Palabras.add("soñar");
        Palabras.add("estudiar");
        Palabras.add("trabajar");
        Palabras.add("viajar");
        Palabras.add("avion");
        Palabras.add("auto");
        Palabras.add("bicicleta");
        Palabras.add("tren");
        Palabras.add("barco");
        Palabras.add("espacio");
        Palabras.add("planeta");
        Palabras.add("luna");
        Palabras.add("sol");
        Palabras.add("montaña");
        Palabras.add("rio");
        Palabras.add("mar");
        Palabras.add("playa");
        Palabras.add("bosque");
        Palabras.add("desierto");
        Palabras.add("ciudad");
        Palabras.add("pais");
        Palabras.add("idioma");
        Palabras.add("arte");
        Palabras.add("pintura");
        Palabras.add("escultura");
        Palabras.add("musica");
        Palabras.add("bailar");
        Palabras.add("cantar");
        Palabras.add("feliz");
        Palabras.add("triste");
        Palabras.add("enfadado");
        Palabras.add("sorpresa");
        Palabras.add("miedo");
        Palabras.add("amor");
        Palabras.add("odio");
        Palabras.add("risa");
        Palabras.add("llanto");
        Palabras.add("rojo");
        Palabras.add("verde");
        Palabras.add("azul");
        Palabras.add("amarillo");
        Palabras.add("negro");
        Palabras.add("blanco");
        Palabras.add("gris");
        Palabras.add("alto");
        Palabras.add("bajo");
        Palabras.add("largo");
        Palabras.add("corto");
        Palabras.add("grande");
        Palabras.add("pequeño");
        Palabras.add("caliente");
        Palabras.add("frio");
        Palabras.add("rapido");
        Palabras.add("lento");
        Palabras.add("nuevo");
        Palabras.add("viejo");
        Palabras.add("bueno");
        Palabras.add("malo");
        Palabras.add("dificil");
        Palabras.add("facil");
        Palabras.add("alegre");
        Palabras.add("triste");
        Palabras.add("gracioso");
        Palabras.add("aburrido");
    }
    
}
