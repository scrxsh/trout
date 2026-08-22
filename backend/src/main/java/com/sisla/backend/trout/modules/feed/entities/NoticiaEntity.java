package com.sisla.backend.trout.modules.feed.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name="noticias", catalog = "feed")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class NoticiaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 230)
    private String titulo;

    @Column(nullable = false, length = 350)
    private String descripcion;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "url_img", nullable = false)
    private String urlImg;

    @Column(nullable = false)
    private LocalDate fecha;

}
