import {
  initialGame,
  getScreen,
  getTypeNum,
  getScreenNum,
  nextType,
  mapAnsType,
  ansPush,
  assignAnswer,
  Result,
  gameAnswers,
  // calculateScore,
} from '../../data/hunt';

import Clock from '../../data/game-timer';
import greetingElement from '../../welcome/greeting/greeting';
import Game1View from './game1-view';
import {getWin, tick} from './../game-utils';
import {showElement} from '../../utils';
import {changeView} from "../../../materials/toComponentsTransition_01.10/utils";


// Function maps default answer object by type and current screen
const getAns = (t, s) => {
  return mapAnsType(t, s);
};

const changeScreen = (state) => {

  const screen = new Game1View(state);
  const timer = new Clock(state, state.time, screen, tick);
  timer.start();

  // Gets current time from timer Object, assign to current state
  timer.currentTime = (_state) => {
    state = Object.assign({}, _state);

    return state;
  };

  // Get current type and screen
  const typeKey = getTypeNum(state.type);
  const screenKey = getScreenNum(state.screen);

  // Current answer object from db
  const answerDefault = () => {
    return getAns(typeKey, screenKey);

  };

  const [answer] = answerDefault();

  const Results = [];

  const setLives = (_state, livesLeft) => {
    if (livesLeft < 0) {
      throw new RangeError(`Can't set negative lives`);
    }

    state = Object.assign({}, _state);
    state.lives = livesLeft;
  };

  const updateLives = (win) => {
    switch (win) {

      case Result.WIN:
        Results.push(Result.NEXT_SCREEN);

        setLives(state, state.lives);
        break;

      default:
        try {
          setLives(state, state.lives - 1);

        } catch (life) {
          if (life instanceof RangeError) {
            Results.push(Result.GAME_OVER);

            setLives(state, initialGame.lives);
          }

        }
        Results.push(Result.NEXT_SCREEN);
        break;
    }

    return Results;
  };

  // Gets win result
  const isWin = (ans1, ans2) => {
    return getWin(ans1.isWin, ans2.isWin);

  };

  // Updates lives based on result
  const response = (a1, a2) => {
    updateLives(isWin(a1, a2));

  };

  const switchType = (gameStatus, gameType) => {
    try {
      nextType(gameStatus, gameType + 1);

    } catch (thatType) {
      if (thatType instanceof RangeError) {
        Results.push(Result.GAME_WON);

      }
    }
    return Results;
  };

  const nxtType = (st, typ) => {
    return switchType(st, typ);
  };


  const nextScreen = (_state, gameScreen) => {
    const nxtS = gameScreen;


    if (!getScreen(_state.type, nxtS)) {
      // First must check if there is next type
      // Here must launch calculate bonus function !!! Just a sample call, must return GAME_OVER (assigned)
      // game = questions[`type_${game.type + 1}`] ? nextType(game, game.type + 1) : Result.GAME_OVER;
      throw new RangeError(`Can't find level ${nxtS}`);

    }

    state = Object.assign({}, _state);
    state.screen = nxtS;

    return state;
  };

  const switchScreen = (_state, gameScreen) => {
    try {
      nextScreen(_state, gameScreen + 1);

    } catch (thatScreen) {
      if (thatScreen instanceof RangeError) {
        Results.push(Result.NEXT_TYPE);

        nextScreen(_state, initialGame.screen);
        nxtType(_state, _state.type);
      }

    }
    return Results;
  };

  const nxtScreen = (st, scr) => {
    return switchScreen(st, scr);

  };


  screen.onAnswer = (answer1, answer2) => {
    timer.reset();

    response(answer1, answer2);
    nxtScreen(state, state.screen);


    switch (Results) {

      case Results[Result.WIN]:
        changeView(changeScreen(state));
        break;

      case Results[Result.NEXT_SCREEN]:
        changeView(changeScreen(state));
        break;

      case Results[Result.GAME_OVER]:
        screen.onReturn = () => {
          showElement(greetingElement());
        };
        break;

    }


    // Result.NEXT_SCREEN = isNextScreen() ? Results.push(Result.NEXT_SCREEN) : nextGameType;
    // If result is winning, calculate score, if not, assign into answers array with win result

    // Updates answer object with score
    // const getAnsScore = calculateScore(currentAnswer, state, screenNum);
    //
    // ansPush(gameAnswers, assignCurrentAnswer(getAnsScore, screenNum, isWin));
  };

  // on Return to greeting screen
  screen.onReturn = () => {
    showElement(greetingElement());
  };

  return screen;
};

export default () => changeScreen(initialGame);


