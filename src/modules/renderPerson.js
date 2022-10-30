// отрисовка  мод окна Специалист при нажатии на картчоку специлалиста:
import { createElement } from "./createElemet";
import { API_URL, directions } from "./const";
import { store } from "./store";
import { createStars } from "./createStars";
import { createReview } from "./createReview";


export const renderPerson = (parent, data) => {  //  parent -родитлеьский эле-нт(.modal__person) куда отрисуем верстку специалиста, data = {name: 'Алексей', surname: 'Игнатов', category: 'photographer', phone: '+79145236123', email: 'ignatov.a@mail.com', …} -специалист

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
                  createElement('p', { className: '', textContent: 'Пока нет отзывов' }, review);
            }
      };




};