import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AdoptionRescueGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Rescue', 'Adoption'],
          datasets: [
            {

              data,
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default AdoptionRescueGraph;
