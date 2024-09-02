import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FFT, RealtimeChart } from "../../dist/index.es";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph({ data, title = "" }: { data: number[]; title?: string }) {
  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const [graphData, setGraphData] = useState({
    labels: data.map(() => ""),
    datasets: [
      {
        label: "X",
        data: data.map((item) => item),
        borderColor: "#2e82ff",
        backgroundColor: "#2e82ff",
      },
    ],
  });

  useEffect(() => {
    setGraphData({
      labels: data.map(() => ""),
      datasets: [
        {
          label: "X",
          data: data.map((item) => item),
          borderColor: "#2e82ff",
          backgroundColor: "#2e82ff",
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Line options={options} data={graphData} />
    </div>
  );
}

function App() {
  const [originArray, setOriginArray] = useState<number[]>([]);
  const [fftArray, setFFTArray] = useState<number[]>([]);
  const canvasRef: any = useRef();

  useEffect(() => {
    let fftArray = new Float64Array(2 ** 12);
    for (let index = 0; index < 2 ** 12; index++) {
      fftArray[index] = Math.sin(index / 50) * 10 + Math.sin(index / 10) * 10;
    }

    setOriginArray([].slice.call(fftArray));

    const asd = new FFT();
    let arrayFFT = [];

    asd.run(fftArray, (el) => {
      console.log(fftArray, el);
      arrayFFT = [].slice.call(el);
      setFFTArray([].slice.call(el));
    });

    const ctx = canvasRef.current.getContext("2d");
    const chart = new RealtimeChart(ctx);

    chart.init(600, 400);

    chart.draw(arrayFFT);
  }, []);

  return (
    <>
      <LineGraph data={originArray}></LineGraph>
      <LineGraph data={fftArray}></LineGraph>

      <canvas ref={canvasRef} width={600} height={400}></canvas>
    </>
  );
}

export default App;
