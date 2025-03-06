import React from "react";

const Card = ({ card }) => {
  return (
    <div
      className={`drop-shadow-md flex justify-center ${
        card.flipped ? "[transform:rotateY(10deg)]" : "bg-withe"
      }items-center cursor-pointer h-16 w-16 hover:scale-105 rounded-xl transition-all duration-1000`}
    >
      <div>
        <img src={card.src} alt={card.alt} className={`h-16 scale-110`} />
      </div>
    </div>
  );
};

export default Card;
