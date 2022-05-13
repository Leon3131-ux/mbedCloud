package com.woods.mbedstuff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class MbedDataCollectorApplication {

    public static void main(String[] args) {
        SpringApplication.run(MbedDataCollectorApplication.class, args);
    }

}
