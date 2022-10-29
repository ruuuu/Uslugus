// это фукнция содания элемента по тэгу и классу, id, src

export const createElement = (tag, param, parent) => {            // param ={}, parent- родитель

      const elem = document.createElement(tag);

      Object.assign(elem, param);  // соединяем tag и param(классу, id, src и др атрибуты)

      if (parent) {
            parent.append(elem);
      }

      return elem;

};