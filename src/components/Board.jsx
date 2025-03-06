import { useState } from "react";
import { useEffect } from "react";
import { imgs } from "../data";
import Card from "./Card";
import Modal from "./Modal";

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

  const handleCardClick = (id) => {
    if (isDisabled) return;

    const [currentCard] = cards.filter((card) => card.id === id);
    if (!currentCard.flipped && !currentCard.matched) {
      currentCard.flipped = true;

      const newFlippedCards = [...flippedCards, currentCard];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setIsDisabled(true);
        const [firstCard, secondCard] = newFlippedCards;
        if (firstCard.src === secondCard.src) {
          firstCard.matched = true;
          secondCard.matched = true;
          setIsDisabled(false);
        } else {
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            setCards(cards);
            setIsDisabled(false);
          }, 1000);
        }

        setFlippedCards([]);
        setMoves(moves + 1);
      }

      setCards(cards);
    }
    if (cards.every((card) => card.matched)) {
      setGameOver(true);
      setIsDisabled(true);
    }
  };

  const handleNewGame = () => {
    setCards([]);
    createBoard();
    setMoves(0);
    setGameOver(false);
    setIsDisabled(false);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center py-20">
        <h1 className="font-bold text-4xl text-black ">Memory Game ⚡</h1>
        <div className="grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
          {cards.map((card) => (
            <Card card={card} key={card.id} handleCardClick={handleCardClick} />
          ))}
        </div>
        <div className="flex justify-between gap-3 py-3">
          <p className="text-black text-2xl">Movimientos:</p>
          <p className="text-black text-2xl">{moves}</p>
        </div>
        <button
          className="bg-black font-semibold text-white rounded-3xl px-5 py-3 hover:bg-yellow-500 hover:text-black transition-all"
          onClick={handleNewGame}
        >
          Nuevo Juego
        </button>

        <Modal
          gameOver={gameOver}
          setGameOver={setGameOver}
          moves={moves}
          handleNewGame={handleNewGame}
        />
      </div>
    </>
  );
};

export default Board;
