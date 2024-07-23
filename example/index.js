const js = import("../lib/pkg/signals_js.js");
js.then((js) => {
  //   let a = js.ping("Hello world");
  //   let b = js.test("dsfc");
  //   let c = js.return_array(new Float64Array(100));

  let adfgv = new Float64Array(2 ** 12);
  for (let index = 0; index < 2 ** 12; index++) {
    adfgv[index] = Math.sin(index / 50) * 10;
  }

  console.time("FFT");
  let fft = js.fft(adfgv);
  console.timeEnd("FFT");

  const ctx = document.getElementById("myChart");
  const ictx = document.getElementById("imyChart");

  const octx = document.getElementById("ORGmyChart");

  new Chart(octx, {
    type: "line",
    data: {
      labels: adfgv.map((item) => {
        return item;
      }),
      datasets: [
        {
          label: "SIN",
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
      labels: fft.map((item) => {
        return item;
      }),
      datasets: [
        {
          label: "FFT",
          data: fft,
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

  let ifft = js.ifft(fft);

  new Chart(ictx, {
    type: "line",
    data: {
      labels: ifft.map((item) => {
        return item;
      }),
      datasets: [
        {
          label: "IFFT",
          data: ifft,
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
