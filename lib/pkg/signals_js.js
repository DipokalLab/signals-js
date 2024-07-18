import * as wasm from "./signals_js_bg.wasm";
import { __wbg_set_wasm } from "./signals_js_bg.js";
__wbg_set_wasm(wasm);
export * from "./signals_js_bg.js";
