package com.sisla.backend.trout.modules.alerts;

import com.sisla.backend.trout.modules.alerts.entities.AlertaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${URL_API}alertas")

public class AlertsController {
    @Autowired
    private AlertsService alertsService;

    @GetMapping("/all")
    private ResponseEntity<List<AlertaDTO>> gerAllAlertas(){
        return ResponseEntity.ok(alertsService.obtenerAlertas());
    }

    @GetMapping("/alerta/{id}")
    private ResponseEntity<AlertaDTO> getAlertaPorId(@PathVariable Long id){
        return ResponseEntity.ok(alertsService.obtenerAlertaPorId(id));
    }

    @PostMapping("/crear")
    private ResponseEntity<AlertaDTO> crearAlerta(@RequestBody AlertaDTO alertaDTO){
        return new ResponseEntity<>(alertsService.crearAlerta(alertaDTO), HttpStatus.CREATED);
    }

    @PostMapping("/crear/lista")
    private ResponseEntity<List<AlertaDTO>> crearAlertas(@RequestBody List<AlertaDTO> alertasDTO){
        List<AlertaDTO> alertasCreadas = alertasDTO.stream().map(alertsService::crearAlerta).toList();
        return new ResponseEntity<>(alertasCreadas, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    private  ResponseEntity<AlertaDTO> actualizarAlerta(@PathVariable Long id, @RequestBody AlertaDTO alertaDTO){
       AlertaDTO alertaAct = alertsService.actualizarAlerta(id, alertaDTO);

       if(alertaAct == null){
           return ResponseEntity.notFound().build();
       } else {
           return ResponseEntity.ok(alertaAct);
       }
    }

    @DeleteMapping("/borrar/{id}")
    private  ResponseEntity<AlertaDTO> borrarAlerta(@PathVariable Long id){
        alertsService.borrarAlerta(id);
        return ResponseEntity.noContent().build();
    }
}
