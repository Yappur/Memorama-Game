import Board from "./components/Board";
import BubbleBackground from "./components/BubbleBackground";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div>
        <BubbleBackground />
        <Board />
      </div>
      <Footer />
    </div>
  );
}

export default App;
