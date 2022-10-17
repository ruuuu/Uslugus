// отрисовка спсика фотографов на главной странице:
import { API_URL } from './const';
import { getData } from './getData';
import { createCard } from './createCard';


export const renderList = async (url = `${API_URL}/api/service`) => {               // по умолчанию этот урл, получим спсиок специалистов

      const serviceList = document.querySelector('.services__list');          // ul-контенейр куда будем добавлять картчоки,  <ul class="services__list"></ul>

      serviceList.textContent = '';                                           // очищаем список

      const data = await getData(url);                                        //  ставим await, тк  getData(url), в  ней метод fetch, а это асинхронная фукнция. Иначе без await полуичм Promise. А можно вместо await использовать  цепочку из then()

      console.log('list of specialists ', data);                                             //  [ {}, {}, {}, {} ] - массив сппециалистов

      const cards = data.map(createCard);                        // [ <li>...</li>, <li>...</li>, <li>...</li> ], передаем функцию, а не  вызываем. map сам вызывает эту фукнуцию для каждого элемента массива data

      //console.log('cards ', cards);
      serviceList.append(...cards);                   // в  ul добавляем массив [ <li>...</li>, <li>...</li>, <li>...</li> ]. При помощи спред отпертора добавляем сами li





};