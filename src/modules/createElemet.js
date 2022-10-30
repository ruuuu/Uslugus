// это фукнция содания элемента по тэгу и классу, id, src

export const createElement = (tag, param, parent) => {            // param ={}, parent- родитель,в него склыдваем созданный элемент

      const elem = document.createElement(tag);

      Object.assign(elem, param);  // соединяем tag и param = { className: '', id: '', src: '' }

      if (parent) {
            parent.append(elem);
      }

      return elem;                  // возврат созданного элемента 

};