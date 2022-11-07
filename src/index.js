import './index.html';
import './index.scss';
import { modalController } from './modules/modalController';         // ипморт фукнции modalController из файла modalController.js
import { selectController } from './modules/selectController';
import { showPassword } from './modules/showPassword';
import { choicesController } from './modules/choicesController';

import { getCategory } from './modules/getCategory';
import { renderList } from './modules/renderList';
import { searchControl } from './modules/searchControl';
import { myRendercategorySpecialts } from './modules/myRendercategorySpecialts';
import { ratingController } from './modules/ratingController';
import { signUpConstroller, signInConstroller } from './modules/sign';
import { getData } from './modules/getData';
import { API_URL } from './modules/const';
import { renderPerson } from './modules/renderPerson';


const init = async () => {

      await getCategory();                                                    // получение категрий от сервера для боковго меню(await  стаивм ттк  в это метода запрос на сервер происходит, дожидаемся ответа от сервера)
      renderList();                                                         // отрисовка картчоек специалистов

      // оnкрытие мод окна Авторизация, вызываем чоыб окно закрывалось после авторизации:
      const eventModalSignIn = modalController({
            modal: '.modal__sign-in',
            btnOpen: '.header__auth-btn--sign-in',
            btnClose: '.modal__close'
      });


      // для мод окна Регитрация вызываем чоыб окно закрывалось после регитрации:
      const eventModalSignUp = modalController({
            modal: '.modal__sign-up',
            btnOpen: '.header__auth-btn--sign-out',
            btnClose: '.modal__close',
      });


      // по нажатию на кнпоку .service,  открывается  мод окно(.modal__person) Специасит,и запувкается функция handlerOpenModal. А по нажатию на кнпоку .modal__close, окно закроется
      const modalPerson = modalController({
            modal: '.modal__person',
            btnOpen: '.service',
            parrentBtns: '.services__list',                  //  передаем parrentBtns: '.services__list', чтобы сделать делегирование(оно нужно вслучае  если добавим нового спеиласта(зарегирируемиуем его), то чтобы и на него  обработчик клика  повесился)
            btnClose: '.modal__close',

            handlerOpenModal: async ({ handler, modalElem }) => {                  // при открытии окна вызывается эта функия,    эта фукнция асинхронная, потмоу что запрос на сервер отправляеься. { handler } этот от элемент на котрый мы нажали то есть картчока спеиалиста  - article.service,  нужен чтобы знать id спеицалиста
                  console.log('handler ', { handler });                             // элемент с классом <artcile class="service"> - спеиалист
                  const data = await getData(`${API_URL}/api/service/${handler.dataset.id}`);                // получаем специалиста { name: 'Алексей',  surname: 'Игнатов',  category: 'photographer',  phone: '+79145236123',  email: 'ignatov.a@mail.com', … } по его id

                  //console.log('specialist ', data); 

                  renderPerson(modalElem, data);                                   // вызов фунции заполнения мод окна Person, modalElem- родитель куда отрисуем веркту специалиста

                  const comments = document.querySelectorAll('.review__text');            // псевдомассив NodeList ['.review__text', '.review__text', '.review__text']

                  // отображение кнопки Развернуть у комментария:
                  comments.forEach((comment) => {
                        if (comment.scrollHeight > 38) {                      // если  скрытая высота у comment > 38
                              const button = document.createElement('button');
                              button.classList.add('review__open');
                              button.textContent = 'Развернуть';
                              comment.after(button);                         // добавили кнопку  button(Развернуть)  после comment

                              button.addEventListener('click', () => {      // по нажатию на кнкоу Равзернуть

                                    comment.classList.toggle('review__text--open');
                                    button.textContent = comment.classList.contains('review__text--open') ? 'Свернуть' : 'Развернуть';
                              });

                        }
                  });
            }
      });


      // выпадашка меню открывается (на мобилках):
      selectController({
            openBtn: '.category__title',
            openBlock: '.category__list',
            closeBtn: '.category__btn',

            handlerChange: (value) => {
                  console.log(value);
            }
      });


      showPassword();

      choicesController();                                              //    дял выпадающих списков


      searchControl();                                                  // отправка формы поиска

      myRendercategorySpecialts();                                      //   отображение карточек спеуиалистов после выбора  из категрии(левое меню)  

      signUpConstroller(eventModalSignUp.closeModal);                                       // регитрация специалистач
      signInConstroller(eventModalSignIn.closeModal);                                              // авторзиация
};



init();                 // отсда все начинается 


// для запуска сервера, в терминале переходим в папку backendFor_uslugus, и пишем команду "node index"



// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

