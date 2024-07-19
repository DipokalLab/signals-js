const js = import("../lib/pkg/signals_js.js");
js.then((js) => {
  let a = js.ping("Hello world");
  let b = js.test("dsfc");
  console.log("PONG", a);
  console.log("SDFADDA", b);
});
