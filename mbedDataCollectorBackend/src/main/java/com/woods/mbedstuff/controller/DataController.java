package com.woods.mbedstuff.controller;

import com.woods.mbedstuff.dto.SensorDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class DataController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @RequestMapping(value = "/api/sensor/data", method = RequestMethod.POST)
    public ResponseEntity<?> getSensorData(@RequestBody SensorDataDto sensorDataDto){
        switch (sensorDataDto.getType()){
            case TEMP ->
                    simpMessagingTemplate.convertAndSend("/topic/temp", sensorDataDto.getValue());
            case HUMIDITY ->
                    simpMessagingTemplate.convertAndSend("/topic/humidity", sensorDataDto.getValue());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
