# signals-js

JavaScript WebAssembly 환경에서 동작하는 신호처리 함수 구현체 라이브리리 입니다. 신호처리에 유용한 함수 뿐 아니라 시각화 라이브러리 까지 구현할 계획입니다. 아래는 구현체 리스트 입니다.

성능 이슈로 인해 rust을 컴파일한 웹어셈블리로 개발되었습니다.

다른 구현체 필요하시면 이슈에 남겨주세요.

## To-Do

- [x] Radix 2 FFT
- [x] Inverse FFT
- [ ] Continuous Wavelet transform
- [ ] Gaussian filter
- [ ] Kalman filter
- [ ] Hamming Window Function for FFT
- [ ] Zero Padding
- [ ] Fast and Lightweight Line Graph
- [ ] Spectrogram View

## Reference

[Cooley-Tukey FFT Algorithms](https://people.scs.carleton.ca/~maheshwa/courses/5703COMP/16Fall/FFT_Report.pdf)
