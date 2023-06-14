import React from "react";
import "../shaerdComponentStyle/CloseBackDropButton.css";
export default function CloseBackDropButton(props) {
  const Style = props.someStyle;
  return (
    <button
      type="button"
      className="back-Drop-close"
      style={Style}
      onClick={props.handelClose}
    ></button>
  );
}
