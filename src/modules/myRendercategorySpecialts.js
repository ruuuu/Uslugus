
import { renderList } from "./renderList";
import { createCard } from "./createCard";
import { API_URL } from "./const";
import { getData } from "./getData";


export const myRendercategorySpecialts = async () => {

      const buttons = document.querySelectorAll('.category__btn');   // массив кнпоок  [button, button, button]


      buttons.forEach((button) => {

            button.addEventListener('click', async () => {
                  // console.log('значние дата-атрибута нажатой кнопки ', button.dataset.value);
                  const data = await getData(`${API_URL}/api/service`);

                  const mas = data.filter((item, i) => {     //  вернет новый массив mas, элементы которого удовлееворяют условию
                        // console.log(i, ' -ый элемент: ', item);
                        // console.log('item.category ', item.category);
                        // console.log('button.dataset.value ', button.dataset.value);
                        // console.log('item.category === button.dataset.value ', item.category === button.dataset.value);
                        // console.log('\n');
                        return item.category === button.dataset.value;
                  });


                  //console.log('mas ', mas);

                  const serviceList = document.querySelector('.services__list');          // ul-контенейр куда будем добавлять картчоки,  <ul class="services__list"></ul>

                  serviceList.textContent = '';                                           // очищаем список

                  const cards = mas.map(createCard);                        // [ <li>...</li>, <li>...</li>, <li>...</li> ], передаем функцию, а не  вызываем. map сам вызывает эту фукнуцию для каждого элемента массива mas

                  //console.log('cards ', cards);
                  serviceList.append(...cards);
            });
      });





};