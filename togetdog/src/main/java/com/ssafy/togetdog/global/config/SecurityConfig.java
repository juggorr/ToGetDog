package com.ssafy.togetdog.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ssafy.togetdog.global.interceptor.OAuth2FailureHandler;
import com.ssafy.togetdog.global.interceptor.OAuth2SuccessHandler;
import com.ssafy.togetdog.user.model.service.UserOAuth2Service;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {
	
	private final UserOAuth2Service userOauth2Service;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	private final OAuth2FailureHandler oAuth2FailureHandler;
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        		.httpBasic().disable() // rest api 이므로 기본설정 사용안함, 기본설정은 비인증시 로그인 폼화면으로 리다이렉트
        		.csrf().disable() // rest api만 가능한 jwt인증 기반의 사이트이므로 csrf는 disable처리 합니다.
        		.cors().configurationSource(corsConfigurationSource())
        		.and()
                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
    			.and()
                .oauth2Login() // OAuth2 로그인 설정 시작 지점
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .and()
                .redirectionEndpoint().baseUri("/oauth2/code/**")
                .and()
        		.userInfoEndpoint() //OAuth2 로그인 후 사용자 정보를 가져올 때의 설정 담당
        		.userService(userOauth2Service)
        		.and()
        		.successHandler(oAuth2SuccessHandler)
                .failureHandler(oAuth2FailureHandler);
        return http.build(); 
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    // CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		configuration.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
	private static final String[] PERMIT_URL_ARRAY = {
		 	"/**", //다 허용 일단 나중에 수정해야 함
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
	};
}
