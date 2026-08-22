package com.sisla.backend.trout.modules.feed;

import com.sisla.backend.trout.modules.feed.entities.NoticiaDTO;
import com.sisla.backend.trout.modules.feed.entities.NoticiaEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service


public class FeedService {
    @Autowired
    private FeedRepository feedRepository;

    public List<NoticiaDTO> obtenerNoticias(){
        return feedRepository.findAllByFechaDesc().stream().map(this::toDTO).toList();
    }

    public NoticiaDTO obtenerNoticiaPorId(Long id){
        return toDTO(Objects.requireNonNull(feedRepository.findById(id).orElse(null)));
    }

    public NoticiaDTO crearNoticia(NoticiaDTO noticiaDTO){
        NoticiaEntity noticia = NoticiaEntity.builder().
                titulo(noticiaDTO.getTitulo()).
                descripcion(noticiaDTO.getDescripcion()).
                contenido(noticiaDTO.getContenido()).
                urlImg(noticiaDTO.getUrlImg()).
                fecha(noticiaDTO.getFecha()).
                build();
        return toDTO(feedRepository.save(noticia));
    }

    public void borrarNoticia(Long id){
        feedRepository.deleteById(id);
    }


    private NoticiaDTO toDTO(NoticiaEntity noticia){
        return new NoticiaDTO(
                noticia.getId(),
                noticia.getTitulo(),
                noticia.getDescripcion(),
                noticia.getContenido(),
                noticia.getUrlImg(),
                noticia.getFecha()
        );
    }

}
