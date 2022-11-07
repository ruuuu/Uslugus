// выпадающий список в форме Регитрации. Использваоли плагин https://github.com/Choices-js/Choices для этого, установили его так: npm install choices.js
import Choices from "choices.js";



export const choicesController = () => {
      const option = {
            searchEnabled: false,
            shouldSort: false,  // сортирует элементы спсика
            itemSelectText: '',  // надпись на  элементе списка
      }


      const selectCategory = document.querySelector('.form__select--category');           // выпадающий спсико Категрия (любой жэемент на старнцие это объект)

      // вызываем объект  Choices для дропдауна Категории:
      // добавидм объекту selectCategory своство choices:
      selectCategory.choices = new Choices(selectCategory, {
            ...option, classNames: {
                  containerOuter: 'choices form__select--category',
            }
      });
      // console.dir(selectCategory);


      const selectPrice = document.querySelector('.form__select--price');

      // вызываем объект  Choices для дропдауна Цена:
      selectPrice.choices = new Choices(selectPrice, {
            ...option, classNames: {
                  containerOuter: 'choices form__select--price',
            }
      });

};