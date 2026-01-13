const fs = require("fs");

const mainView = fs.readFileSync("./main.html", "utf-8");
const mariadb = require("./database/connect/mariadb");
const orderListView = fs.readFileSync("./orderlist.html", "utf-8");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (error, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(mainView);
  response.end();
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });
  mariadb.query(
    `INSERT INTO orderlist VALUES(${productId}, '${new Date().toLocaleDateString()}');`,
    function (error, rows) {
      console.log(rows);
    }
  );
  response.write("order page");
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(orderListView);
  mariadb.query(`SELECT * FROM orderlist;`, function (error, rows) {
    /* 강의에서는 foreach를 쓰는데 심심풀이로 map과 reduce 함수를 사용해보았다 */
    response.write(
      rows
        .map((element) => `<td>${element.id}</td><td>${element.date}</td>`)
        .reduce((a, b) => {
          return `<tr>${a}${b}</tr>`;
        }, "") // 헷갈렸던 점 map함수 먼저 실행되고 reduce 실행되는데 역순으로 실행되는 줄 알았다
    );
    response.write("</table>");
    response.end();
  });
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (error, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (error, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (error, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

let handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* image directory */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;
exports.handle = handle;
