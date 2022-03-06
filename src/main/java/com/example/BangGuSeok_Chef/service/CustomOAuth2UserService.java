package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.OAuthAttributes;
import com.example.BangGuSeok_Chef.dto.SessionUser;
import com.example.BangGuSeok_Chef.entity.SocialMember;
import com.example.BangGuSeok_Chef.repository.SocialMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final SocialMemberRepository socialMemberRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        SocialMember socialMember = saveOrUpdate(attributes);
        httpSession.setAttribute("googleMember", new SessionUser(socialMember));

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(socialMember.getAuthorityKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }


    private SocialMember saveOrUpdate(OAuthAttributes attributes) {
        SocialMember socialMember = socialMemberRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
                .orElse(attributes.toEntity());

        return socialMemberRepository.save(socialMember);
    }
}
