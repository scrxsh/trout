package com.sisla.backend.trout.modules.authModule.services;

import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.LoginDTO;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.ResponseDTO;

import java.util.HashMap;

public interface IAuthService {

    public HashMap<String, String> login(LoginDTO login) throws Exception;
    public ResponseDTO register(UserEntity user) throws  Exception;
}
