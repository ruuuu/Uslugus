export const modalController = ({                     // modal - селектор мод окна корое отекроется, btnOpen- селектор кнпоки по нажаьию на котрую открывается модлка, btnClose-селектор кнпоки закрывтия модалки
      modal,
      btnOpen,
      btnClose,
      time = 300,
      parrentBtns,                                    // родитель  ul(.services__list) для кнопок(li), нужен для делегирования. Вещаем обработчик клик ана родителя 
      handlerOpenModal = () => { },
}) => {

      const hadlerElems = parrentBtns ? document.querySelector(parrentBtns) : document.querySelectorAll(btnOpen);     // массив кнопок в модалке Person(по ее нажатию модалка откреотся), либо если есть родитель ul, то берем parrentBtns - .services__list(ul)
      const modalElem = document.querySelector(modal);            //  модалка с оверлеем(overlay)

      modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease-in-out;
      `;


      const event = {
            handlerOpenModal,  // функция
            onOpenModal: (handlerOpenModal) => {
                  event.handlerOpenModal = handlerOpenModal;
            }
      }




      const closeModal = (evt) => {                         //  закрытие окна, evt-объект события, у него есть свойтсов target
            const target = evt.target;                      //  получаем элемнет на котрый нажали

            if (target === modalElem || (btnClose && target.closest(btnClose)) || event.code === 'Escape') {

                  modalElem.style.opacity = 0;

                  setTimeout(() => {
                        modalElem.style.visibility = 'hidden';                //  скрываем окно, действие выполнится через врмя time
                  }, time); // 300 милисекунд

                  window.removeEventListener('keydown', closeModal);          //  снимаем обработчик с объекта window(объект браузера), чтобы после закрытия окна лишний раз не срабатывало
            }
      }



      const openModal = async () => {                                    //  открытие окна
            await event.handlerOpenModal();                             // эта фкнция может запрашивать данные, поэтому на асинхронная, дожидаемся когда будет резульатт handlerOpenModal()
            modalElem.style.visibility = 'visible';
            modalElem.style.opacity = 1;
            window.addEventListener('keydown', closeModal);             //  keydown это событие  нажатие на  клавишу, escape, по нажатию вызовется closeModal
      };



      if (parrentBtns) {
            hadlerElems.addEventListener('click', ({ target }) => {
                  if (target.closest(btnOpen)) {                        // если у target или его родителя есть элемент с классом btnOpen(.service)
                        openModal();
                  }
            });
      }
      else {
            hadlerElems.forEach(btn => {
                  btn.addEventListener('click', openModal);                   // по нажатию на кнопку btn, вызовется фукнция openModal
            });

      }



      modalElem.addEventListener('click', closeModal);                  // по нажатию на оверлей или на крестик, вызовется фукнция closeModal

      return event;                             // вернули объект
};

