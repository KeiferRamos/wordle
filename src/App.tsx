import { useEffect, useState } from "react";
import "./Style.css";

const answers = ["weird", "beach", "china", "dream", "group"];

const template = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function App() {
  const [strike, setStrike] = useState(0);
  const [current, setCurrent] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [winner, setWinner] = useState(false);
  const [out, setOut] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string[][]>(template);

  useEffect(() => {
    if (userAnswer[0][0]) {
      if (current >= 4) {
        if (answers[lvl] === userAnswer[strike].join("")) {
          setWinner(true);
        } else {
          setStrike(strike + 1);
          setCurrent(0);
        }
      } else {
        setCurrent(current + 1);
      }

      if (userAnswer[5][4] && answers[lvl] !== userAnswer[strike].join("")) {
        setOut(true);
      }
    }
  }, [userAnswer]);

  const handleClick = (key: string) => {
    setUserAnswer((prev) => {
      return prev.map((el, i) => {
        if (i == strike) {
          return el.map((item, i) => (i === current ? key : item));
        } else {
          return el;
        }
      });
    });
  };

  const nextLevel = () => {
    setWinner(false);
    setUserAnswer(template);
    setLvl((prev) => {
      if (prev >= 4) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    setStrike(0);
    setCurrent(0);
  };

  const replay = () => {
    setOut(false);
    setUserAnswer(template);
    setStrike(0);
    setCurrent(0);
  };

  return (
    <>
      <div className="App">
        <table>
          <tbody>
            {Array.from(Array(6).keys()).map((_, i) => {
              return (
                <tr key={i}>
                  {Array.from(Array(5).keys()).map((_, j) => {
                    const char = userAnswer[i][j];
                    const isInRightPlace = answers[lvl].charAt(j) === char;
                    return (
                      <td
                        key={j}
                        className={`${
                          isInRightPlace && char
                            ? "isInRightPlace"
                            : answers[lvl].includes(char) && char
                            ? "isIn"
                            : ""
                        }`}
                      >
                        {char}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="keyboard">
          {Array.from("qwertyuiopasdfghjklzxcvbnm").map((el, i) => {
            return (
              <p key={i} onClick={() => handleClick(el)}>
                {el}
              </p>
            );
          })}
        </div>
      </div>
      {winner ? (
        <div className="modal">
          <div>
            <h3>you're correct</h3>
            <button onClick={() => nextLevel()}>next level</button>
          </div>
        </div>
      ) : null}

      {out ? (
        <div className="modal">
          <div>
            <h3>you lose</h3>
            <button onClick={() => replay()}>replay</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
