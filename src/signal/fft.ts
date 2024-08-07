import runtime from "../../pkg/core.js";

export class FFT {
  constructor() {}

  run(array: Float64Array) {
    return runtime.fft(array);
  }
}
