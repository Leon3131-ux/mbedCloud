package com.woods.mbedstuff.controller;

import com.woods.mbedstuff.dto.SensorDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class DataController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @RequestMapping(value = "/api/sensor/data", method = RequestMethod.POST)
    public ResponseEntity<?> getSensorData(@RequestBody List<SensorDataDto> sensorDataDtos){
        for(SensorDataDto dto : sensorDataDtos){
            switch (dto.getType()){
                case TEMP:
                    simpMessagingTemplate.convertAndSend("/topic/temp", dto.getValue());
                    break;
                case HUM:
                    simpMessagingTemplate.convertAndSend("/topic/humidity", dto.getValue());
                    break;
                case BEATC:
                    simpMessagingTemplate.convertAndSend("/topic/gyro", dto.getValue());
                    break;
                case BTNC:
                    simpMessagingTemplate.convertAndSend("/topic/btnc", dto.getValue());
                    break;
                case RFID:
                    simpMessagingTemplate.convertAndSend("/topic/rfid", dto.getValue());
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
