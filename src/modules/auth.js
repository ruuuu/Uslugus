import { store } from "./store";
import { API_URL } from "./const";
import { createElement } from "./createElemet";


// после авторзиации меняется верка блока .header__auth:

export const auth = (data) => {           // ответ от сервера  data = {name: 'Арнольд', surname: 'Шварцнегер', category: 'electrician', phone: '89274415637', email: 'tre@mail.ru'}

  // заполням обхект store.user ={}
  store.user.name = data.name;
  store.user.id = data.id; // id нужен чтоыб при нажатии но кнпоку Изменить услгу, значли  id специалиста
  store.user.category = data.category;
  store.user.avatar = data.avatar;

  // console.log('store: ', store);

  const categoryRus = store.category.find((item) => item.title === store.user.category).rus;      //  пербирает  массив store.user.category. и возвращает первый элемент удовелтворяющий условию и берем  у элемента свойство  .rus
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


  // либо чеерзнашметод  createElement:
  createElement('img', { src: `${API_URL}/${store.user.avatar}`, alt: `${categoryRus} ${store.user.name}`, className: 'auth__avatar' }, headerAuth);
  createElement('p', { className: 'auth__name', textContent: store.user.name }, headerAuth);
  createElement('p', { className: 'auth__category', textContent: categoryRus }, headerAuth);
  createElement('button', { className: 'auth__btn-edit', textContent: 'Изменить услугу' }, headerAuth);

  modalController({
    modal: '.modal__sign-in',
    btnOpen: '.header__auth-btn--sign-in',
    btnClose: '.modal__close',
    // родитель  ul(.services__list) для кнопок(li), нужен для делегирования. Вещаем обработчик клик ана родителя 
    handlerOpenModal: async () => {       // тк получаем данные с сервера после авториации

    },
    handlerCloseModal: ,
  })
};