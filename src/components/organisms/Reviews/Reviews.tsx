import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ReviewLikeBtn from "../../atoms/Buttons/ReviewLikeBtn";
import ReplyBtn from "../../atoms/Buttons/ReplyBtn";
import axios from "axios";

require("dotenv").config();

const server = process.env.REACT_APP_API_SERVER;

interface UserInfoPrpos {
  bad: [];
  email: string;
  good: [];
  id: number;
  image: string;
  likes: number;
  nickname: string;
  tags: [];
  wines: [];
}
interface ReviewsProps {
  commentText: string;
  commentRating: number;
  key: number;
  commentId: number;
  bad_count: number;
  good_count: number;
  createdAt?: string;
  user: {
    id: number;
    image: string;
    nickname: string;
  };
  handleComments: () => void;
  setCommentUpdate: Dispatch<SetStateAction<boolean>>;
}

function Reviews({
  commentText,
  commentRating,
  commentId,
  bad_count,
  good_count,
  createdAt,
  user,
  handleComments,
  setCommentUpdate,
}: ReviewsProps) {
  const [deleteReview, setDeleteReview] = useState(false);
  const [isGuset, setIsGuest] = useState(false);

  let login: any = sessionStorage.getItem("login");
  let userInfo: any = sessionStorage.getItem("userInfo");

  if (!JSON.parse(login)) {
    // * 로그인 상태가 아니면 게스트
    setIsGuest(true);
  }
  if (user.id !== JSON.parse(userInfo).id) {
    // * 유저아이디와 댓글을 작성한 유저아이다가 다르면 각 리뷰에선 게스트 취급
    setIsGuest(true);
  }

  // * 댓글 삭제 함수
  const handleDeleteRewiew = async () => {
    setDeleteReview(true);
    await axios
      .delete(`${server}comment`, {
        data: { commentId: commentId },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((data) => handleComments())
      // * 댓글 삭제 후 handleComments 함수 실행으로 commentsList 상태 변경해 재랜딩
      .catch((err) => {});
  };

  return (
    <li className="reviews" style={{ opacity: deleteReview ? "0" : "1" }}>
      <div className="reviewContent">
        <div>
          <div className="reviewWriter">작성자: {user.nickname}</div>
          <div className="review_date">{createdAt?.slice(0, 10)}</div>
        </div>

        <div className="reviewContent_btn">
          <div
            onClick={() => setCommentUpdate(true)}
            // * 게스트 이면 수정하기 버튼 노출 안됨
            style={{ opacity: isGuset ? "0" : "1" }}
          >
            수정하기
          </div>
          <div onClick={() => handleDeleteRewiew()}>삭제하기</div>
        </div>
      </div>
      <div className="wineReview">{commentText}</div>

      <div className="reviewBtns">
        <div className="review_star">별점: {commentRating}</div>
        <ReviewLikeBtn like={true} />
        <ReviewLikeBtn like={false} />
        <ReplyBtn />
      </div>
    </li>
  );
}

export default Reviews;
