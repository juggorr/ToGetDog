package com.ssafy.togetdog.global.config;

import java.util.Arrays;

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

import com.ssafy.togetdog.user.model.service.UserOAuth2Service;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {
	
	private final UserOAuth2Service userOauth2Service;
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY)
                //.antMatchers("/api/**").hasRole(Role.USER.name())
    			.permitAll()
                .anyRequest().authenticated().and() //나머지 URL은 인증된 사용자에게만 허용(로그인한 사용자만)
                .oauth2Login() // OAuth2 로그인 설정 시작 지점
        		.userInfoEndpoint() //OAuth2 로그인 후 사용자 정보를 가져올 때의 설정 담당
        		.userService(userOauth2Service); //로그인 성공 후 조치를 진행할 UserService 인터페이스 구현체 등록, 로그인 서버에서 정보를 가져오고 나서 추가로 진행하고자 하는 기능 명시 가능
        return http.build();
    }
	
	 private static final String[] PERMIT_URL_ARRAY = {
			 	"/**", //다 허용 일단 나중에 걷어내자~~
	            /* swagger v2 */
	            "/v2/api-docs",
	            "/swagger-resources",
	            "/swagger-resources/**",
	            "/configuration/ui",
	            "/configuration/security",
	            "/swagger-ui.html",
	            "/webjars/**",
	            /* swagger v3 */
	            "/v3/api-docs/**",
	            "/swagger-ui/**"
	    };

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    // CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
