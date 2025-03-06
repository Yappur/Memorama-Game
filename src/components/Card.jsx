import React from "react";

const Card = ({ card, handleCardClick }) => {
  return (
    <div
      className={`drop-shadow-md flex justify-center items-center cursor-pointer h-16 w-16 hover:scale-105 rounded-xl transition-all duration-1000 ${
        card.flipped ? "[transform:rotateY(10deg)]" : "bg-white"
      }`}
      onClick={() => handleCardClick(card.id)}
    >
      <div>
        <img
          src={card.src}
          alt={card.alt}
          className={`h-16 scale-110 transition-all duration-1000 ${
            !card.flipped
              ? "[backface-visibility:hidden] [transform:rotateY(180deg)]"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Card;
