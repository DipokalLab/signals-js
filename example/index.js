const js = import("../lib/pkg/signals_js.js");
js.then((js) => {
  //   let a = js.ping("Hello world");
  //   let b = js.test("dsfc");
  //   let c = js.return_array(new Float64Array(100));

  let adfgv = new Float64Array(2 ** 14);
  for (let index = 0; index < 2 ** 14; index++) {
    adfgv[index] =
      Math.sin(index / 10) * 10 + Math.cos(index / 300) * Math.random() * 80;
  }

  console.time("FFT");
  let ff = js.fft(adfgv);
  console.timeEnd("FFT");

  const ctx = document.getElementById("myChart");
  const octx = document.getElementById("ORGmyChart");

  new Chart(octx, {
    type: "line",
    data: {
      labels: adfgv.map((item) => {
        return item;
      }),
      datasets: [
        {
          label: "# of Votes",
          data: adfgv,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ff.map((item) => {
        return item;
      }),
      datasets: [
        {
          label: "# of Votes",
          data: ff,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  //   console.log("PONG", a);
  //   console.log("SDFADDA", b);
  //   console.log("SFS", c);
});
