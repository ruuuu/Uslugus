//  кастомные ошибки будем выводить, для этго оздадим свой класс customError:

export class customError extends Error {              // класс Error - класс встроенный  в JS, customError - наш созданный класс

      constructor(data) {                        // datа-ошибки  возникшие врезульате обработки даннх на серевере
            super();                             // конструктор класса Error(суперкласс), у класса customError будут все свойства и методы класса  Error
            this.data = data;
      }
}  