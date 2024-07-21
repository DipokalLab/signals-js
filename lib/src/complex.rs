
pub mod complex {
    pub struct ComplexType {
        pub real: f64,
        pub imag: f64,
    }
    
    pub fn add(origin: &ComplexType, target: &ComplexType) -> ComplexType {
        let new_complex = ComplexType { 
            real: origin.real + target.real, 
            imag: origin.imag + target.imag 
        };

        return new_complex;
    }

    pub fn sub(origin: &ComplexType, target: &ComplexType) -> ComplexType {
        let new_complex = ComplexType { 
            real: origin.real - target.real, 
            imag: origin.imag - target.imag 
        };

        return new_complex;
    }

    pub fn mul(origin: &ComplexType, target: &ComplexType) -> ComplexType {
        let new_complex = ComplexType { 
            real: origin.real * target.real - origin.imag * target.imag, 
            imag: origin.real * target.imag + origin.imag * target.real
        };

        return new_complex;
    }

    pub fn cexp(origin: &ComplexType) -> ComplexType {
        let x = 2.71828182845904523536028747135266250_f64;
        let er = x.powf(origin.real);

        let new_complex = ComplexType { 
            real: er * f64::cos(origin.imag), 
            imag: er * f64::sin(origin.imag)
        };

        return new_complex;
    }
}