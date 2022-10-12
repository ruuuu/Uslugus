//  кастомные ошибки будем выводить

export class customError extends Error {  // класс Error- класс встроенный  в JS, customError - наш созданный класс

      constructor(data) {           // datа-ошибки  возникшие врезульате обработки даннх на серевере
            super();                // конструктор класса Error(суперкласс), у класса customError будут все своцтва и методы класса  Error
            this.data = data;
      }


}  