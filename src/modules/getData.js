// отправка запросов на сервер по урлу:

import { customError } from "./customError";


export const getData = async (url) => {
      try {                                                       //  тк во время запроса или обработки  ответа от сервера, могут быть ошибки то обернули в try catch
            const response = await fetch(url);                       // fetch -асинхронный  метод(отправка запроса на сервер методом GET), поэтому нужно дождаться ответа от серевра. Поэтому добавляем функции async/await(знаичт подожди когда fecth выпонлится). если await не потсавить, то в отвтее будет промис
            // response это  ответ в виде json, превратим егов  объект response.json()
            if (response.ok) {
                  return await response.json();                          //  дожидаемся когда даные из json(от сервера ответ) превратятся в объект(асинхронная операция), тгда их вернем
            }
            else {
                  throw new customError(await response.json());
            }
      }
      catch (e) {                                                 // обработка ошибки, если в try произойдет ошибка
            console.warn(e);                                      // выведет ошибку котрпая в  throw new customError(await response.json());
      }
};