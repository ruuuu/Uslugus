import { store } from "./store";
import { API_URL } from "./const";
import { createElement } from "./createElemet";
import { modalController } from "./modalController";
import { getData } from "./getData";


// после авторзиации меняется верстка блока .header__auth:

export const auth = (data) => {           // ответ от сервера, данные авторизованного юзера,  data = {name: 'Арнольд', surname: 'Шварцнегер', category: 'electrician', phone: '89274415637', email: 'tre@mail.ru'}

  // заполням объект store.user ={}
  store.user.name = data.name;
  store.user.id = data.id; // id нужен чтоыб при нажатии но кнпоку Изменить услгу, значли  id специалиста
  store.user.category = data.category;
  store.user.avatar = data.avatar;

  // console.log('store: ', store);

  const categoryRus = store.category.find((item) => item.title === store.user.category).rus;      //  пеербирает  массив store.user.category. и возвращает первый элемент удовелтворяющий условию и берем  у элемента свойство  .rus
  // store.user.category = [ {title: 'photographer', rus: 'Фотограф'}, {title: 'masseur', rus: 'Массажист'}, {title: 'makeup', rus: 'Визажист'}, {title: 'handyman', rus: 'Муж на час'}, {title: 'manicurist', rus: 'Мастер маникюра'}, {title: 'plumber', rus: 'Сантехник'} ]

  const headerAuth = document.querySelector('.header__auth');
  headerAuth.textContent = '';        // изачанльно очищаем верстку
  headerAuth.classList.add('auth');

  // верстку вставляем либо чрез innerHTML
  // headerAuth.innerHTML = `
  //         <img class="auth__avatar" src="${API_URL}/${store.user.avatar}" alt="avatar">
  //         <p class="auth__name">${store.user.name}</p>
  //         <p class="auth__category">${categoryRus}</p>
  //         <button class="auth__btn-edit">Изменить услугу</button>
  //     `;


  // либо чеерз наш метод  createElement():
  createElement('img', { src: `${API_URL}/${store.user.avatar}`, alt: `${categoryRus} ${store.user.name}`, className: 'auth__avatar' }, headerAuth);
  createElement('p', { className: 'auth__name', textContent: store.user.name }, headerAuth);
  createElement('p', { className: 'auth__category', textContent: categoryRus }, headerAuth);
  createElement('button', { className: 'auth__btn-edit', textContent: 'Изменить услугу' }, headerAuth);

  // открытие мод окна  редаткирования специалиста(после автоизации, по нажатию на кнпку Изменить услугу:
  modalController({
    modal: '.modal__sign-up',               // по нажатию на кнопку .auth__btn-edit, открывется окно регитарции спец-та .modal__sign-up и запускается фукнция handlerOpenModal
    btnOpen: '.auth__btn-edit',             //  жмем на кнопку Изменить улугу
    btnClose: '.modal__close',
    handlerOpenModal: async () => {                 // async  тк получаем данные с сервера после авториации
      const data = await getData(`${API_URL}/api/service/${store.user.id}`);           //   получаем специалиста{ name: 'Алексей',  surname: 'Игнатов',  category: 'photographer',  phone: '+79145236123',  email: 'ignatov.a@mail.com', … } по его id
      const form = document.querySelector('.form__sign-up');
      form.action = `${API_URL}/api/service/${store.user.id}`;
      form.dataset.method = 'PATCH';

      form.name.value = data.name;                        //  предзаполняем поле с <input name="name">
      form.surname.value = data.surname;                  //  предзаполняем поле с <input name="surname">
      form.phone.value = data.phone;
      form.email.value = data.email;
      form.price.value = data.price;
      form.about.value = data.about;
      form.direction.choices.setChoiceByValue(data.direction);      //  выбор элемента из выпадающегог спсика Цена
      form.category.choices.setChoiceByValue(data.category);        //  выбор элемента из выпадающегог спсика Категория
    },
    //handlerCloseModal: ,
  })
};