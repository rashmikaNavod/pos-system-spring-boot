package org.example.pos_system.advisor;

import org.example.pos_system.util.ResponseUtil;
import org.example.pos_system.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler{
    @Autowired
    private ResponseUtil responseUtil;

    @ExceptionHandler(Exception.class)
    public ResponseEntity exception(Exception ex){
        responseUtil.setCode(VarList.RSP_ERROR);
        responseUtil.setMsg(ex.getMessage());
        responseUtil.setData(null);
        return new ResponseEntity(responseUtil, HttpStatus.BAD_REQUEST);
    }

}
