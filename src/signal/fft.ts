import * as wasmModule from "../../pkg/core";

export class FFT {
  constructor() {}

  run(array: Float64Array, callback: any) {
    const result = wasmModule.fft(array);
    callback(result);
  }
}
