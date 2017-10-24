import {getScreen} from '../data/hunt';
import {drawHeader} from "../utils";
import ModuleView from './../view';

export default class Game2View extends ModuleView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const screen = getScreen(this.state.screen);
    const options = Object.keys(screen);

    const optionsParams = options.map((option, imageParams, questionParams) => (
      {option, imageParams: screen[option].image, questionParams: screen[option].question}));

    return `
    ${drawHeader(this.state)}
    <div class="game">
        <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${optionsParams.map(({option, imageParams, questionParams}) => `<div class="game__option">
          <img src="${imageParams.src}" alt="${option}" width="${imageParams.width}" height="${imageParams.height}">
          <label class="game__answer game__answer--${questionParams.paint.value}">
            <input name="${questionParams.paint.name}" type="radio" value="${questionParams.paint.value}">
            <span>${questionParams.paint.text}</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--${questionParams.photo.value}">
            <input name="${questionParams.photo.name}" type="radio" value="${questionParams.photo.value}">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
      </form>
      <div class="stats">
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      </div>
    </div>`;

  }
}