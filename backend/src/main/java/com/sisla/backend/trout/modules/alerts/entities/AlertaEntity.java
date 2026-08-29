package com.sisla.backend.trout.modules.alerts.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name="alertas", catalog = "eventos")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class AlertaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 230, unique = true)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false, length = 50)
    private String tipo;

    @Column(nullable = false, length = 50)
    private String estado;

    @Column(name="is_destacada", nullable = false)
    private boolean destacada;

}
