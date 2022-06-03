package com.example.BangGuSeok_Chef.repository.ChefRank;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ChefRankRepository extends JpaRepository<Member, Long> {

    @Query(value = "select member_id, email, nickname, profile, " +
            "(select count(checked) from re_commend where checked = 1 and author = email) recommend from member order by recommend desc", nativeQuery = true)
    List<Object[]> findRankRecommend(Pageable pageable);

    @Query(value = "select member_id, email, nickname, profile, " +
            "(select sum(click) from recipe_board where author = email) click from member order by click desc", nativeQuery = true)
    List<Object[]> findRankClick(Pageable pageable);

    @Query(value = "select member_id, email, nickname, profile, " +
            "(select count(*) from follow where followed_email = email and follow_check = 1) follow from member order by follow desc", nativeQuery = true)
    List<Object[]> findRankFollow(Pageable pageable);

    @Query(value = "select member_id, email, nickname, profile from member where nickname like %:keyword%", nativeQuery = true)
    List<Object[]> findMember(String keyword);
}
