import footer from '../../footer/footer';
import AbstractView from "../../abstract-view";

export default class GreetingView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const pKeys = Object.keys(this.data.text.p);
    const sliced = pKeys.slice(0, 4);

    const [greetingSrc, greetingWidth, greetingHeight, greetingAlt] =
      Object.keys(this.data.img.greeting).map((key) => this.data.img.greeting[key]);

    const [nextSrc, nextWidth, nextHeight, nextAlt] =
      Object.keys(this.data.img.next).map((key) => this.data.img.next[key]);

    return `<div class="greeting central--blur">
    <div class="greeting__logo">
      <img src="${greetingSrc}" width="${greetingWidth}" height="${greetingHeight}" alt="${greetingAlt}">
    </div>
    
    <h1 class="greeting__asterisk">${this.data.text.h.h1}</h1>
    <div class="greeting__challenge">
      <h3>${this.data.text.h.h3}</h3>
      <p>${sliced.map((key) => `${this.data.text.p[key]}</br>`).join(``)}${this.data.text.p[pKeys[4]]}</p>
    </div>
    
    <div class="greeting__continue">
      <span>
        <img src="${nextSrc}" width="${nextWidth}" height="${nextHeight}" alt="${nextAlt}">
      </span>
    </div>
    
  </div>${footer()}`.trim();

  }

  bind() {
    const linkNext = this._element.querySelector(`img[alt='Next']`);

    linkNext.onclick = () => {
      this.onNext();
    };

  }

  onNext() {

  }
}


