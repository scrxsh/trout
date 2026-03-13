package com.sisla.backend.trout.modules.geoModule;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("api/v1/geolocation")

public class GeoController {
    @Autowired
    private GeoService geoService;

    @GetMapping("/buscar")
    public ResponseEntity<String> buscar(@RequestParam String query){
        try{
            JSONObject ubicacion = geoService.buscar(query);

            if(ubicacion != null){
                return ResponseEntity.ok(ubicacion.toString());
            } else {
                return ResponseEntity.notFound().build();
            }
        }catch (IOException e){
            return ResponseEntity.status(500)
                    .body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/heatmap")
    public ResponseEntity<List<double[]>> obtenerMapaCalor(){

        List<double[]> puntosInfeccion = new ArrayList<>();

        Random random = new Random();

        double latChq = 5.617;
        double lonChq = -73.817;

        for (int i = 0; i < 250; i++) {
            double lat = latChq + (random.nextDouble() - 0.5) * 0.026;
            double lon = lonChq + (random.nextDouble() - 0.5) * 0.026;
            double intensidad = 0.4 + (random.nextDouble() * 0.9);

            puntosInfeccion.add(new double[]{lat, lon, intensidad});
        }

        return ResponseEntity.ok(puntosInfeccion);

    }
}
