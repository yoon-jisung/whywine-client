import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
let tags: any;
if (!localStorage.getItem("userTag")) {
  localStorage.setItem("userTag", JSON.stringify([]));
  tags = localStorage.getItem("userTag");
}
tags = localStorage.getItem("userTag");
const MainAcidityTag = () => {
  const [high, setHigh] = useState(false);
  const [mid, setMid] = useState(false);
  const [low, setLow] = useState(false);
  const [userMainTag, setUserMainTag] = useState<string[]>(JSON.parse(tags));

  const handleAcidityTagClick = (e: any) => {
    switch (e.target.textContent) {
      case "낮은":
        setLow(!low);
        if (userMainTag.length === 0) {
          setUserMainTag([...userMainTag, "acidity_soft"]);
        }
        for (let i = 0; i < userMainTag.length; i++) {
          if (userMainTag[i] !== "acidity_soft") {
            setUserMainTag([...userMainTag, "acidity_soft"]);
          } else if (userMainTag[i] === "acidity_soft") {
            setUserMainTag(
              userMainTag.filter((tag: string) => tag !== "acidity_soft")
            );
          }
        }
        break;
      case "적당한":
        setMid(!mid);
        if (userMainTag.length === 0) {
          setUserMainTag([...userMainTag, "acidity_medium"]);
        }
        for (let i = 0; i < userMainTag.length; i++) {
          if (userMainTag[i] !== "acidity_medium") {
            setUserMainTag([...userMainTag, "acidity_medium"]);
          } else if (userMainTag[i] === "acidity_medium") {
            setUserMainTag(
              userMainTag.filter((tag: string) => tag !== "acidity_medium")
            );
          }
        }
        break;
      case "높은":
        setHigh(!high);
        if (userMainTag.length === 0) {
          setUserMainTag([...userMainTag, "acidity_acidic"]);
        }
        for (let i = 0; i < userMainTag.length; i++) {
          if (userMainTag[i] !== "acidity_acidic") {
            setUserMainTag([...userMainTag, "acidity_acidic"]);
          } else if (userMainTag[i] === "acidity_acidic") {
            setUserMainTag(
              userMainTag.filter((tag: string) => tag !== "acidity_acidic")
            );
          }
        }
        break;

      default:
        break;
    }
  };
  //* 태그 최신화
  useEffect(() => {
    postTags();
  }, [userMainTag]);
  //* 서버에 태그 요청
  const postTags = useCallback(() => {
    console.log(userMainTag);
    if (userMainTag.length !== 0) {
      axios
        .post(
          "https://localhost:4000/main/tags",
          { tags: userMainTag.filter((el: string) => el !== "") },
          // * (el: string) => el !== "") 빈문자열 제외하는 부분
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((data) => console.log(data));
    }
  }, [userMainTag]);
  //* 설문에서 받아온 기본 태그를 메인에 띄워줌
  useEffect(() => {
    switch (userMainTag[0]) {
      case "acidity_soft":
        handleAcidityTagClick("낮은");
        break;
      case "acidity_medium":
        handleAcidityTagClick("적당한");
        break;
      case "acidity_acidic":
        handleAcidityTagClick("높은");
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className="mainWineAcidityBox">
      <span className="toolTip">
        산미.
        <span className="toolTipText">
          와인에서 말하는 바디란 와인을 마실 때 입안에서 느껴지는 무게감을
          뜻합니다.
        </span>
      </span>
      <div className="mainWineTags">
        <div
          className={low ? `mainWineTypeTag active` : `mainWineTypeTag`}
          onClick={handleAcidityTagClick}
        >
          낮은
        </div>
        <div
          className={mid ? `mainWineTypeTag active` : `mainWineTypeTag`}
          onClick={handleAcidityTagClick}
        >
          적당한
        </div>
        <div
          className={high ? `mainWineTypeTag active` : `mainWineTypeTag`}
          onClick={handleAcidityTagClick}
        >
          높은
        </div>
      </div>
    </div>
  );
};

export default MainAcidityTag;
