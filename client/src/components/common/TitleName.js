import React from "react";

const TitleName = (props) => {
  const categoryTitle = {
    fontSize: "22px",
    fontWeight: 600,
    margin: "0 0 0 1rem",
    textAlign: "center",
  };
  return <div style={categoryTitle}>{props.title}</div>;
};

export default TitleName;
