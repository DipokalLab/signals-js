import { Spectrogram } from "./node_modules/signals-js/index.js";
import { FFT } from "./node_modules/signals-js/index.js";

const fftclass = new FFT();

console.log(fftclass.run());
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

const graph = new Spectrogram(ctx);
graph.initSize(canvas.width, canvas.height);

let fftArray = new Float64Array(2 ** 12);

console.log("SS", canvas.width);
