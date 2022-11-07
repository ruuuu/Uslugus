import { renderList } from "./renderList";
import { API_URL } from "./const";

// поису услуги по имени и описианию:

export const searchControl = () => {

      const searchForm = document.querySelector('.search');                    // form поиска

      searchForm.addEventListener('submit', (evt) => {                     // на форму навешиваем сбытие submit
            evt.preventDefault();                                          // отменяепм повдеение по умолчанию, это посл еотправки данных станица перезагружается 
            renderList(`${API_URL}/api/service?search=${searchForm.search.value}`);   // поис куслуги по имени и оgсианию, searchForm.search это <input name="search">, searchForm.search.value значение поля

      });


};


