import Board from "./components/Board";
import BubbleBackground from "./components/BubbleBackground";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow relative">
        <BubbleBackground />
        <Board />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default App;
