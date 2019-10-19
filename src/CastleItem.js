import React from "react";
import "./CastleItem.css"


const CastleItem = ({name, image, text, onDelete, updateCastle}) => (
  <li className="castleCard">
      <div className="castleCardImg">
        <img src={image} />
      </div>
      <div className="castleCardContent">
        <h4 className="castleTitle">{name}</h4>
        <p>{text}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
  </li>
);
export default CastleItem;
