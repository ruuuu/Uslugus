export const modalController = ({                     // modal - селектор мод окна, по нажатию на мод окно оно откроется, btnOpen- селектор кнпоки по нажаьию на котрую открывается модлка, btnClose-селектор кнпоки закрывтия модалки
      modal,
      btnOpen,
      btnClose,
      time = 300,
      parrentBtns,                                    // родитель  ul(.services__list) для кнопок(li), нужен для делегирования. Вещаем обработчик клик ана родителя 
      handlerOpenModal = () => { },
      handlerCloseModal = () => { },
}) => {

      const hadlerElems = parrentBtns ? document.querySelector(parrentBtns) : document.querySelectorAll(btnOpen);     // массив кнопок в модалке Person(по ее нажатию модалка откреотся), либо если есть родитель ul, то берем parrentBtns - .services__list(ul)
      const modalElem = document.querySelector(modal);            //  модалка с оверлеем(overlay)

      modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease-in-out;
      `;


      const data = {
            handlerOpenModal,    // функция

            handlerCloseModal,    // функция

            onOpenModal(handlerOpenModal) {
                  data.handlerOpenModal = handlerOpenModal;
            },

            onCloseModal(handlerCloseModal) {
                  data.handlerCloseModal = handlerCloseModal;
            },

            closeModal: (evt) => {                         //  закрытие окна, evt-объект события, у него есть свойтсов target
                  const target = evt.target;                      //  получаем элемнет на котрый нажали

                  if (target === modalElem || (btnClose && target.closest(btnClose)) || evt.code === 'Escape' || evt.type === 'submit') {                   //  evt.type тип события

                        modalElem.style.opacity = 0;

                        setTimeout(() => {
                              modalElem.style.visibility = 'hidden';                //  скрываем окно, действие выполнится через врмя time
                              data.handlerCloseModal({ modalElem });
                        }, time); // 300 милисекунд

                        window.removeEventListener('keydown', data.closeModal);          //  снимаем обработчик с объекта window(объект браузера), чтобы после закрытия окна лишний раз не срабатывало событие
                  }
            },


            openModal: async (handler) => {       //  handler это элемент с классом <artcile class="service"> - спеиалист                                //  открытие окна
                  await data.handlerOpenModal({ handler, modalElem });                             // эта фкнция может запрашивать данные, поэтому на асинхронная, дожидаемся когда будет резульатт handlerOpenModal()
                  modalElem.style.visibility = 'visible';
                  modalElem.style.opacity = 1;
                  window.addEventListener('keydown', data.closeModal);             //  keydown это событие  нажатие на  клавишу, escape, по нажатию вызовется closeModal
            },

      }






      if (parrentBtns) {
            hadlerElems.addEventListener('click', ({ target }) => {
                  const handler = target.closest(btnOpen); // если у target или его родителя есть элемент с классом btnOpen(.service), то вернет этот элемент
                  if (handler) {
                        data.openModal(handler);
                  }
            });
      }
      else {
            hadlerElems.forEach(btn => {
                  btn.addEventListener('click', data.openModal);                   // по нажатию на кнопку btn, вызовется фукнция openModal
            });

      }



      modalElem.addEventListener('click', data.closeModal);                  // по нажатию на оверлей или на крестик, вызовется фукнция closeModal

      return data;                             // вернули объект
};

