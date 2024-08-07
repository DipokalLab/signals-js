const js = import("../pkg/core.js");

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

  drawChart(
    "SIN",
    adfgv.map((item) => {
      return item;
    }),
    octx
  );

  drawChart(
    "FFT",
    fft.map((item) => {
      return item;
    }),
    ctx
  );

  let ifft = js.ifft(fft);

  drawChart(
    "IFFT",
    ifft.map((item) => {
      return item;
    }),
    ictx
  );

  //   console.log("PONG", a);
  //   console.log("SDFADDA", b);
  //   console.log("SFS", c);
});

function drawChart(label, list, ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: list,
      datasets: [
        {
          label: label,
          data: list,
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
}

const ctx = document.getElementById("CVS");

let l = [];
const d = new Chart(ctx, {
  type: "line",
  data: {
    labels: l,

    datasets: [
      {
        data: l,
        borderWidth: 1,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const fftctx = document.getElementById("fftCVS");

let fftl = [];
const fftd = new Chart(fftctx, {
  type: "line",
  data: {
    labels: fftl,

    datasets: [
      {
        data: fftl,
        borderWidth: 1,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function getFFT(arr) {
  const prm = new Promise((resolve, reject) => {
    js.then((js) => {
      resolve(js.fft(arr));
    });
  });

  return prm;
}

async function setupAudio() {
  js.then(async (js) => {
    const canvas = document.getElementById("oscilloscope");
    const canvasCtx = canvas.getContext("2d");

    // Get access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 1024;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      js.fft(dataArray).then((result) => {
        fftl = [];
        for (let index = 1; index < result.length / 2; index++) {
          fftl.push(result[index] - 128);
        }
        fftd.data.datasets[0].data = fftl;
        fftd.data.labels = fftl;
        fftd.update();
      });

      for (let index = 0; index < dataArray.length; index++) {
        l.push(dataArray[index] - 128);
        if (l.length > 2 ** 13) {
          l.shift();
        }
      }
      d.data.datasets[0].data = l;
      d.data.labels = l;
      d.update();
    }

    draw();
  });
}

setupAudio();
