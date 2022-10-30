// отрисовка звездочек в картчоке  специалиста (в спсике специалситов):

import starSVG from '../img/star.svg';
import star0SVG from '../img/star-o.svg';




export const createStars = (commentsOrStars) => {              // массив объектов comments = [ {name: Артур, stars:4, text: "мой комметарий"}, {name: Руфина, stars:1, text: "мой комментарий"}, {name: Алия, stars:3, text: "мой комментарий"} ]
      // Array.isArray(commentsOrStars) вернт ttue/false, проверяет ялвяется ли массив commentsOrStars массивом

      const stars = Array.isArray(commentsOrStars) ? Math.round(commentsOrStars.reduce((acc, item) => item.stars + acc, 0) / commentsOrStars.length) || 0 : commentsOrStars;            // перебираем массив comments, передаем коллбэк функицю, item -  это текущий комментарий
      //console.log('stars ', stars);

      const wrapper = document.createElement('div');
      wrapper.classList.add('stars');

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


      return wrapper; // <div class="stars"> <img...> <img...> <img...> <img...> <img...> <img...> </div>

};