// отображение звезочек специалиста:

import starSVG from '../img/star.svg';
import star0SVG from '../img/star-o.svg';




export const createStars = (comments) => {              // массив объектов comments = [ {name: Артур, stars:4, text: "kjhkjg"}, {name: Руфина, stars:1, text: "Привет"}, {{name: Алия, stars:3, text: "Добро"} ]

      const stars = Math.round(comments.reduce((acc, item) => item.stars + acc, 0) / comments.length) || 0;            // перебираем массив comments, передаем коллбэк функицю, item -  это текущий комментарий
      console.log('stars ', stars);

      const wrapper = document.createElement('div');
      wrapper.classList.add('service__stars');

      for (let i = 0; i < 5; i++) {
            const star = document.createElement('img');
            star.classList.add('stars__item');


            if (i === 0) {
                  star.alt = `Рейтинг специалиста ${stars} из 5`;
            }
            else {
                  star.alt = '';
            }


            if (stars > i) {
                  star.src = starSVG;                    // закрашенная звезда
            }
            else {
                  star.src = star0SVG;                   // незакрашенная звезда
            }


            wrapper.append(star);
      }


      return wrapper; // <div> <img><img...></div>

};