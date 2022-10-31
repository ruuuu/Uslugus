// получние спсика категорий:
import { API_URL } from './const';
import { getData } from './getData';                  // имопртирум функуию  getData из getData.js
import { store } from './store';                      //импортуирем объект store из файал store.js


export const getCategory = async () => {                          // ставим  async ,тк здесь будем отправлть запрос на сервер и  ждать ответа(а это асинхронная операция)

      const category = await getData(`${API_URL}/api/category`);             // await, тк ждем когда завершится асинхроная функци getData, получаем ответ от сервеа [{}, {} ,{}, {}]

      console.log('categories ', category);           // [ {title: 'photographer', rus: 'Фотограф'}, {title: 'masseur', rus: 'Массажист'}, {title: 'makeup', rus: 'Визажист'}, {title: 'handyman', rus: 'Муж на час'}, {title: 'manicurist', rus: 'Мастер маникюра'}, {title: 'plumber', rus: 'Сантехник'} ]

      store.category = category; // заполнили массив store.category (он в файле store.js)


};
