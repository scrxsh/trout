package com.sisla.backend.trout.modules.authModule.persitence.repositories;

import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    Optional<UserEntity> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM UserEntity u WHERE u.phoneNumber = :phoneNumber")
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);
}
