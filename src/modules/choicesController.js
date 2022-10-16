// выпадающий список в форме Регитрации. Использваоли плагин https://github.com/Choices-js/Choices для этого, установили его так: npm install choices.js
import Choices from "choices.js";

export const choicesController = () => {
      const option = {
            searchEnabled: false,
            shouldSort: false,  // сортирует элементы спсика
            itemSelectText: '',  // надпись на  элементе списка
      }

      new Choices('.form__select--category', {
            ...option, classNames: {
                  containerOuter: 'choices form__select--category',
            }
      });  // вызываем объект 


      new Choices('.form__select--price', {
            ...option, classNames: {
                  containerOuter: 'choices form__select--price',
            }
      });

};