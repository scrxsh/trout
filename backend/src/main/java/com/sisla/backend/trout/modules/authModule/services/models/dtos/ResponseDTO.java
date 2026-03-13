package com.sisla.backend.trout.modules.authModule.services.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private int numOfErrors;
    private String msj;
}
