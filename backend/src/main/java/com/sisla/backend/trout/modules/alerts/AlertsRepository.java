package com.sisla.backend.trout.modules.alerts;

import com.sisla.backend.trout.modules.alerts.entities.AlertaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertsRepository extends JpaRepository<AlertaEntity,Long> {
    @Query("SELECT f FROM AlertaEntity f ORDER BY f.fecha DESC")
    List<AlertaEntity> findAllByFechaDesc();
}
