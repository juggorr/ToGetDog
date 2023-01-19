package com.ssafy.togetdog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableAutoConfiguration(exclude={dataSourceScriptDatabaseInitializer.class})
public class TogetdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(TogetdogApplication.class, args);
	}

}
