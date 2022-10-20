// выставляе рейтинг в форме отправки отзыва:


export const ratingController = () => {

      const stars = document.querySelector('.rating');                  // родиель для зведочек, на него будем вещать обработчик события(делегирвание)

      const ratingInput = document.querySelector('.rating__input');     // input


      stars.addEventListener('click', ({ target, currentTarget }) => {   // делигировнаие- собтыие вешаем не на звоздочки, а на их родителя
            // target - элемент на котром произошло событие. Вместо  {target}  можно было написать const target = evt.target, где evt передавать в обработчик 
            // currentTarget  - элемент, котрый является инициатром(т е родитель,) в начше случае это stars

            const star = target.closest('.rating__star');  //  если у target(нажатый эл-ент)/его родителя есть класс .rating__star. Вернет этот элемент. Метод elem.closest('selector') проверяет есть ли  у элемента elem/его родителей  селектор selector


            if (star) {
                  currentTarget.dataset.stars = star.dataset.rating;
                  ratingInput.value = star.dataset.rating;
            }
      });




};