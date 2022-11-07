// отрисовка  мод окна Специалист при открытиии картчоки специлалиста:
import { createElement } from "./createElemet";
import { API_URL, directions } from "./const";
import { store } from "./store";
import { createStars } from "./createStars";
import { createReview } from "./createReview";
import { ratingController } from "./ratingController";



export const renderPerson = (parent, data) => {    //  parent -родитлеьский эле-нт(.modal__person) куда отрисуем верстку специалиста, инфа с сервера о спеиалисте data = {name: 'Алексей', surname: 'Игнатов', category: 'photographer', phone: '+79145236123', email: 'ignatov.a@mail.com', …} -специалист

      parent.textContent = '';                        //  очищает содержимое мод окна

      console.log('data of specialist ', data);

      const body = createElement('div', { className: 'modal__body' }, parent);      // <div class="modal__body">

      const container = createElement('div', { className: 'modal__container person' }, body);

      // блок service:
      const service = createElement('div', { className: 'person__service service service--person' }, container);

      const img = createElement('img', { src: `${API_URL}/${data.avatar}`, className: 'service__avatar', alt: `аватар ${data.name}` }, service);

      const servicePresent = createElement('div', { className: 'service__present' }, service);


      createElement('h3', { className: 'service__title', textContent: store.category.find(item => item.title === data.category).rus }, servicePresent);
      createElement('p', { className: 'service__name', textContent: `${data.name} ${data.surname[0]}.` }, servicePresent);


      const servicePrice = createElement('p', { className: 'service__price', textContent: `${directions[data.direction]} ${data.price} P` }, service);


      const serviceContacts = createElement('div', { className: 'service__contacts' }, service);
      createElement('a', { className: 'service__link service__link--phone', textContent: data.phone, href: `tel:${data.phone}` }, serviceContacts);
      createElement('a', { className: 'service__link service__link--email', textContent: data.email, href: `mailto:${data.email}` }, serviceContacts);

      // звездочки
      const serviceReview = createElement('div', { className: 'service__review' }, service);

      const stars = createStars(data.comments);             // вернет верстку <div> <img> <img...> <img> <img...> <img> <img...> </div>
      serviceReview.append(stars);
      stars.classList.add('service__stars');


      const countReview = createElement('p', { className: 'service__count-review', textContent: data.comments.length }, serviceReview);


      // О себе
      const about = createElement('div', { className: 'person__about about' }, container);
      createElement('h3', { className: 'about__title', textContent: 'О себе' }, about);
      createElement('p', { className: 'about__text', textContent: data.about, style: 'white-space: pre-line;' }, about);

      // ОТзывы
      const review = createElement('div', { className: 'person__review about__review review' }, container);
      createElement('h3', { className: 'review__title', textContent: 'Отзывы' }, review);

      if (data.comments.length) {
            review.append(createReview(data.comments));                       // createReview вернет верстку  отзывов: <ul><li></li> <li></li> <li></li> <li></li></ul>
            if (data.comments.length > 3) {
                  const btn = createElement('button', { className: 'review__open review__open--list ', textContent: 'Все отзывы' }, review);         // Кнпка Развернут все
                  btn.addEventListener('click', () => {
                        review.classList.add('review__show-all');                   // показываем все отзывы
                        btn.remove();
                  });
            }
            else {
                  createElement('p', { textContent: 'Пока нет отзывов' }, review);
            }
      };

      //form Отсавть отзыв:
      const formReview = createElement('form', { className: 'person__form form form--add-review' }, container);

      const fieldset = createElement('fieldset', { className: 'form__fieldset form__wrapper-person' }, formReview);

      const labelName = createElement('label', { className: 'form__label' }, fieldset);


      createElement('span', { className: 'form__text', textContent: 'Имя' }, labelName);
      createElement('input', { className: 'form__input', name: 'name' }, labelName);



      const labelPhone = createElement('label', { className: 'form__label', textContent: 'Телефон' }, fieldset);
      createElement('span', { className: 'form__text' }, labelPhone);
      createElement('input', { className: 'form__input', name: 'phone' }, labelPhone);



      const labelReview = createElement('label', { className: 'form__label form__label--personTextarea' }, formReview);
      createElement('span', { className: 'form__text', textContent: 'Комментарий' }, labelReview);
      createElement('textarea', { className: 'form__textarea', name: 'text' }, labelReview);

      // отрисовка звездочек:
      const wraperSendReview = createElement('div', { className: 'form__wrapper-rating' }, formReview);
      const rating = createElement('div', { className: 'form__rating rating' }, wraperSendReview);
      rating.dataset.stars = '3';                //   установили элементу дата-атрибут data-stars = 3

      for (let i = 1; i <= 5; i++) {
            rating.innerHTML += `
                  <svg class="rating__star" width="18" height="18" viewBox="0 0 18 18" data-rating="${i}" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <!-- в fill="currentColor"  чтобы можо было в силях указать цвет звездочик чееоз свойство color,  илбо желтый либо белый-->
                        <path
                        d="M16.3401 7.00099L16.34 7.001L16.3419 7.0065C16.3844 7.13479 16.3872 7.27292 16.3501 7.40288C16.3131 7.53281 16.2377 7.64857 16.1339 7.73509C16.1339 7.73511 16.1339 7.73513 16.1338 7.73515L12.9535 10.3821L12.7128 10.5824L12.788 10.8864L13.7976 14.97L13.7976 14.9701L13.7991 14.9758C13.8331 15.1065 13.8268 15.2444 13.7811 15.3715C13.7354 15.4985 13.6524 15.6088 13.543 15.6879L13.5412 15.6892C13.4379 15.7646 13.3144 15.807 13.1866 15.8109C13.0589 15.8149 12.9329 15.7802 12.8252 15.7113L12.8236 15.7103L9.27718 13.4636L9.265 13.4559L9.2524 13.4489C9.20102 13.4204 9.09335 13.3714 8.95079 13.3849C8.83541 13.3959 8.75188 13.4438 8.71259 13.4704L5.42744 15.5516L5.4266 15.5521C5.29892 15.6333 5.14975 15.6743 4.99849 15.6696C4.84724 15.6648 4.7009 15.6147 4.57853 15.5257L4.57737 15.5248C4.44813 15.4314 4.35012 15.3011 4.29617 15.151C4.24221 15.0009 4.23483 14.838 4.27499 14.6837L4.27567 14.681L5.22599 10.9429L5.30306 10.6398L5.06418 10.4378L1.86935 7.7374L1.86936 7.73739L1.86667 7.73515C1.76284 7.64862 1.68746 7.53284 1.65036 7.40288C1.61326 7.27292 1.61615 7.13479 1.65866 7.0065L1.65869 7.00651L1.66045 7.00099C1.70017 6.87628 1.77656 6.76644 1.87965 6.6858C1.98269 6.60519 2.10763 6.5575 2.23817 6.54894C2.23823 6.54893 2.23829 6.54893 2.23835 6.54893L6.391 6.27922L6.70549 6.25879L6.82272 5.96626L8.39486 2.04304L8.39488 2.04305L8.39682 2.03808C8.44402 1.91654 8.5268 1.81208 8.63432 1.73835C8.74174 1.66469 8.86887 1.62513 8.99911 1.62482H8.99962C8.99965 1.62482 8.99968 1.62482 8.99971 1.62482C9.1303 1.62486 9.25784 1.66434 9.36562 1.73809C9.47342 1.81186 9.55642 1.91647 9.60375 2.03822L9.60374 2.03822L9.60508 2.0416L11.1542 5.9423L11.2702 6.23458L11.5839 6.25653L15.7598 6.54877L15.7622 6.54893C15.8928 6.55746 16.0178 6.60515 16.1209 6.6858C16.2239 6.76644 16.3003 6.87628 16.3401 7.00099Z"
                        stroke="#FFD600" />
                  </svg>
            `;
      }

      // rating__input звездочки к отзыву:
      const ratingInput = createElement('input', { className: 'rating__input', type: 'hidden', name: 'stars' }, rating);

      ratingController(rating, ratingInput);                // проставлеn у скрытого поля дата-атрбит data-rating

      createElement('button', { className: 'form__submit', textContent: 'Опубликовать отзыв' }, wraperSendReview);

      const closeButton = createElement('button', { className: 'modal__close', textContent: '' }, container);
      closeButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.75 5.25L5.25 18.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18.75 18.75L5.25 5.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
      `;

};