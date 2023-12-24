import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Heading } from '@chakra-ui/react';
import _ from 'lodash';

const IntensityChart = ({ data }) => {
  const intensityData = data.map(item => item.intensity);

  const getColor = (value) => {
    const colors = [
      '#7F00FF', // Green
      '#F2B93B', // Yellow
      '#FF8000', // Orange
      '#FF453A', // Red
    ];

    const threshold = Math.max(...intensityData) / 4;
    if (value < threshold) {
      return colors[0];
    } else if (value < threshold * 2) {
      return colors[1];
    } else if (value < threshold * 3) {
      return colors[2];
    } else {
      return colors[3];
    }
  };

  // Filtering data to remove entries without a year
  const filteredData = data.filter(item => item.start_year);

  // Aggregating data using lodash, extracting unique years, and sorting them
  const uniqueYears = _.uniq(filteredData.map(item => item.start_year)).sort();
  const aggregatedData = uniqueYears.map(year => {
    const group = filteredData.filter(item => item.start_year === year);
    const averageIntensity = group.reduce((sum, item) => sum + item.intensity, 0) / group.length;
    return { startYear: year, intensity: Math.min(averageIntensity, 500) }; // Cap at 500%
  });

  const chartData = {
    labels: aggregatedData.map(item => item.startYear),
    datasets: [
      {
        label: 'Intensity',
        backgroundColor: aggregatedData.map(item => getColor(item.intensity)),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: aggregatedData.map(item => item.intensity),
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        offset: -20,
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => Math.min(value, 500).toFixed(2) + '%', // Cap at 500%
        shadowBlur: 10,
        shadowColor: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
          callback: (value) => Math.min(value, 500).toFixed(2) + '%', // Cap at 500%
        },
      },
    },
    animation: {
      duration: 4000,
      easing: 'easeInOutQuart',
      mode: 'progressive',
    },
  };

  return (
    <div style={{ margin: '50px', padding: '10px', fontFamily: 'Arial, sans-serif', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Heading as="h2" mb={4}>
        Intensity Chart
      </Heading>
      <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default IntensityChart;
