
pub mod fft_mod {
    use crate::complex::{self, complex::ComplexType};

    pub fn ifft(array: &Vec<ComplexType>) -> Vec<ComplexType> {
        let n: usize = array.len();

        let mut data: Vec<ComplexType> = Vec::new();
        
        for (index, value) in array.iter().enumerate() {
            data.push(ComplexType {
                real: array[index].real,
                imag: -array[index].imag
            });
        }

        let fft_result = fft(&data);

        let mut fft_data: Vec<ComplexType> = Vec::new();
        
        for (index, value) in array.iter().enumerate() {
            fft_data.push(ComplexType {
                real: fft_result[index].real * (1/n) as f64,
                imag: -fft_result[index].imag * (1/n) as f64
            });
        }

        return fft_result;
    }

    pub fn fft(array: &Vec<ComplexType>) -> Vec<ComplexType> {
        let n: usize = array.len();

        if n == 1 {
            return array.to_vec(); 
        }

        let half_n: usize = n/2;

        let mut even: Vec<ComplexType> =  Vec::new();
        let mut odd: Vec<ComplexType> =  Vec::new();
        let mut output: Vec<ComplexType> = vec![ComplexType {
            real: 0.0,
            imag: 0.0
        }; n];

        let mut index = 0;
 
        for value in array {
            if index % 2 == 0 {
                even.push(ComplexType {
                    real: value.real,
                    imag: 0.0
                });
            } else {
                odd.push(ComplexType {
                    real: value.real,
                    imag: 0.0
                });
            }

            index += 1;
        }

        let even_result = fft(&even.clone());
        let odd_result = fft(&odd.clone());

        let mut k: usize = 0;

        let a = -2.0 * std::f64::consts::PI;

        while k < half_n {
            let p = k as f64 / n as f64;
            let t = ComplexType {
                real: 0.0,
                imag: a * p
            };

            let mt = complex::complex::cexp(&t);
            let ft = complex::complex::mul(&odd_result[k], &mt);

            output[k] = complex::complex::add(&ft, &even_result[k]);
            output[k+half_n] = complex::complex::sub(&even_result[k], &ft );

            k += 1;
        }


        return output;
    }
  }


