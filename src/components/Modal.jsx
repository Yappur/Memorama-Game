import React from "react";
import { FaHeart } from "react-icons/fa";

const Modal = ({ gameOver, setGameOver, moves, handleNewGame }) => {
  return (
    <div
      className={`${
        gameOver ? "flex" : "hidden"
      } flex-col justify-center items-center gap-7 bg-gray-800 absolute w-[250px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg text-white z-40`}
    >
      <button
        className="text-white font-bold absolute right-0 top-0 mr-3 hover:text-gray-400 text-2xl"
        onClick={() => setGameOver(false)}
      >
        &times;
      </button>

      <div className="text-red-500 uppercase text-3xl font-bold tracking-wider animate-bounce">
        <FaHeart />
      </div>

      <h1 className="text-white uppercase text-3xl font-bold tracking-wider">
        ¡Ganaste!
      </h1>

      <div className="flex justify-between gap-2">
        <p className="text-white">Movimientos:</p>
        <p className="text-white">{moves}</p>
      </div>

      <button
        className="bg-yellow-500 font-semibold text-black rounded-md px-5 py-1 hover:opacity-90 mb-3"
        onClick={handleNewGame}
      >
        Nuevo Juego
      </button>
    </div>
  );
};

export default Modal;
