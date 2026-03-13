package com.sisla.backend.trout.modules.authModule.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.sisla.backend.trout.modules.authModule.services.IJWTUtilityService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;
import java.util.Collections;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    IJWTUtilityService jwtUtiliyService;

    public JWTAuthorizationFilter(IJWTUtilityService jwtUtiliyService){
        this.jwtUtiliyService = jwtUtiliyService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if(header == null || !header.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            JWTClaimsSet claims = jwtUtiliyService.parseJWT(token);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (NoSuchAlgorithmException | JOSEException | ParseException | InvalidKeySpecException e){
            throw new RuntimeException(e);
        }

        filterChain.doFilter(request, response);

    }
}
