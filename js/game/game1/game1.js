import {
  initialGame,
  answers,
  getTypeNum,
  getScreenNum,
  getAnsKeys,
  ansPush,
  assignCurrentAnswer,
  gameAnswers
} from '../../data/hunt';
import GreetingView from '../../welcome/greeting/greeting-view';
import {getResult} from "./game1-utils";
import Game1View from './game1-view';
import {showElement} from "../../utils";

const changeScreen = (state) => {
  const screen = new Game1View(state);
  const greeting = new GreetingView();

  const typeNum = getTypeNum(initialGame.type);
  const screenNum = getScreenNum(initialGame.screen);

  screen.onAnswer = (ans1, ans2) => {

    const win1 = ans1.isWin;
    const win2 = ans2.isWin;

    // Checking if both answers are correct
    const win = getResult(win1, win2);

    // Getting answer keys from data file
    const ansKeys = getAnsKeys(answers);

    // Mapping answer by type and current screen number
    const mapAnsType = (tNum, sNum) => {
      return ansKeys.map((type) => ({type, [sNum]: answers[type][sNum]})).filter((key) => {
        return key.type === `${tNum}`;
      });
    };

    const getAns = mapAnsType(typeNum, screenNum);

    const [currentAnswer] = getAns;

    // Assigning new Object and pushing answer into array
    ansPush(gameAnswers, assignCurrentAnswer(currentAnswer, screenNum, win));


  };

  screen.onReturn = () => {
    showElement(greeting.element);
  };

  return screen;
};

export default () => changeScreen(initialGame).element;


