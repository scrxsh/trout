package com.sisla.backend.trout.modules.alerts.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AlertaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDate fecha;
    private String tipo;
    private String estado;
    private boolean destacada;
}
