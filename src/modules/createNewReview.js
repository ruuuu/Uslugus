const createNewReview = (formReview, id) => {


      formReview.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            const formData = new FormData(formReview);   // formData = [[login: 'rufinka_91@mail.ru' ],  [password: 'зфыыцщкв' ]]

            const data = Object.fromEntries(formData);
            console.log('data comment ', data);
            // в итге  data = {
            //         name: 'rufinka_91@mail.ru',
            //         phone: 'password',
            //         text: 'текст отзыва'
            // }

            const dataResponse = await postData(`${API_URL}/api/service/comment/{id}`, data, 'post');             // запрос авторизации
            console.log('dataResponse in login: ', dataResponse);

      });
};