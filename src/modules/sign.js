
import { avatarController } from './avatarController';
import { API_URL } from './const';
import { postData } from './postData';
import { createCard } from './createCard';
import { auth } from './auth';



// АВторзиация  специалиста:
export const signInConstroller = (callback) => {

      const form = document.querySelector('.form__sign-in');

      form.addEventListener('submit', async (evt) => {
            evt.preventDefault();


            const formData = new FormData(form);   // formData = [[login: 'rufinka_91@mail.ru' ],  [password: 'зфыыцщкв' ]]

            const data = Object.fromEntries(formData);
            // в итге  data = {
            //         login: 'rufinka_91@mail.ru',
            //         password: 'password',
            // }

            const dataResponse = await postData(`${API_URL}/api/service/signin`, data, 'post');             // запрос авторизации
            console.log('dataResponse in login: ', dataResponse);

            if (dataResponse.errors) {                                              // если с серевр пришла ошибка
                  console.log('dataResponse.errors ', dataResponse.errors);
                  return;                                                           // далее код не будет выполнться
            }

            callback(evt);          // вызыво коллбэк функии(closeModal) , это функция котрая закрывает мод окно авториации
            auth(dataResponse);

      });


};




//  Регистрация специалиста:
export const signUpConstroller = (cb) => {                  // тк форма не имеет отношения к мод окну, она просто в нем находится, то передаем коллбэк cb котрый управляет формой. Коллбэк закрывате мод окно

      const headerAuth = document.querySelector('.header__auth');
      const authBlock = document.querySelector('.authBlock');
      headerAuth.style.display = 'block';
      authBlock.style.display = 'none';

      const form = document.querySelector('.form__sign-up');

      const crp = avatarController({ inputFile: '.avatar__input', uploadResult: '.avatar__result', });              // .avatar__result контенер, где будет выводиться загруженная картинка    


      form.addEventListener('submit', async (evt) => {
            evt.preventDefault();                                                         // чобы после отвправки даных не было презагрукзи страницы(действие по улочанию)

            if (form.password[0].value !== form.password[1].value) {                      // form.password получим поле, где password это значение атрибута name у поля <input type="password" name="password">
                  console.log('Пароли не совпадают');
                  return;                                                                 // дальше код не будет выполнчться
            }

            const formData = new FormData(form);                                                       // мспльзуем конутрктор FormData(),  получаем данные из нашеq формы

            // в результате получим formData = [[name, 'Дима'], [surname, 'ВАсильев'], [phone, '5654543'], [email, 'rte@mail.ru']]

            const data = Object.fromEntries(formData);                        // fromEntries() перебирает итерируемый объект(коллекции, массивы, объекты) и возвращает объект {}. 
            //  в результате  data будет таким:
            //  data = {
            //         name: 'Дима',
            //         surname: 'Васильев',
            //         phone': '987869',
            //         email: 'rigndfsd@mail.ru' 
            // }

            // вот что делает Object.fromEntries(formData):

            // const data = {};
            // formData.forEach(([key, value]) => {
            //       data[key] = value;
            // });

            console.log(data);
            data.avatar = await crp.result({                            // добавляем совйств avatar,  crp.result это асинхронная операция, то есть мы дожидаемся результата. Иначе без awiat полуим промис
                  type: 'base64',                                       // в base64 отправляем на сервер
                  size: 'viewport',                                      // то есть тот размер котрый мы указали
            });


            const dataResponse = await postData(`${API_URL}/api/service/signup`, data, 'post');                                 // возвращает промис, чтбы был не промис, ставим await. Отправлянем данные  формы(data) на сервер  по урлу /api/service/signup , запрос на регистрацию

            console.log('dataResponse ', dataResponse);                       // { name: 'Руфина',  surname: 'Давлтеова',  phone: '892345433234',  email: 'ryufhbm@mail.ru' }

            if (dataResponse.errors) {                                              // если с серевр пришла ошибка, dataResponse.errors это массив ошибок не пуст()
                  console.log('dataResponse.errors ', dataResponse.errors);

                  const formError = document.querySelector('.form__error');
                  formError.textContent = dataResponse.errors.message;

                  // dataResponse.errors.forEach((error) => {                    // переьирем массив ошибок [ {field: 'name',  }, {field: 'password'}, {field: 'category'}, {field: 'surname',} ]
                  //       if (error.field !== 'password') {
                  //             form[error.field].style.border = '1px solid red';
                  //       }
                  //       else {
                  //             form[error.field].style.border = '1px solid black';
                  //       }

                  // });

                  return;                                                           // далее код не будет выполнться
            }

            const servicesList = document.querySelector('.services__list');                     // ul спеиалистов
            servicesList.append(createCard(dataResponse));                                      // добавляем  верстку карточку специалиста в спсиок ul

            auth(dataResponse);                                                           // автоизация
            form.reset();                                                                       // очищаем поля формы

            crp.hideAvatar();                                                                   // очищаем контенейр для аватара у формы

            cb(evt); // вызыво коллбэк функии(closeModal) , это функция котрая закрывает мод окно регитрации
      });
};