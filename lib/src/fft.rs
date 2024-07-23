
pub mod fftMod {
    use crate::complex::{self, complex::ComplexType};

    pub fn fft(mut array: &Vec<ComplexType>) -> Vec<ComplexType> {
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
            let mut t = ComplexType {
                real: 0.0,
                imag: a * p
            };

            let mut mt = complex::complex::cexp(&t);
            let mut ft = complex::complex::mul(&odd_result[k], &mt);

            output[k] = complex::complex::add(&ft, &even_result[k]);
            output[k+half_n] = complex::complex::sub(&even_result[k], &ft );

            // let Wk = ComplexType {
            //     real: 1.0,
            //     imag: -2.0 * std::f64::consts::PI * (k as f64) / (n as f64)
            // };

            // let addWkOdd = complex::complex::mul(&Wk, &odd_result[k].clone());
            // let evenPlus: ComplexType = complex::complex::add(&even_result[k].clone(), &addWkOdd);
            // let evenMinus: ComplexType = complex::complex::sub(&even_result[k].clone(), &addWkOdd);

            // output[k] = evenPlus;
            // output[k+n/2] = evenMinus;
            k += 1;
        }


        return output;
    }
  }


