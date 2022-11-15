//  в формах авторизации/регитрации  показывать пароль при нажатиии иконки глазика:

export const showPassword = () => {
      const inputPassword = document.querySelectorAll('.form__input--password');                //  псевдомассив(NodeList)


      const btnEyesPassword = document.querySelectorAll('.form__password-eye');                  //  псевдомассив(NodeList)

      btnEyesPassword.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                  btn.classList.toggle('form__password-eye--show');
                  inputPassword[i].type = btn.classList.contains('form__password-eye--show') ? 'text' : 'password';
            });
      })

}
