package com.sisla.backend.trout.modules.authModule.config;

import com.sisla.backend.trout.modules.authModule.services.models.validation.UserValidation;
import org.springframework.context.annotation.Bean;

public class ValidationConfig {

    @Bean
    public UserValidation userValidation(){
        return new UserValidation();
    }
}
