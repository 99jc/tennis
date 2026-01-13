function route(pathname, response, handle, productId) {
  console.log(`pathname = ${pathname}`); // 주소 터미널에 출력

  /* 강의에서는 typeof로 비교를 했으나 instanceof도 가능하다 */
  if (handle[pathname] instanceof Function) {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Not found.");
    response.end();
  }
}

exports.route = route;
