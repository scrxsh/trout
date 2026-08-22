package com.sisla.backend.trout.modules.feed;


import com.sisla.backend.trout.modules.feed.entities.NoticiaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${URL_API}feed")

public class FeedController {

    @Autowired
    private FeedService feedService;

    @GetMapping("/all")
    private ResponseEntity<List<NoticiaDTO>> getAllFeed(){
        return ResponseEntity.ok(feedService.obtenerNoticias());
    }

    @GetMapping("/noticia/{id}")
    private ResponseEntity<NoticiaDTO> getNoticiaById(@PathVariable Long id){
        return ResponseEntity.ok(feedService.obtenerNoticiaPorId(id));
    }

    @PostMapping("/crear")
    private ResponseEntity<NoticiaDTO> crearNoticia(@RequestBody NoticiaDTO noticiaDTO){
        return new ResponseEntity<>(feedService.crearNoticia(noticiaDTO), HttpStatus.CREATED);
    }

    @PostMapping("/crear/lista")
    private ResponseEntity<List<NoticiaDTO>> crearNoticias(@RequestBody List<NoticiaDTO> noticiasDTO){
        List<NoticiaDTO> noticiasCreadas = noticiasDTO.stream().map(feedService::crearNoticia).toList();
        return new ResponseEntity<>(noticiasCreadas, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<NoticiaDTO> eliminarNoticia(@PathVariable Long id){
        feedService.borrarNoticia(id);
        return ResponseEntity.noContent().build();
    }
}
