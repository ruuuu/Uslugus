// отрисовка  мод окна Специалист:
import { createElement } from "./createElemet";



export const renderPerson = (parent, data) => {  //  parent -родитлеьский эле-нт(.modal__person) куда отрисуем верстку специалиста, data = {}

      parent.textContent = '';                  //  очищает содердимое мод окна

      console.log('data of specialist ', data);

      const body = createElement('div', { className: 'modal__body' }, parent);      // <div class="modal__body">



};