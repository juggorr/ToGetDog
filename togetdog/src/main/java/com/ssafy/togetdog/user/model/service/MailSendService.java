package com.ssafy.togetdog.user.model.service;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailSendService {
	
	/**
	 * 메일 전송 악용할 경우??
	 * 구글 SMTP는 한 계정당 하루 100건으로 메일 전송을 제한합니다.
	 * sendgrid나 mailgun과 같이 제한이 없는 서비스를 사용하더라도
	 * 사용자가 메일을 짧은 시간 내 여러 번 보낼 수 있게 되면 트래픽 과부하가 발생해 서비스에 지장을 줄 수가 있습니다.
	 * 따라서,
	 * 이를 방지하기 위해 동일한 메일에 대해서는 해당 계정으로 최근 x분 혹은 x시간 내 보낸 적이 없어야 재전송할 수 있도록 설정을 해주는 것이 안전합니다.
	 */
	
	private final String path = "https://togetdog.site/emailAuth?email=";
	//private final String path = "https://i8a807.p.ssafy.io/emailAuth?email=";

    private final JavaMailSender mailSender;
    private final UserService userService;
    private int size;

    /***
     * AuthKey generator
     * @param size
     * @return
     */
    private String getKey(int size) {
        this.size = size;
        return getAuthCode();
    }
    
    /***
     * Random number generator
     * @return
     */
    private String getAuthCode() {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < size) {
            num = random.nextInt(10);
            buffer.append(num);
        }
        return buffer.toString();
    }
    
    /***
     * Random password generator
     * @return
     */
    public String getRamdomPassword() {
    	char[][] charSet = new char[3][];
        charSet[0] = new char[]{
        		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        charSet[1] = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
        charSet[2] = new char[] {'!', '?', '@', '#', '$', '%', '^', '&', '*'};
        
        StringBuffer sb = new StringBuffer();
        int idx = 0;
        for (int i = 0; i < 3; i++) {
        	int charSetIndex = (int) (3 * Math.random());
        	int charSetLength = charSet[charSetIndex].length;
        	
        	int length = 2;
        	if (charSetIndex == 0) {
        		length = 6;
        	} else if (charSetIndex == 1) {
        		length = 4;
        	}
            for (int j = 0; j < length; j++) {
                idx = (int) (charSetLength * Math.random());
                sb.append(charSet[charSetIndex][idx]);
            }
        }
        return sb.toString();
    }
    
    /***
     * Email authentication for user registration
     * @param email
     * @return
     */
    public String registMailSender(String email) throws MessagingException{
        String authKey = getKey(6);
        MimeMessage mail = mailSender.createMimeMessage();
        mail.setSubject("안녕하세요. Togetdog입니다. 회원가입을 위한 이메일 인증을 진행해주세요.");
        mail.setText(
        		new StringBuffer()
        		.append("[Togetdog] 이메일 인증 \n")
        		.append("아래 링크를 클릭하시면 이메일 인증이 완료됩니다. \n")
        		.append(path).append(email).append("&authKey=").append(authKey)
        		.toString());
        mail.setFrom(new InternetAddress("togetdog@gmail.com"));
        mail.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
        mailSender.send(mail);
        return authKey;
    }

    /***
     * Issuance of temporary password
     * @param user
     * @param email
     */
    public void sendTmpPassword(long userId, String email) {
    	String tmpPassword = getRamdomPassword();
    	MimeMessage mail = mailSender.createMimeMessage();
    	
        try {
        	mail.setSubject("안녕하세요. Togetdog입니다. 임시 비밀번호를 발급해드립니다.");
        	mail.setText(
        			new StringBuffer()
        			.append("[Togetdog] 임시 비밀번호 \n")
        			 .append("아래의 임시 비밀번호로 로그인해주세요. \n\n")
                     .append(tmpPassword)
                     .append("\n로그인을 성공하셨다면 꼭 비밀번호를 변경해주시길 바랍니다.\n")
                     .append("만약 Togetdog을 이용하지 않았는데 메시지를 받으셨다면\n")
                     .append("togetdog@gmail.com으로 연락주시길 바랍니다.")
        			.toString());
        	mail.setFrom(new InternetAddress("togetdog@gmail.com"));
        	mail.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
        	mailSender.send(mail);
            userService.updateTmpPassword(userId, tmpPassword);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}