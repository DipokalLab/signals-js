use wasm_bindgen::prelude::*;
mod complex;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn ping(name: &str) -> String {
    log(&format!("Hello, {}!", name));
    //alert(&format!("Hello, {}!", name));


    return format!("Hello, {}!", name);
}

#[wasm_bindgen]
pub fn test(name: &str) -> String {
    log(&format!("Hello, {}!", name));
    //alert(&format!("Hello, {}!", name));

    let c1 = complex::complex::ComplexType {
        imag: 1,
        real: 3
    };

    let c2 = complex::complex::ComplexType {
        imag: 6,
        real: 6
    };

    let result = complex::complex::add(c1, c2);

    log(&result.imag.to_string());
    log(&result.real.to_string());

    return format!("Hello, {}!", name);
}