// загрузка аватарки

import Croppie from 'croppie'; // импортурем установленный плагин https://foliotek.github.io/Croppie/

export const avatarController = ({ inputFile, uploadResult }) => {
      const upload = document.querySelector(inputFile);                       // поле загрузки файла <input type="file">


      const avatar = document.querySelector(uploadResult);                    // конттейнер , куда будет заноситься  загруженная картинка

      avatar.style.display = 'none';

      const crp = new Croppie(avatar, {
            boundary: { width: 300, height: 300 },
            viewport: { width: 200, height: 200, type: 'circle' },
      });


      // считываем загруженный файл:
      const readFile = ({ target: input }) => {                          // evt -  объект события, у негое сть свойтсов target. Либо можно сразу передать так: {target}

            if (input.files && input.files[0]) {                          // у <input type="file"> есть свойство files , и  в это поле можно грузить несколько файлов
                  const reader = new FileReader();                        // FileReader() - апи встроенное в  JS, свтроенный объект в браузер

                  reader.addEventListener('loadend', (evt) => {            // у new FileReader() есть событие loadstart/load/loadend, когда файл загрузится доконца, срабоатет это событие
                        avatar.style.display = 'block';
                        console.log('evt.target.result ', evt.target.result);                       // свойство result повится когда картнка загрузится(то есть сработает собыие loadend)
                  });

                  reader.readAsDataURL(input.files[0]);
            }
      };


      upload.addEventListener('change', readFile);               // как только картинка поменяется, так сработает событие change.  Загрузка файла 

};