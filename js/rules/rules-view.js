import ModuleView from '../view';


export default class RulesView extends ModuleView {
  get template() {
    return `<header class="header">
      <div class="header__back">
      <span class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
      </span>
      </div>
      </header>
        <div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото 
  <img src="img/photo_icon.png" width="16" height="16"> или рисунок <img src="img/paint_icon.png" width="16" height="16" alt="">.<br>
  Фотографиями или рисунками могут быть оба изображения.<br>На каждую попытку отводится 30 секунд.<br>
  Ошибиться можно не более 3 раз.<br><br>
  Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>`.trim();
  }

  bind() {
    const input = this.element.querySelector(`.rules__input`);
    const button = this.element.querySelector(`.rules__button`);

    const linkBack = this.element.querySelector(`img[alt='Back']`);
    linkBack.onclick = () => {
      this.onReturn();
    };
  }
  onReturn() {
  }
}

// export const makeRulesTemplate = () => {
//   const el = makeTemplate(moduleRules);
//   const rulesInput = el.querySelector(`.rules__input`);
//
//   const rulesButton = el.querySelector(`.rules__button`);
//   const linkBack = el.querySelector(`img[alt='Back']`);
//
//   const switchBack = () => {
//     linkBack.removeEventListener(`click`, switchBack);
//     const introTemplate = makeIntroTemplate();
//     insertIntoContainer(introTemplate);
//   };
//
//   const enable = () => {
//     rulesButton.removeAttribute(`disabled`);
//   };
//
//   const next = () => {
//     rulesInput.removeEventListener(`input`, enable);
//     rulesButton.removeEventListener(`click`, next);
//
//     const game1Template = makeGame1Template();
//     insertIntoContainer(game1Template);
//   };
//   rulesInput.addEventListener(`input`, enable);
//   rulesButton.addEventListener(`click`, next);
//
//   linkBack.addEventListener(`click`, switchBack);
//   return el;
// };

