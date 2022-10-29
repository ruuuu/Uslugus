import { store } from "./store";


// АВторизация:
export const auth = (data) => {           // ответ от сервера  data = name: 'Арнольд', surname: 'Шварцнегер', category: 'electrician', phone: '89274415637', email: 'tre@mail.ru'

      // заполням обхект store.user ={}
      store.user.name = data.name;
      store.user.id = data.id; // id нужен чтоыб при нажатии но кнпоку Изменить услгу, значли  id специалиста
      store.user.category = data.category;

      // console.log('store: ', store);

      const headerAuth = document.querySelector('.header__auth');
      const authBlock = document.querySelector('.authBlock');
      headerAuth.style.display = 'none';
      authBlock.style.display = 'block';



      const authBlockName = document.querySelector('.authBlock__name');
      const authBlockCategory = document.querySelector('.authBlock__category');

      authBlockName.textContent = store.user.name;
      authBlockCategory.textContent = store.user.category;




};