import React from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading } from "@chakra-ui/react";
import _ from "lodash";

const LikelihoodRadarChart = ({ data }) => {
  // Group data by country using lodash
  const groupedData = _.groupBy(data, 'country');

  // Calculate the average likelihood for each country
  const aggregatedData = Object.keys(groupedData).map((country) => {
    const group = groupedData[country];
    const averageLikelihood = group.reduce((sum, entry) => sum + entry.likelihood, 0) / group.length;
    return { country, likelihood: Math.min(averageLikelihood, 10) }; // Limit to 100
  });

  const chartData = {
    labels: aggregatedData.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: aggregatedData.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(79, 59, 169, 0.7)",
          "rgba(144, 104, 190, 0.7)"
        ),
        borderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100, // Set the maximum value to 100
        stepSize: 20, // Adjust step size as needed
      },
    },
  };

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700} 
      overflow="hidden" 
    >
      <Heading as="h2" mb={4} ml={6}>
        Likelihood Chart
      </Heading>

      <Radar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default LikelihoodRadarChart;
