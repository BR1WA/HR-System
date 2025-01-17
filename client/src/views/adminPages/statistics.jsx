import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Button, Heading, Image, Select } from '@chakra-ui/react';
import { axiosInstance } from '../../axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [rawData, setRawData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('type');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setRawData(response.data);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateAgeDistribution = (data) => {
    const today = new Date();
    let older = 0;
    let younger = 0;

    data.forEach(user => {
      const birthDate = new Date(user.date_naissance);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 40) {
        older++;
      } else {
        younger++;
      }
    });

    return { older, younger };
  };

  const generateChartData = (option, role) => {
    const filteredData = role === 'all' ? rawData : rawData.filter(user => user.type === role);

    if (option === 'age') {
      const { older, younger } = calculateAgeDistribution(filteredData);
      return {
        labels: ['Plus de 40 ans', 'Moins de 40 ans'],
        datasets: [{
          data: [older, younger],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      };
    }

    const counts = filteredData.reduce((acc, user) => {
      const key = user[option];
      if (key) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const chartData = generateChartData(selectedOption, roleFilter);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between">
        <Box boxSize="100px" h="20">
          <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <Button colorScheme="facebook" onClick={logOut}>Déconnecter</Button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col gap-3 items-center">
          <Heading color='#0F4493' size="lg">Statistiques</Heading>
          <span className="bg-[#0F4493] w-20 h-0.5"></span>
        </div>
        <div className="flex flex-col gap-2 justify-center md:w-2/3 px-10">
          <Bar data={chartData} options={options}/>
          <div className='flex gap-10'>
            <Select placeholder='Choisir une option' onChange={handleOptionChange} value={selectedOption}>
              <option value='type'>Utilisateurs par type</option>
              <option value='grade'>Utilisateurs par grade</option>
              <option value='departement'>Utilisateurs par département</option>
              <option value='genre'>Utilisateurs par genre</option>
              <option value='lieu_naissance'>Utilisateurs par lieu de naissance</option>
              <option value='age'>Répartition par âge</option>
            </Select>
            <Select placeholder='Filtrer par rôle' onChange={handleRoleChange} value={roleFilter}>
              <option value='all'>Tous les utilisateurs</option>
              <option value='enseignant'>Enseignants</option>
              <option value='fonctionnaire'>Fonctionnaires</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
