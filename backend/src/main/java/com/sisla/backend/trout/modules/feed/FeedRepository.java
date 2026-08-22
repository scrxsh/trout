package com.sisla.backend.trout.modules.feed;


import com.sisla.backend.trout.modules.feed.entities.NoticiaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<NoticiaEntity,Long> {
    @Query("SELECT f FROM NoticiaEntity f ORDER BY f.fecha DESC")
    List<NoticiaEntity> findAllByFechaDesc();
}
