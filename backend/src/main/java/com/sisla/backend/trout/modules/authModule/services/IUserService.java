package com.sisla.backend.trout.modules.authModule.services;

import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;

import java.util.List;

public interface IUserService {

    public List<UserEntity> findAllUsers();

}
