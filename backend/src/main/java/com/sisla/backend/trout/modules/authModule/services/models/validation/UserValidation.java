package com.sisla.backend.trout.modules.authModule.services.models.validation;


import com.sisla.backend.trout.modules.authModule.persitence.entities.UserEntity;
import com.sisla.backend.trout.modules.authModule.services.models.dtos.ResponseDTO;
import org.springframework.stereotype.Service;


@Service
public class UserValidation {
    public ResponseDTO validate(UserEntity user){
        ResponseDTO response = new ResponseDTO();
        response.setNumOfErrors(0);

        if(user.getNombre() == null || user.getNombre().length() < 3 || user.getNombre().length() > 25){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMsj("El campo del nombre no puede ser nulo y debe estar entre 10 y 25 caracteres");
        }

        if(user.getApellido() == null || user.getApellido().length() < 3 || user.getApellido().length() > 30){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMsj("El campo apellido no puede ser nulo y debe estar entre 10 y 30 caracteres");
        }

        if(user.getEmail() ==  null || !user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMsj("El campo email no es valido");
        }

        if(user.getPassword() == null || !user.getPassword().matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}")){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMsj("La contraseña debe tener entre 8 y 16 caracteres, con al menos una minúscula, una mayúscula y un número.");
        }

        return response;
    }
}
