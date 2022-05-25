package com.example.BangGuSeok_Chef.repository.Member;

import com.example.BangGuSeok_Chef.dto.Member.FollowRecipeDto;
import com.example.BangGuSeok_Chef.entity.Member.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query(value = "select exists (select * from follow where followed_email = :followedEmail and following_email = :followingEmail)", nativeQuery = true)
    Integer existFollow(String followedEmail, String followingEmail);

    @Query(value = "select * from follow where followed_email = :followedEmail and following_email = :followingEmail", nativeQuery = true)
    Follow findByUsers(String followedEmail, String followingEmail);

    @Query(value = "select follow_check from follow where followed_email = :followedEmail and following_email = :followingEmail", nativeQuery = true)
    Boolean findFollowByUser(String followedEmail, String followingEmail);

    List<Follow> findByFollowingEmailAndFollowCheck(String email, Boolean check);

    @Query(value = "select id,a.title, click, create_date, image, nickname, " +
            "(select count(*) from re_commend where recipe_id = a.id and checked = 1) as recommend, " +
            "(select introduce from recipe_contents where recipe_id = a.id) as content, " +
            "(select profile from member where email = a.author)" +
            "from recipe_board a where author in (:emails) order by id desc", nativeQuery = true)
    List<Object[]> findFollowRecipe(List<String> emails, Pageable pageable);
}
