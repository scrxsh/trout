package com.sisla.backend.trout.modules.authModule.controllers;

import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;
import com.sisla.backend.trout.modules.authModule.services.IAuthService;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.LoginDTO;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/v1/auth")

public class AuthController {
    @Autowired
    IAuthService authService;

    @PostMapping("/register")
    private ResponseEntity<ResponseDTO> registrarUsuario(@RequestBody UserEntity user) throws Exception {
        return new ResponseEntity<>(authService.register(user), HttpStatus.CREATED);
    }


    @PostMapping("/login")
    private ResponseEntity<HashMap<String, String>> logearUsuario(@RequestBody LoginDTO loginRequest) throws Exception {
        HashMap<String, String> login = authService.login(loginRequest);
        if(login.containsKey("jwt")){
            return new ResponseEntity<>(login, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(login, HttpStatus.UNAUTHORIZED);
        }
    }

}
