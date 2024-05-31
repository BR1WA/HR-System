import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Heading, Image, Select } from '@chakra-ui/react';
import { axiosInstance } from '../../axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
    const [chartType, setChartType] = useState('type');
    const [rawData, setRawData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/users');
            setRawData(response.data.map(user => ({ type: user.type, departement: user.departement, genre: user.genre, situation_familiale: user.situation_familiale })));
            console.log(rawData);
        } catch (error) {
            console.error('There was an error fetching the data', error);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

  const processData = (key) => {
    return rawData.reduce((acc, item) => {
      const value = item[key];
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {});
  };

  const roleCounts = processData(chartType);
  const labels = Object.keys(roleCounts);
  const data = Object.values(roleCounts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'User Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure only integer values are displayed
        },
      },
    },
  };

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

  return (
        <div className="p-3">
            <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col gap-3 items-center">
                    <Heading color='#0F4493' size="lg">Statistiques</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex flex-col gap-2 justify-center md:w-2/3 px-10">
                    <Bar data={chartData} options={options}/>
                    <Select placeholder='choisir une option' onChange={handleChange} value={chartType}>
                        <option value='type'>Utilisateurs par type</option>
                        <option value='departement'>Utilisateurs par departement</option>
                        <option value='genre'>Utilisateurs par genre</option>
                        <option value='situation_familiale'>Utilisateurs par situation familiale</option>
                    </Select>
                </div>
            </div>
        </div>
    );
}
export default Statistics
