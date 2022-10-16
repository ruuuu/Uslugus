//  реализации выпадающег спсика  "Категории" (на мобилках):


export const selectController = ({
      openBtn,
      openBlock,
      closeBtn, // .category__btn
      handlerChange = () => { },
}) => {

      const btn = document.querySelector(openBtn);                            // кнпока на котрую кликаем 

      const selectBlock = document.querySelector(openBlock);                  // ul- список котрый отобразится по нажатию на btn


      const data = {
            handlerChange,
            onChange: (handlerChange) => {
                  data.handlerChange = handlerChange;
            },
            value: '',
      };



      const openSElectBlock = () => {
            selectBlock.style.display = 'block';
      };

      const closeSelectBlock = () => {
            selectBlock.style.display = '';
      };


      const toggleSelectBlock = () => {
            selectBlock.style.display = selectBlock.style.display === 'block' ? '' : 'block';  //  сли блок открыт, значит скроем его. Иначе откроем
      };


      btn.addEventListener('click', toggleSelectBlock);                 // по нажатию на кнопку, вызовется функция 



      // выбор того элемнта спсика, на который клинклуи, клик вешаем на родителя(делегироваие)-ul:
      selectBlock.addEventListener('click', ({ target }) => {

            const option = target.closest(closeBtn);                                            // если у нажатого элемента (target)/его родителя есть класс .category__btn 
            if (option) {
                  closeSelectBlock();
                  data.value = option.dataset.value ? option.dataset.value : option.textContent;   // вешаем на кнопку(option) дата-атрибут data-value: option.dataset.value
                  data.handlerChange(data.value);
            }
      })

      return data;
};