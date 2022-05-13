package com.woods.mbedstuff.controller;

import com.woods.mbedstuff.dto.DisplayTextDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class DataController {

    private final JmsTemplate jmsTemplate;

    @RequestMapping(value = "/api/display", method = RequestMethod.POST)
    public ResponseEntity<?> getSensorData(@RequestBody DisplayTextDto dto){
        jmsTemplate.convertAndSend("iotkit.display", dto.getDisplayText());
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
