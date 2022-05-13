package com.woods.mbedstuff.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Message;

@Component
@RequiredArgsConstructor
public class JmsController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @JmsListener(destination = "iotkit.temp")
    public void readTempData(BytesMessage message) throws JMSException {
        String temp = convertMessageToString(message);
        simpMessagingTemplate.convertAndSend("/topic/temp", temp);
    }

    @JmsListener(destination = "iotkit.humidity")
    public void readHumidityData(BytesMessage message) throws JMSException {
        String humidity = convertMessageToString(message);
        simpMessagingTemplate.convertAndSend("/topic/humidity", humidity);
    }


    @JmsListener(destination = "iotkit.button")
    public void readButtonClicks(BytesMessage message) throws JMSException {
        String buttonClicks = convertMessageToString(message);
        simpMessagingTemplate.convertAndSend("/topic/button", buttonClicks);
    }


    @JmsListener(destination = "iotkit.gyro")
    public void readGyroTaps(BytesMessage message) throws JMSException {
        String gyroTaps = convertMessageToString(message);
        simpMessagingTemplate.convertAndSend("/topic/gyro", gyroTaps);
    }

    private String convertMessageToString(Message message) throws JMSException {
        BytesMessage byteMessage = (BytesMessage) message;
        byte[] byteData;
        byteData = new byte[(int) byteMessage.getBodyLength()];
        byteMessage.readBytes(byteData);
        byteMessage.reset();
        return new String(byteData);
    }

}
