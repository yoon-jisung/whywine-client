import React from "react";
import MainWineSearchCard from "../Cards/MainWineSearchCard";

interface State {
  searchWine: object[][];
}
const MainSearchCategory = ({ searchWine }: State) => {
  return (
    <div className="mainSearchCategory">
      <h2 className="mainCategoryName">검색</h2>
      <ul className="mainWineSearchBox">
        {searchWine.map((wineArr: object[]) => {
          return wineArr.map((wine) => {
            return <MainWineSearchCard searchWine={wine} />;
          });
        })}
      </ul>
    </div>
  );
};

export default MainSearchCategory;
