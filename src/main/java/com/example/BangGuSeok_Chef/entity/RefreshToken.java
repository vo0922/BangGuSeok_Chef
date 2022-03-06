package com.example.BangGuSeok_Chef.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {
<<<<<<< HEAD

=======
>>>>>>> jaemin_0301
    @Id
    private String _key;
    private String value;

<<<<<<< HEAD
    public RefreshToken updateValue(String token) {
=======
    public RefreshToken updateValue(String token){
>>>>>>> jaemin_0301
        this.value = token;
        return this;
    }

    @Builder
<<<<<<< HEAD
    public RefreshToken(String _key, String value) {
        this._key = _key;
        this.value = value;
    }
}
=======
    public RefreshToken(String _key, String value){
        this._key = _key;
        this.value = value;
    }
}
>>>>>>> jaemin_0301
