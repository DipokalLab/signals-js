
pub mod complex {
    pub struct ComplexType {
        pub real: u128,
        pub imag: u128,
    }
    
    pub fn add(origin: ComplexType, target: ComplexType) -> ComplexType {
        let new_complex = ComplexType { 
            real: origin.real + target.real, 
            imag: origin.imag + target.imag 
        };

        return new_complex;
    }

    pub fn sub(origin: ComplexType, target: ComplexType) -> ComplexType {
        let new_complex = ComplexType { 
            real: origin.real - target.real, 
            imag: origin.imag - target.imag 
        };

        return new_complex;
    }
}