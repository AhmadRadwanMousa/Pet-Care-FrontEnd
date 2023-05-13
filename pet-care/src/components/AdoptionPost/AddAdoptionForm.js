import React, { useState, useRef, useEffect } from "react";
import "../../componentStyle/AdoptionPost/AddAdoptionForm.css";
import ImagePreview from "../../shaerdComponents/ImagePreview";
import ImageUploder from "../../shaerdComponents/ImageUploder";
import LocationPicker from "../../shaerdComponents/MapPicker";
import LoadingProgress from "../../shaerdComponents/LoadingProgress";
import WarningBar from "../../shaerdComponents/WarningBar";
import api from "../../services/api";

export default function AddAdoptionForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMassage, setWarningMassage] = useState(
    "You must add at least one photo"
  );
  const [addAdoptionFormstate, setAddAdoptionFormstate] = useState({
    animalType: "",
    animalBreed: "",
    animalName: "",
    WhatsappNumber: "",
    facebookLink: "",
    phoneNumber: "",
    description: "",
    images: [],
    location: {
      lan: "",
      lng: "",
    },
  });
  const [recivedImages, setRecivedImages] = useState([]);
  const childRef = useRef();
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  const handleAnimalType = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      animalType: event.target.value,
    });
  };
  const handleAnimalBrees = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      animalBreed: event.target.value,
    });
  };
  const handleAnimalName = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      animalName: event.target.value,
    });
  };
  const handleWhatsapp = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      WhatsappNumber: event.target.value,
    });
  };
  const handleFacebook = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      facebookLink: event.target.value,
    });
  };
  const handlePhoneNumber = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      phoneNumber: event.target.value,
    });
  };
  const handleDescription = (event) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      description: event.target.value,
    });
  };
  const reciveImages = (images) => {
    setRecivedImages(images);
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      images: images,
    });
  };
  const reciveImagesPath = (imagePath) => {};
  const deleteImage = (currentIndex) => {
    childRef.current.deleteImage(currentIndex);
  };
  const reciveLocation = (recivelocation) => {
    setAddAdoptionFormstate({
      ...addAdoptionFormstate,
      location: recivelocation,
    });
    console.log(addAdoptionFormstate.location);
  };
  const addAdoptionHandlerSubmit = async (event) => {
    event.preventDefault();
    if (addAdoptionFormstate.images.length === 0) {
      setWarning(true);
      return;
    }
    console.log(addAdoptionFormstate);
    setIsLoading(true);
    await api.post("/addAdoptionPost", addAdoptionFormstate);
    setIsLoading(false);
    props.CloseBackDrop();
    setAddAdoptionFormstate({
      animalType: "",
      animalBreed: "",
      animalName: "",
      WhatsappNumber: "",
      facebookLink: "",
      phoneNumber: "",
      description: "",
      images: [],
      location: {
        lan: "",
        lng: "",
      },
    });
  };
  return (
    <>
      <form
        className="add-adoption-form-holder"
        onSubmit={addAdoptionHandlerSubmit}
      >
        <div className="add-adoption-form-left-section">
          <div className="add-adoption-animal-information">
            <div className="header-word">Animal Information</div>
            <div className="add-adoption-animal-type-name-breed">
              <input
                placeholder="Animal Type"
                className="add-adoption-input"
                onChange={handleAnimalType}
                value={addAdoptionFormstate.animalType}
                required={true}
              />
              <input
                placeholder="Animal Breed"
                className="add-adoption-input"
                onChange={handleAnimalBrees}
                value={addAdoptionFormstate.animalBreed}
                required={true}
              />
              <input
                placeholder="Animal Name"
                className="add-adoption-input"
                onChange={handleAnimalName}
                value={addAdoptionFormstate.animalName}
                required={true}
              />
            </div>
          </div>
          <div className="add-adoption-description-social-media">
            <div className="add-adoption-description">
              <div className="header-word">Description</div>
              <input
                placeholder="what are you thinking about"
                className="add-adoption-input-description"
                onChange={handleDescription}
                value={addAdoptionFormstate.description}
                required={true}
              />
            </div>
            <div className="add-adoption-social-media">
              <div className="header-word">Social Media</div>
              <input
                placeholder="Whatsapp Number"
                className="add-adoption-input"
                onChange={handleWhatsapp}
                value={addAdoptionFormstate.WhatsappNumber}
                required={true}
              />
              <input
                placeholder="Facebook link (optional)"
                className="add-adoption-input"
                onChange={handleFacebook}
                value={addAdoptionFormstate.facebookLink}
              />
              <input
                placeholder="Phone Number (optional)"
                className="add-adoption-input"
                onChange={handlePhoneNumber}
                value={addAdoptionFormstate.phoneNumber}
              />
            </div>
          </div>
          <div className="add-adoption-upload-location">
            <ImageUploder
              height="11rem"
              width="12.5rem"
              sendImages={reciveImages}
              ref={childRef}
              sendImagesPath={reciveImagesPath}
            />
            <LocationPicker sendLocation={reciveLocation} />
          </div>
        </div>
        <div className="add-adoption-form-right-section">
          <ImagePreview
            handelDeleteImage={deleteImage}
            images={recivedImages}
          />
          <button className="add-adoption-submit-button" type="submit">
            POST
          </button>
        </div>
      </form>
      <LoadingProgress show={isLoading} />
      <WarningBar showWarning={warning} massage={warningMassage} />
    </>
  );
}
