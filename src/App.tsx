import "./styles.css";
import { useState } from "react";
import Joke from "./components/Joke";
import ShowJoke from "./components/ShowJoke";
import { JokeContext } from "./Contexts/JokeContext";

const GIF_AVATAR =
  "https://media.tenor.com/images/1cf0485141431cab570f57ce1824d339/tenor.gif";

export default function App() {
  const [joke, setJoke] = useState();
  const [option, setOption] = useState();
  const [category, setCategory] = useState("animal");
  const [byCategory, setByCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  return (
    <div className="chuck-app">
      <header className="title-bar">
        <h1 className="title">CHUCK NORRIS JOKES</h1>
      </header>

      <main className="layout">
        <JokeContext.Provider
          value={{
            joke,
            setJoke,
            option,
            setOption,
            category,
            setCategory,
            byCategory,
            setByCategory,
            categories,
            setCategories
          }}
        >
          <ShowJoke />
          <Joke />
        </JokeContext.Provider>
      </main>

      <footer>
        <img src={GIF_AVATAR} alt="avatar gif" />
      </footer>
    </div>
  );
}
