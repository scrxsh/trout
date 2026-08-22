package com.sisla.backend.trout.modules.feed.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class NoticiaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String contenido;
    private String urlImg;
    private LocalDate fecha;
}

