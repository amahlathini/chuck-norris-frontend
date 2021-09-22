import { useContext, useState } from "react";
import { JokeContext } from "../Contexts/JokeContext";
//import MyEmojiPicker from './MyEmojiPicker'
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const IMG_AVATAR_1 = "https://api.chucknorris.io/img/favicon.ico";
const IMG_AVATAR_2 =
  "https://assets.chucknorris.host/img/avatar/chuck-norris.png";

export default function ShowJoke() {
  const { joke } = useContext(JokeContext);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div>
      <img src={IMG_AVATAR_1} alt="avatar pic 1" className="pic-1" />
      <img src={IMG_AVATAR_2} alt="avatar pic 2" className="pic-2" />

      <section className="joke-result">
        <br />
        <blockquote>{joke}</blockquote>
      </section>
      <div className="stars-container">
        <div className="stars">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
