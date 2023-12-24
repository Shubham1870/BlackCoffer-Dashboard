import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

const CountryChart = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState("United States of America");
  const [chartData, setChartData] = useState(null);
  const chartBackgroundColor = useColorModeValue("rgba(79, 59, 169, 0.7)", "rgba(144, 104, 190, 0.7)");

  useEffect(() => {
    const countryData = data.filter(entry => entry.country === selectedCountry);

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map((sector) => sectors[sector]);

    setChartData({
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
  }, [selectedCountry, data, chartBackgroundColor]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
       x: {
        
         stacked: true,
       },
       y: {
         
         stacked: true,
         grid: {
           color: "gray.200",
         },
         padding: { 
           
         },
       },
    },
   };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box p={6} shadow="md" bg={useColorModeValue("white", "gray.800")} m={50}>
      <Flex direction="column" margin={'auto'}>
        <Heading as="h2" mb={4}>
          Country Chart
        </Heading>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          mb={4}
          w="200px"
          colorScheme="purple"
        >
          <option value="United States of America">United States of America</option>
          <option value="Mexico">Mexico</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Russia">Russia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
        </Select>
        <Box height="500px" width="100%">
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountryChart;
