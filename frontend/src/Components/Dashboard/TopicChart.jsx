import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const TopicsPolarAreaChart = ({ data }) => {
  // Aggregate data for unique topics
  const aggregatedData = data.reduce((result, item) => {
    const existingItem = result.find((x) => x.topic === item.topic);

    if (existingItem) {
      existingItem.relevance += item.relevance;
    } else {
      result.push({ topic: item.topic, relevance: item.relevance });
    }

    return result;
  }, []);

  // Limit relevance values to 500% and group the rest as "Other"
  const maxRelevance = 10;
  const totalRelevance = aggregatedData.reduce((acc, item) => {
    if (item.relevance <= maxRelevance) {
      return acc + item.relevance;
    } else {
      return acc;
    }
  }, 0);

  const otherRelevance = aggregatedData.reduce((acc, item) => {
    if (item.relevance > maxRelevance) {
      return acc + item.relevance - maxRelevance;
    } else {
      return acc;
    }
  }, 0);

  if (otherRelevance > 0) {
    aggregatedData.push({ topic: 'Other', relevance: otherRelevance });
  }

  const chartData = {
    labels: aggregatedData.map(item => item.topic),
    datasets: [
      {
        data: aggregatedData.map(item => (item.relevance <= maxRelevance ? item.relevance : maxRelevance)),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
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
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalRelevance) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Topics Chart
      </Heading>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TopicsPolarAreaChart;
