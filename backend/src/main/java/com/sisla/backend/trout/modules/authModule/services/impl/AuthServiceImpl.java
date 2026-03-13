package com.sisla.backend.trout.modules.authModule.services.impl;

import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;
import com.sisla.backend.trout.modules.authModule.persitence.repositories.UserRepository;
import com.sisla.backend.trout.modules.authModule.services.IAuthService;
import com.sisla.backend.trout.modules.authModule.services.IJWTUtilityService;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.LoginDTO;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.ResponseDTO;
import com.sisla.backend.trout.modules.authModule.services.models.validation.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements IAuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IJWTUtilityService jwtUtiliyService;
    @Autowired
    private UserValidation userValidation;
    @Autowired
    private TwilioOTPService twilioOTPService;

    @Override
    public HashMap<String, String> login(LoginDTO login) throws Exception {
        try {
            HashMap<String, String> jwt = new HashMap<>();
            Optional<UserEntity> user = userRepository.findByEmail(login.getEmail());
            
                if (user.isEmpty()){
                    jwt.put("error", "Usuario no registrado!!!!");
                    return jwt;
                }

            if(verifiyPassword(login.getPassword(), user.get().getPassword())){
                jwt.put("jwt", jwtUtiliyService.generateJWT(user.get().getId()));
            } else {
                jwt.put("error", "Authentication fallida");
            }
            return jwt;
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @Override
    public ResponseDTO register(UserEntity user) throws Exception {
        try {
            ResponseDTO response =  userValidation.validate(user);

            if (response.getNumOfErrors()>0){
                return response;
            }

            List<UserEntity> getAllUsers = userRepository.findAll();
            for (UserEntity existingUser : getAllUsers) {
                if (existingUser.getEmail().equals(user.getEmail())) {
                    response.setNumOfErrors(1);
                    response.setMsj("El correo ya existe!!!");
                    return response;
                }
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);

            /*
            String status = twilioOTPService.enviarOTP(user.getPhoneNumber());
            System.out.println("OTP enviado con estado: " + status);

            response.setMsj("OTP enviado a su teléfono. Esperando verificación!!!");*/

            response.setMsj("Exitoso!!!");

            return response;

        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    /*public ResponseDTO verificarOTP(String phoneNumber, String codigo) {
        ResponseDTO response = new ResponseDTO();

        String status = twilioOTPService.verifiyOTP(phoneNumber, codigo);

        if ("approved".equals(status)) {
            Optional<UserEntity> user = userRepository.findByPhoneNumber(phoneNumber);
            if (user.isPresent()) {
                user.get().setVerified(true);
                userRepository.save(user.get());
                response.setMsj("Verificación completada exitosamente");
            } else {
                response.setNumOfErrors(1);
                response.setMsj("Usuario no encontrado");
            }
        } else {
            response.setNumOfErrors(1);
            response.setMsj("Código OTP incorrecto o expirado");
        }

        return response;
    }*/

    private boolean verifiyPassword(String enteredPassword, String storedPassword){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(enteredPassword, storedPassword);
    }
}
