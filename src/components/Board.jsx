import { useState } from "react";
import { useEffect } from "react";
import { imgs } from "../data";
import Card from "./Card";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const createBoard = () => {
    const duplicateCards = imgs.flatMap((img, i) => {
      const duplicate = { ...img, id: img.id + imgs.length };
      return [img, duplicate];
    });

    const newCards = shuffleArray(duplicateCards);
    const cards = newCards.map((card) => {
      return {
        ...card,
        flipped: false,
        matched: false,
      };
    });

    setCards(cards);
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl">Memory game</h1>
      <div className="grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
