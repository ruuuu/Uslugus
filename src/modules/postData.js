// отправляем даннеы  формы регитрации/авторизации на сервер:
import { customError } from "./customError";


export const postData = async (url, data, method = 'POST') => {              //   data-данные формы {name: 'Rufina', surname: 'Davletova', phone: '56457457', email: 'kjhg@mail.ru'}, в формате json. Ставим  async  т к отправка данных на серер это асинхронная операция,  method = 'POST'  передастся по умолчанию, если при вызове не укажем паармтер method

      try {
            const response = await fetch(url, {                           //    wait  ставим, ткт долны дождаться ответа от сервера, иначе получим промис. Сам fetch() возвращаает промис, это асинхронная фукнция
                  method: method,                                         // каким методом отправляем данные: POST, PUTCH, DELETE
                  body: JSON.stringify(data),                             // JSON.stringify(data) преборазовываем в  JSON
            });

            if (response.ok || response.status !== 404) {
                  //console.log('отет от сервера ', await response.json());
                  return await response.json();                                     // получаем ответ от сервера: response.json() превращаем из json  в объект, т к получаем отвте от сервера, то ставим await

            }
            else {
                  throw new customError(await response.json());               //     вызов констурктора нашего класса customError
            }
      }
      catch (e) {
            return e.data || e;
      }


};