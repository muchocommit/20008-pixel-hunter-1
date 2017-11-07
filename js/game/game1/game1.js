import {
  initialGame,
  initialScreen,
  getTypeNum,
  getScreenNum,
  nextType,
  nextScreen,
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

  const setLives = (gameState, livesLeft) => {
    if (livesLeft < 0) {
      throw new RangeError(`Can't set negative lives`);
    }

    gameState = Object.assign({}, gameState);
    gameState.lives = livesLeft;

    return gameState;
  };

  const updateLives = (win) => {
    switch (win) {

      case Result.WIN:
        setLives(state, state.lives);

        Results.push(Result.NEXT_SCREEN);
        break;

      case Result.LOSE || Result.NONE:
        try {
          setLives(state, state.lives - 1);

        } catch (life) {
          if (life instanceof RangeError) {
            Results.push(Result.GAME_OVER);

            // Set lives to zero
            setLives(state, state.lives);
          }

          Results.push(Result.NEXT_SCREEN);
        }

        break;
    }
  };

  // Gets win result
  const isWin = (ans1, ans2) => {
    return getWin(ans1.isWin, ans2.isWin);

  };

  // Updates lives based on result
  const result = (a1, a2) => {
    return updateLives(isWin(a1, a2));

  };

  const switchScreen = (gameStatus, gameScreen) => {

    try {
      nextScreen(gameStatus, gameScreen + 1);
    } catch (thatScreen) {

      if (thatScreen instanceof RangeError) {
        Results.push(Result.NEXT_TYPE);

        // Set screen to initial state
        nextScreen(gameStatus, initialScreen.SCREEN_NUM);
      }
    }
  };

  const nxtScreen = (st, scr) => {
    return switchScreen(st, scr);

  };

  const switchType = (gameStatus) => {


  };

  const nxtType = (st, typ) => {
    return switchType(nextType(st, typ));
  };


  screen.onAnswer = (answer1, answer2) => {
    timer.reset();

    result(answer1, answer2);

    switch (isWin(answer1, answer2)) {

      case Result.WIN:
        changeView(changeScreen(nextScreen(updateLives(Result.WIN, state, state.lives), state.screen)));
        break;

      case Result.NEXT_SCREEN:
        changeView(changeScreen(nextScreen(updateLives(Result.LOSE, state, state.lives - 1), state.screen)));
        break;

      case Result.GAME_OVER:
        changeView(changeScreen(nextScreen(updateLives(Result.NONE, state, state.lives - 1), state.screen)));
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


