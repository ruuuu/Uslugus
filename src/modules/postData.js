// отправляем даннеы  формы регитрации на сервер:
import { customError } from "./customError";


export const postData = async (url, data, method) => {              //   data-данные формы {name: 'Rufina', surname: 'Davletova', phone: '56457457', email: 'kjhg@mail.ru'}, в оформате json, ставим  async  т к отправка данных на серер это асинхронная операция

      try {
            const response = await fetch(url, {                           //    wait  ставим, ткт долны дождаться ответа от сервера, иначе получим промис. Сам fetch() возвращаает промис, это асинхронная фукнция
                  method: method,                                         // каким методом отправляем данные: POST, PUTCH, DELETE
                  body: JSON.stringify(data),                             // JSON.stringify(data) преборазовываем в  JSON
            });

            if (response.ok) {
                  console.log('отет от серерва ', await response.json());
                  return await response.json();                                     // получаем ответ от сервера: response.json() превращаем из json  в объект

            }
            else {
                  throw new customError(await response.json());
            }
      }
      catch (e) {
            return e.data || e;
      }


};