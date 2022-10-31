// выставляе рейтинг в форме отправки отзыва(в мод окне Person):


export const ratingController = (stars, ratingInput) => {

      //const stars = document.querySelector('.rating');                  // родиель для зведочек, на него будем вещать обработчик события(делегирвание)

      //const ratingInput = document.querySelector('.rating__input');     //  <input class="rating__input" type="hidden" name="rating">


      stars.addEventListener('click', ({ target, currentTarget }) => {   // делигировнаие- собтыие вешаем не на звоздочки, а на их родителя(currentTarget)
            // target - элемент(звездочка) на котром произошло событие. Вместо  {target}  можно было написать const target = evt.target, где evt передавать в обработчик 
            // currentTarget  - элемент, котрый является инициатром(т е родитель,) в начше случае это stars

            const star = target.closest('.rating__star');  //  если у target(нажатый эл-ент)/его родителя есть класс .rating__star, то вернет этот элемент. Метод elem.closest('selector') ищет элемент   elem/его родителей   у котрого есть селектор selector

            if (star) {
                  currentTarget.dataset.stars = star.dataset.rating;
                  ratingInput.value = star.dataset.rating;                          //  <input class="rating__input" type="hidden" name="rating" data-rating=' star.dataset.rating'>
            }
      });




};