// импорт стандартных библиотек Node.js
const {existsSync, mkdirSync, readFileSync, writeFileSync, writeFile, unlink} = require('fs');
const { createServer } = require("http");
const path = require("path");

const DB_FILE = process.env.DB_FILE || path.resolve(__dirname, "db.json");
const PORT = process.env.PORT || 3024;
const URI_PREFIX = "/api/service";

function drainJson(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
}

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

function isImageBase64(data) {
  return /^data:image/.test(data);
}

function isImageURL(data) {
  return /^img\//.test(data);
}

function dataURLtoFile(base64, id) {
  if (!existsSync("./img")) {
    mkdirSync("./img");
  }
  const format = base64.split(";")[0].split("/")[1];
  const ext = format === "svg+xml" ? "svg" : format === "jpeg" ? "jpg" : format;
  const base64Image = base64.split(";base64,").pop();
  writeFile(
    `./img/${id}.${ext}`,
    base64Image,
    { encoding: "base64" },
    (err) => {
      if (err) console.log(err);
    }
  );
  return `img/${id}.${ext}`;
}

const pagination = (db, page, count) => {

  let end = count * page;
  let start = page === 1 ? 0 : end - count;

  const pages = Math.ceil(db.services.length / count);
  return {
    items: db.services.slice(start, end),
    page,
    pages,
  };
};

function makeItemsFromData(data, id) {
  const errors = [];
  const item = {
    name: data.name,
    surname: data.surname,
    category: data.category,
    phone: data.phone,
    email: data.email,
    price: data.price,
    password: data.password,
    direction: data.direction || 'from',
    about: data.about,
    avatar: data.avatar,
    comments: data.comments || [],
  };

  if (!item.name) {
    errors.push({ field: "name", message: "Не указано имя" });
  }

  if (!item.surname) {
    errors.push({ field: "surname", message: "Не указана фамилия" });
  }

  if (!item.category) {
    errors.push({ field: "category", message: "Не указана категория" });
  }

  if (!getCategory().some(category => category.title === item.category)) {
    errors.push({ field: "category", message: "Ошибочная категория" });
  }

  if (!item.phone) {
    errors.push({ field: "phone", message: "Не указано телефон" });
  }

  if (!item.email) {
    errors.push({ field: "email", message: "Не указан email" });
  }

  if (item.email && !(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(item.email))) {
    errors.push({ field: "email", message: "Не валидный email" });
  }

  if (!item.password) {
    errors.push({ field: "password", message: "Не указан пароль" });
  }

  if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{6,}/.test(item.password))) {
    errors.push({ field: "password", message: "Минимальная длина паролья 6 символов, обязательно содержит специмвол число и латинские буквы в нижнем и вернем регистре" });
  }

  if (!item.price) {
    errors.push({ field: "price", message: "Не указана стоимость" });
  }

  if (!['from', 'exactly', 'up to'].includes(item.direction)) {
    errors.push({ field: "direction", message: "Не верное значение" });
  }

  if (!item.about) {
    errors.push({ field: "about", message: "Не указано описание услуги" });
  }

  if (item.about && item.about.length < 40) {
    errors.push({ field: "about", message: "Минимальная длина описания 40 символов" });
  }

  if (!(isImageBase64(item.avatar) || isImageURL(item.avatar))) {
    errors.push({ field: "avatar", message: "Нет данных о изображении" });
  }

  if (!errors.length && isImageBase64(item.avatar)) {
    const url = dataURLtoFile(item.avatar, id);
    item.avatar = url;
  }

  if (errors.length) throw new ApiError(422, { errors });

  return item;
}

function getItemsList(params = {}) {
  const page = +params.page || 1;
  const paginationCount = params.count || 8;
  const sort = {
    value: params.sort,
    direction: params.direction || "up",
  };
  const db = JSON.parse(readFileSync(DB_FILE) || "{}");
  let data = db.services;

  if (params.search) {
    const search = params.search.trim().toLowerCase();
    data = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.about.toLowerCase().includes(search)
    );
  }

  if (params.category) {
    data = data.filter((item) => params.category === item.category);
  }

  db.services = data

  if (params.getpassword) return db;
  db.services.forEach(service => delete service.password)
  if (params.nopage) return db;
  // return pagination(db, page, paginationCount, sort); // пагинация
  return db.services;
}

function createItems(data) {
  const id =
    Math.random().toString(10).substring(2, 8) +
    Date.now().toString(10).substring(9);
  const newItem = makeItemsFromData(data, id);
  newItem.id = id;
  const items =  getItemsList({getpassword: true})
  items.services.push(newItem);
  writeFileSync(DB_FILE, JSON.stringify(items), {
    encoding: "utf8",
  });
  delete newItem.password
  return newItem;
}

function getItems(itemId) {
  const data = JSON.parse(readFileSync(DB_FILE) || "[]");
  const item = data.services.find(({ id }) => id === itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  delete item.password;
  return item;
}

function findItems(reqData) {
  const data = JSON.parse(readFileSync(DB_FILE) || "[]");
  const item = data.services.find(({ email }) => reqData.email.toLowerCase() === email.toLowerCase());
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  if (item.password !== reqData.password) throw new ApiError(404, { message: "Wrong password" });
  delete item.password;
  return item;
}


function updateItems(itemId, newService) {
  const data = getItemsList({getpassword: true});
  const itemIndex = data.services.findIndex(({id}) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, {message: 'Items Not Found'});
  if (!newService.password) throw new ApiError(404, { field: "password", message: "Не указан пароль" });
  if (newService.password !== data.services[itemIndex].password) throw new ApiError(404, { field: "password", message: "Пароль не верный" });
  Object.assign(data.services[itemIndex], makeItemsFromData({...data.services[itemIndex], ...newService}, itemId));
  writeFileSync(DB_FILE, JSON.stringify(data), {encoding: 'utf8'});
  delete data.services[itemIndex].password;
  return data.services[itemIndex];
}

function getCategory() {
  const data = JSON.parse(readFileSync(DB_FILE) || "[]");
  return data.category;
}

function deleteItems(itemId) {
  const data = getItemsList({nopage: true});
  const itemIndex = data.services.findIndex(({id}) => id === itemId);

  if (itemIndex === -1) throw new ApiError(404, {message: 'Items Not Found'});
  const item = data.services.find(({id}) => id === itemId);
  unlink(`./${item.image}`, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Файл удалён");
    }
  });
  data.services.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(data), {encoding: 'utf8'});
  return {};
}

function addComment(itemId, comment) {
  const errors = [];

  if (!comment.name) {
    errors.push({ field: "name", message: "Нет имени" });
  }

  if (!comment.phone) {
    errors.push({ field: "phone", message: "Нет телефона" });
  }

  if (!comment.text) {
    errors.push({ field: "text", message: "Нет комментария" });
  }

  if (!comment.stars) {
    errors.push({ field: "stars", message: "Нет оценки" });
  }

  if (errors.length) throw new ApiError(422, { errors });

  const data = getItemsList({getpassword: true});

  const itemIndex = data.services.findIndex(({id}) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, {message: 'Items Not Found'});
  data.services[itemIndex].comments.push(comment)
  Object.assign(data.services[itemIndex], makeItemsFromData({...data.services[itemIndex]}, itemId));
  writeFileSync(DB_FILE, JSON.stringify(data), {encoding: 'utf8'});

  delete data.services[itemIndex].password;
  return data.services[itemIndex];
}


module.exports = server = createServer(async (req, res) => {
  if (req.url.substring(1, 4) === "img") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    require("fs").readFile(`.${req.url}`, (err, image) => {
      res.end(image);
    });
    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  if (req.url.includes("/api/category")) {
    const body = await (async () => {
      if (req.method === "GET") return getCategory();
    })();
    res.end(JSON.stringify(body));
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  const [uri, query] = req.url.substring(URI_PREFIX.length).split("?");
  const queryParams = {};

  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }

  try {
    const body = await (async () => {
      if (uri === "" || uri === "/") {
        if (req.method === "GET") return getItemsList(queryParams);
      } else {
        const itemId = uri.substring(1);
        if (req.method === "GET") return getItems(itemId);
        if (req.method === 'POST' && uri.includes('signup')) {
          const createdItem = createItems(await drainJson(req));
          res.statusCode = 201;
          res.setHeader("Access-Control-Expose-Headers", "Location");
          res.setHeader("Location", `${URI_PREFIX}/${createdItem.id}`);
          return createdItem;
        }
        if (req.method === 'POST' && uri.includes('signin')) {
          const findItem = findItems(await drainJson(req));
          res.statusCode = 201;
          res.setHeader("Access-Control-Expose-Headers", "Location");
          res.setHeader("Location", `${URI_PREFIX}/${findItem.id}`);
          return findItem;
        }
        if (req.method === 'POST' && uri.includes('comment')) {
          const createdComment = addComment(uri.substring(9), await drainJson(req))
          res.statusCode = 201;
          return createdComment;
        }
        if (req.method === "PATCH")
          return updateItems(itemId, await drainJson(req));
        if (req.method === "DELETE") return deleteItems(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Server Error" }));
    }
  }
})
  .on("listening", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        `Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`
      );
      console.log("Нажмите CTRL+C, чтобы остановить сервер");
      console.log("Доступные методы:");
      console.log(`GET /api/category - получить список категорий`);
      console.log(`GET ${URI_PREFIX} - получить список услуг`);
      console.log(`GET ${URI_PREFIX}?{search=""} - поиск услуги по имени и описанию`);
      console.log(`POST ${URI_PREFIX}/signup - Зарегистрировать специалиста, в теле запроса нужно передать объект`);
      console.log(`POST ${URI_PREFIX}/signin - Псевдоавторизация, отправьте email и пароль`);
      console.log(`GET ${URI_PREFIX}/{id} - получить услуги по его ID`);
      console.log(`PATCH ${URI_PREFIX}/{id} - изменить услугу с ID, в теле запроса нужно передать объект`);
      console.log(`DELETE ${URI_PREFIX}/{id} - удалить услугу по ID`);
      console.log(`POST ${URI_PREFIX}/comment/{id} - добавить комментарий`);
    }
  })
  .listen(PORT);
