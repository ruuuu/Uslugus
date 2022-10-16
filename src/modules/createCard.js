// создане карточки специалиста на главной станице:
import { API_URL, directions } from "./const";
import { store } from "./store";


export const createCard = (item) => {                                   // item это  {} - текущий специалист из data

      const { avatar, category, comments, direction, id, name, surname, price } = item;

      const serviceItem = document.createElement('li');                 // <li></li>
      serviceItem.classList.add('services__item');

      const service = document.createElement('article');
      service.classList.add('service');
      service.dataset.id = id;                                           // устаивновивл дата-атрибут data-id=id, чтобы  при клике на картчоку, знали страницу какгоо специалиста отобразить

      serviceItem.append(service);

      const serviceAvatar = new Image(50, 50);                          // <img width="50" height="50">
      serviceAvatar.classList.add('service__avatar');
      serviceAvatar.src = `${API_URL}/${avatar}`;                       // http://localhost:3024/img/1234.jpg
      serviceAvatar.alt = `${category} ${surname} ${name}`;

      const servicePresent = document.createElement('div');
      servicePresent.classList.add('service__present');

      const serviceTitle = document.createElement('h3');
      serviceTitle.classList.add('service__title');
      store.category.find((item) => (item.title === category).rus);  // пербирает  массив store.category и возвращает первый элемент удовелтворяющий условию и берем .rus



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
      serviceReview.textContent = 'Звезды';


      const serviceCountReview = document.createElement('p');
      serviceCountReview.classList.add('service__count-review');
      serviceCountReview.textContent = comments.length.toString();            // приводит число к строке


      serviceReview.append(serviceCountReview);

      service.append(serviceAvatar, servicePresent, servicePrice, serviceReview);
      return serviceItem;                                               // <li>

}

` < li class="services__item" >
< !--независмоя единица-- >
      <article class="service">




            <div class="service__review">
                  <div class="service__stars stars">
                        <img class="stars__item" src="./img/star.svg" alt="Рейтинг специалиста 4 из 5">
                              <!-- у др img alt не заполням(для слепых людей)-->
                              <img class="stars__item" src="./img/star.svg" alt="">
                                    <img class="stars__item" src="./img/star.svg" alt="">
                                          <img class="stars__item" src="./img/star.svg" alt="">
                                                <img class="stars__item" src="./img/star-o.svg" alt="">
                                                </div>

                                                <p class="service__count-review"> 4 </p>
                                          </div>
                                    </article>
                              </li>`
