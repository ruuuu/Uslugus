import { createElement } from "./createElemet";
import { createStars } from "./createStars";


// заоплням список ul li-шками:

export const createReview = (comments) => {  // comments = [ {name: 'Макс', stars: '4', text: 'тетсовые текст'},  {name: 'Федор', stars: '3', text: 'тетсовые текст'} ]

      const reviewList = createElement('ul', { className: 'review__list' });

      comments.forEach((comment) => {
            const reviewItem = createElement('li', { className: 'review__item' }, reviewList);
            createElement('h4', { className: 'review__name', textContent: comment.name }, reviewItem);
            // звездочки:
            const stars = createStars(comment.stars);                         // вернет верстку <div class="stars"><img...> <img...> <img...> <img...> <img...> <img...></div>
            stars.classList.add('review__stars');
            reviewItem.append(stars);
            const reviewText = createElement('p', { className: 'review__text', textContent: comment.text }, reviewItem);
      });


      return reviewList;                                          // <ul><li></li> <li></li> <li></li></ul>
};