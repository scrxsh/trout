package com.sisla.backend.trout.modules.alerts;

import com.sisla.backend.trout.modules.alerts.entities.AlertaDTO;
import com.sisla.backend.trout.modules.alerts.entities.AlertaEntity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;

@Service
public class AlertsService {
    @Autowired
    AlertsRepository alertsRepository;

    public List<AlertaDTO> obtenerAlertas(){
        return alertsRepository.findAllByFechaDesc().stream().map(this::toDTO).toList();
    }

    public AlertaDTO obtenerAlertaPorId(Long id){
        return toDTO(Objects.requireNonNull(alertsRepository.findById(id).orElse(null)));
    }


    public AlertaDTO crearAlerta(AlertaDTO alertaDTO){
        AlertaEntity alerta = AlertaEntity.builder().
                titulo(alertaDTO.getTitulo()).
                descripcion(alertaDTO.getDescripcion()).
                fecha(alertaDTO.getFecha()).
                tipo(alertaDTO.getTipo()).
                estado(alertaDTO.getEstado()).
                isDestacada(alertaDTO.isDestacada()).
                build();
        return toDTO(alertsRepository.save(alerta));
    }

    public AlertaDTO actualizarAlerta(Long id, AlertaDTO alertaDTO){

        AlertaEntity alertaExistente = alertsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Alerta no encontrada con id: " + id));

        alertaExistente.setTitulo(alertaDTO.getTitulo());
        alertaExistente.setDescripcion(alertaDTO.getDescripcion());
        alertaExistente.setFecha(alertaDTO.getFecha());
        alertaExistente.setTipo(alertaDTO.getTipo());
        alertaExistente.setEstado(alertaDTO.getEstado());
        alertaExistente.setDestacada(alertaDTO.isDestacada());

        return toDTO(alertsRepository.save(alertaExistente));
    }

    public void borrarAlerta(Long id){
        alertsRepository.deleteById(id);
    }



    private AlertaDTO toDTO(AlertaEntity alerta){
        return new AlertaDTO(
                alerta.getId(),
                alerta.getTitulo(),
                alerta.getDescripcion(),
                alerta.getFecha(),
                alerta.getTipo(),
                alerta.getEstado(),
                alerta.isDestacada()
        );
    }
}
