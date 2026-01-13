let http = require("http"); // Node.js에서 http서버를 만들고 요청을 보내기 위한 기본 내장 모듈
let url = require("url"); // 웹 주소 문자열을 구조적으로 분해하고 조작하기 위한 기본 내장 모듈

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; // url의 주소 이름을 가져온다
    let queryData = url.parse(request.url, true).query;
    route(pathname, response, handle, queryData.productId);
  }

  http.createServer(onRequest).listen(8888); // 포트8888로 서버를 생성한다
}

exports.start = start;
