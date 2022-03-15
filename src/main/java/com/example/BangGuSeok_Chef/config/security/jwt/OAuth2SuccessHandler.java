package com.example.BangGuSeok_Chef.config.security.jwt;

import com.example.BangGuSeok_Chef.dto.SessionUser;
import com.example.BangGuSeok_Chef.dto.TokenDto;
import com.example.BangGuSeok_Chef.entity.RefreshToken;
import com.example.BangGuSeok_Chef.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final HttpSession httpSession;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
            throws IOException, ServletException {
        String targetUrl = determineTargetUrl(req, res, auth);
        getRedirectStrategy().sendRedirect(req, res, targetUrl);

    }
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String redirectUrl = "http://localhost:3000/auth/callback";

        SessionUser sessionUser = (SessionUser)httpSession.getAttribute("SocialMemberInfo");
        String email = sessionUser.getEmail();


        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        RefreshToken refreshToken = RefreshToken.builder()
                ._key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        log.info("리프레쉬 토큰" + tokenDto.getRefreshToken() + "에세스 토큰 : " + tokenDto.getAccessToken() + "이메일 : " + sessionUser.getEmail());
        return UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accesstoken",tokenDto.getAccessToken())
                .queryParam("refreshtoken",tokenDto.getRefreshToken())
                .queryParam("email", email)
                .build()
                .toUriString();
    }
}
