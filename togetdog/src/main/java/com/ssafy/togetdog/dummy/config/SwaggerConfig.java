package com.ssafy.togetdog.dummy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	// Swagger - API 기본 설정
	private String version = "0.1";
	private String title = "공통PJT Dummy API Documentation";
	private String description = "SSAFY 공통 PJT Dummy API";

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(title).description(description).version(version).build();
	}

	public Docket getDocket(String groupName, boolean defaultResponseMessage,
			// Predicate<String> predicate,
			String basePackage) {
		return new Docket(DocumentationType.OAS_30).groupName(groupName)
				.useDefaultResponseMessages(defaultResponseMessage) // Swagger 에서 제공해주는 기본 응답 코드 표시 여부
				.apiInfo(apiInfo()) // apiInfo정보
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.togetdog.dummy." + basePackage + ".controller"))
				.paths(PathSelectors.any()) // 아무 경로나 가능
				.build();
	}

	@Bean
	public Docket userApi() {
		return getDocket("USER", true, "user");
	}

	@Bean
	public Docket dogApi() {
		return getDocket("DOG", true, "dog");
	}

	@Bean
	public Docket feedApi() {
		return getDocket("FEED", true, "feed");
	}

	@Bean
	public Docket appointmentApi() {
		return getDocket("APPOINTMENT", true, "Appointment");
	}

	@Bean
	public Docket facilityApi() {
		return getDocket("FACILITY", true, "facility");
	}

	@Bean
	public Docket notifyApi() {
		return getDocket("NOTIFY", true, "notify");
	}

	@Bean
	public Docket chatApi() {
		return getDocket("CHAT", true, "chat");
	}

	@Bean
	public Docket searchApi() {
		return getDocket("SEARCH", true, "search");
	}
}
