// получние спсика категорий:
import { API_URL } from './const';
import { getData } from './getData';



export const getCategory = async () => {                          // ставим  async ,тк здесь будем отправлть запрос на сервер и  ждать ответа(а это асинхронная операция)

      const data = await getData(`${API_URL}/api/category`);             // await, тк ждем когда завершится асинхроная функци getData, получаем ответ от сервеа([{},{},{},{}])

      console.log('data ', data);


};
