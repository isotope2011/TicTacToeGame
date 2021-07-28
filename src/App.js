import React, { useCallback, useEffect, useState } from "react";
import _set from "lodash/set";
import UserControls from "./components/user_controls";
import { ROCK, PAPER, SCISSORS, USER, OPPO } from "./common";

const user = {
  id: " 1234-1234-123",
  isPicked: false,
  name: "Tope Adekanbi",
  choice: null,
  score: 0,
  type: USER,
};

const opponent = {
  id: " 1234-1234-111",
  isPicked: false,
  name: "Computer",
  choice: null,
  score: 0,
  type: OPPO,
};

const gameData = {
  rounds: [],
  currentRound: 0,
  totalRounds: 3,
  userTotal: 0,
  oppoTotal: 0,
  score: {
    [USER]: 0,
    [OPPO]: 0,
  },
  winner: null,
};

const initGameData = (gameId) => {
  return {
    user,
    opponent,
    ...gameData,
  };
};

const updateData = (data, path, val) => {
  let gameData = data;
  _set(gameData, path, val);
  return gameData;
};

const gameController = (data, setData) => {
  const userPick = data[USER].choice;
  const oppoPick = data[OPPO].choice;

  const isRock = (pick) => pick === ROCK;
  const isPaper = (pick) => pick === PAPER;
  const isScissors = (pick) => pick === SCISSORS;

  let winner = null;
  // User is Rock
  if (isRock(userPick)) {
    if (isScissors(oppoPick)) {
      winner = {
        name: data[USER].name,
        choice: userPick,
        type: USER,
      };
    }
    else if (isPaper(oppoPick)) {
      winner = {
        name: data[OPPO].name,
        choice: oppoPick,
        type: OPPO,
      };
    }
  }
  else if (isPaper(userPick)) {   // User is Paper
    if (isRock(oppoPick)) {
      winner = {
        name: data[USER].name,
        choice: userPick,
        type: USER,
      };
    }
    else if (isScissors(oppoPick)) {
      winner = {
        name: data[OPPO].name,
        choice: oppoPick,
        type: OPPO,
      };
    }
  }
  else if (isScissors(userPick)) {   // User is Scissors
    if (isPaper(oppoPick)) {
      winner = {
        name: data[USER].name,
        choice: userPick,
        type: USER,
      };
    }
    else if (isRock(oppoPick)) {
      winner = {
        name: data[OPPO].name,
        choice: oppoPick,
        type: OPPO,
      };
    }
  }
  
  if (winner === null) { // same pick
    winner = {
      isDraw: true
    }
  }
  else {
    if (winner.type === USER) {
      data[USER].score = data[USER].score+1;
    }
    else {
      data[OPPO].score = data[OPPO].score+1;
    }
  }

  data.winner = winner;

  console.log('game data', data);

  setData(data);
};

function App({ gameId }) {
  const [data, setData] = useState(initGameData(gameId));
  const [message, setMessage] = useState(null);
  const [isUpdated, setUpdated] = useState(false);

  const {
    userTotal,
    oppoTotal,
    currentRound,
  } = data;

  const update = useCallback(
    (key, val) => {
      const updated = updateData(data, key, val);
      setData(updated);
      setUpdated(true);
    },
    [data]
  );

  useEffect(() => {
    if (isUpdated) {
      console.log('activity', data);
      setUpdated(false);
    }
  }, [data, isUpdated])

  useEffect(() => {
    const userPicked = data.user.isPicked;
    const oppoPicked = data.opponent.isPicked;

    console.log('ispicked', userPicked, oppoPicked);

    if (userPicked && oppoPicked) {
      // check game logic
      gameController(data, setData);
    }

  }, [data, data.opponent.isPicked, data.user.isPicked]);

  useEffect(() => {
    console.log('is winner', data.winner)
    if (data.winner) {
      if(data.winner.isDraw) {
        setMessage('Its a Draw!')
      }
      else {
        const { name, choice } = data.winner;
        setMessage(`${name}'s ${choice} Wins!`);
      }
    }
  },
  [data.winner]);

  return (
    <div className="game-app">
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <div className="container">
            <h1 className="text-center">Rock-Paper-Scissors</h1>

            <div className="row player">
              <div className="col">{user.name}</div>
              <div className="col text-end">{opponent.name}</div>
            </div>

            <div className="row round">
              <div className="col text-center">{`Round ${currentRound + 1}`}</div>
            </div>

            <div className="row scores mx-1">
              <div className="col">{user.score}</div>
              <div className="col text-center">{`${userTotal} - ${oppoTotal}`}</div>
              <div className="col text-end">{opponent.score}</div>
            </div>
          </div>
        </header>
        <main>
          {message && (
            <div className="container text-center display-choice">
              {message}
            </div>
          )}

          <div className="container user-choices">
            <div className="row justify-content-between">
              <div className="col-5">
                <UserControls {...{ user, update }} />
              </div>
              <div className="col-5">
                <UserControls {...{ user: opponent, update }} />
              </div>
            </div>
          </div>
        </main>
        <footer className="pt-5 my-5 border-top">
          <div className="copyright">Made by Tope</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
