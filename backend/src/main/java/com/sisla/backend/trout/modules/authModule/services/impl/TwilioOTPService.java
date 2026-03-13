package com.sisla.backend.trout.modules.authModule.services.impl;


import org.springframework.stereotype.Service;

@Service
public class TwilioOTPService {

    /*
    import com.twilio.Twilio;
    import com.twilio.rest.verify.v2.service.Verification;
    import com.twilio.rest.verify.v2.service.VerificationCheck;

    //INHABILITACION TEMPORAL DE ESTE MODULO

    private static final String SERVICE_SID = "VAc2e9789a5452fee289644e577f07099b";

    public String enviarOTP(String phoneNumber){

        Twilio.init(System.getenv("TWILIO_ACCOUNT_SID"), System.getenv("TWILIO_AUTH_TOKEN"));

        Verification verification = Verification.creator(
                        SERVICE_SID, //SID
                        phoneNumber,
                        "sms")
                .create();
        return verification.getStatus();

    }

    public String verifiyOTP(String phoneNumber, String codigo){
        Twilio.init(System.getenv("TWILIO_ACCOUNT_SID"), System.getenv("TWILIO_AUTH_TOKEN"));

        VerificationCheck verificationCheck = VerificationCheck.creator(
                        SERVICE_SID)
                        .setTo(phoneNumber)
                        .setCode(codigo)
                        .create();

        return verificationCheck.getStatus();
    }
    */
}
