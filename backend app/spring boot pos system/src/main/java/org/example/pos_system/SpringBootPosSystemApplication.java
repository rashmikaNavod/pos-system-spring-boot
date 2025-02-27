package org.example.pos_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SpringBootPosSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootPosSystemApplication.class, args);
    }

}
