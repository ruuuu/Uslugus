import './index.html';
import './index.scss';
import { modalController } from './modules/modalController';         // ипморт фукнции modalController из файла modalController.js
import { selectController } from './modules/selectController';
import { showPassword } from './modules/showPassword';
import { choicesController } from './modules/choicesController';
import { avatarController } from './modules/avatarController';
import { getCategory } from './modules/getCategory';



const init = () => {
      // для мод окна авторизация
      modalController({
            modal: '.modal__sign-in',
            btnOpen: '.header__auth-btn--sign-in',
            btnClose: '.modal__close'
      });


      // для мод окна регитрация
      modalController({
            modal: '.modal__sign-up',
            btnOpen: '.header__auth-btn--sign-out',
            btnClose: '.modal__close'
      });


      // для мод окна Person(Отзывы), функция возвращает объект
      const modalPerson = modalController({
            modal: '.modal__person',
            btnOpen: '.service',
            parrentBtns: '.services__list',                  //  передаем parrentBtns: '.services__list', чтобы сделать делегирование(оно нужно вслучае  если добавим еще элементы спсика, то и на них  чтоб обработчик клика  повесился)
            btnClose: '.modal__close',
            handlerOpenModal: async () => {                 //    эта фукнция асинхронная, потмоу что запрос на сервер отправляеься
                  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
                        .then(response => response.json())
                  // .then(json => console.log(json))

                  const comments = document.querySelectorAll('.review__text');            // псевдомассив ['.review__text', '.review__text', '.review__text']

                  comments.forEach((comment) => {
                        if (comment.scrollHeight > 38) {                      // если  скрытая высота у comment > 38
                              const button = document.createElement('button');
                              button.classList.add('review__open');
                              button.textContent = 'Развернуть';
                              comment.after(button);                         // добавили кнопку после comment

                              button.addEventListener('click', () => {

                                    comment.classList.toggle('review__text--open');
                                    button.textContent = comment.classList.contains('review__text--open') ? 'Свернуть' : 'Развернуть';

                              })

                        }
                  });
            }
      });


      // выпадашка меню открывается:
      selectController({
            openBtn: '.category__title',
            openBlock: '.category__list',
            closeBtn: '.category__btn',
            handlerChange: (value) => {
                  console.log(value);
            }
      });


      showPassword();

      choicesController();

      const crp = avatarController({ inputFile: '.avatar__input', uploadResult: '.avatar__result' });             // .avatar__result   контенер, где будет выводиться загруженная картинка    

      getCategory();

};


init();


// для запуска сервера, в терминале переходим в папку backendFor_uslugus, и пишем команду "node index"



// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

