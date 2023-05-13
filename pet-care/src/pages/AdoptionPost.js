import React, { useState } from "react";
import ContentHolder from "../UI/ContentHolder";
import MainBackGround from "../UI/MainBackGround";
import AdoptionHolder from "../components/AdoptionPost/AdoptionHolder";
import FilterForm from "../components/AdoptionPost/FilterForm";

import Header from "../shaerdComponents/Header";
import CreatePostButton from "../components/NormalPost/CreatePostButton";
import AddAdoptionBackDrop from "../components/AdoptionPost/AddAdoptionBackDrop";

export default function AdoptionPost(props) {
  const [showAdoptionPost, setShowAdoptionPost] = useState(false);
  const [filterData, setFilterData] = useState({});
  const handleOpenBackDrop = () => {
    setShowAdoptionPost(true);
  };
  const handleCloseBackDrop = () => {
    setShowAdoptionPost(false);
  };
  const CloseBackDrop = () => {
    setShowAdoptionPost(false);
  };
  const handleReciveFilterPost = (filterData) => {
    setFilterData(filterData);
  };
  return (
    <MainBackGround>
      <ContentHolder>
        <FilterForm sendFilterAdoption={handleReciveFilterPost} />
        <AdoptionHolder filterData={filterData} />
        <CreatePostButton
          buttonClick={handleOpenBackDrop}
          buttonContent="Add offer"
        />
        <AddAdoptionBackDrop
          show={showAdoptionPost}
          CloseBackDrop={handleCloseBackDrop}
          CloseBackDropAfterAdd={CloseBackDrop}
        />
      </ContentHolder>
    </MainBackGround>
  );
}
