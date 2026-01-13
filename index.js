const { route } = require("./router"); // router.js에서 route라는 함수를 사용한다
let server = require("./server"); // server.js의 모든 export 함수 또는 오브젝트를 불러온다
let requestHandler = require("./requestHandler"); // requestHandler의 모든 export 함수 또는 오브젝트를 불러온다

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(route, requestHandler.handle);
