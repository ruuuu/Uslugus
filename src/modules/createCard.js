// создане карточки специалиста (вспсике спецов):

import { API_URL, directions } from "./const";
import { store } from "./store";
import { createStars } from "./createStars";


export const createCard = (item) => {                                   // item это  {name: '', surname: '', phone: '', email: ''. about: '', category: ''^ avatar: ''} - текущий специалист из data

      const { avatar, category, comments, direction, id, name, surname, price } = item;                     // дестурктутризация

      const serviceItem = document.createElement('li');                 // <li></li>
      serviceItem.classList.add('services__item');

      const service = document.createElement('article');
      service.classList.add('service');
      service.dataset.id = id;                                           // устаивновивл дата-атрибут data-id=id, чтобы  при клике на картчоку, знали страницу какгоо специалиста отобразить

      serviceItem.append(service);

      const serviceAvatar = new Image(50, 50);                          // если длать через new Image, томожно изображению задать высоту  и ширину  <img width="50" height="50">
      serviceAvatar.classList.add('service__avatar');
      serviceAvatar.src = `${API_URL}/${avatar}`;                       // http://localhost:3024/img/1234.jpg
      serviceAvatar.alt = `${category} ${surname} ${name}`;

      const servicePresent = document.createElement('div');
      servicePresent.classList.add('service__present');

      const serviceTitle = document.createElement('h3');
      serviceTitle.classList.add('service__title');
      serviceTitle.textContent = store.category.find((item) => item.title === category).rus;  // пербирает  массив store.category и возвращает первый элемент удовелтворяющий условию и берем  у элемента свойство  .rus



      const serviceName = document.createElement('p');
      serviceName.classList.add('service__name');
      serviceName.textContent = `${name} ${surname[0]}.`;

      servicePresent.append(serviceTitle, serviceName);

      const servicePrice = document.createElement('p');
      servicePrice.classList.add('service-price');
      servicePrice.textContent = `${directions[direction]}  ${price} Р`;
      service.append(servicePrice);

      const serviceReview = document.createElement('div');
      serviceReview.classList.add('service__review');
      //serviceReview.textContent = 'Звезды';


      const serviceCountReview = document.createElement('p');
      serviceCountReview.classList.add('service__count-review');
      serviceCountReview.textContent = comments.length.toString();            // приводит число к строке


      serviceReview.append(createStars(comments), serviceCountReview);

      service.append(serviceAvatar, servicePresent, servicePrice, serviceReview);
      return serviceItem;                                               // <li>

}

