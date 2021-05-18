import React from "react";
import RedWine from "../../atoms/Tags/surTypeTag";
import WhiteWine from "../../atoms/Tags/surTypeTag";
import RoseWine from "../../atoms/Tags/surTypeTag";
import SparklingWine from "../../atoms/Tags/surTypeTag";

export default function surTypeTags() {
  return (
    <div>
      <div className="surTypeTags">
        <RedWine wineType="#씁쓸한" />
        <WhiteWine wineType="#달달한" />
        <RoseWine wineType="#로제" />
        <SparklingWine wineType="#스파클링" />
      </div>
    </div>
  );
}
