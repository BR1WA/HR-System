import React, { useEffect, useState, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Heading, Select, SimpleGrid, Flex, Text, Card, CardBody, Icon, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { FiPieChart, FiBarChart2, FiSliders, FiUsers } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import { axiosInstance } from '../../axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [rawData, setRawData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('type');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/users');
      setRawData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateAgeDistribution = (data) => {
    const today = new Date();
    let older = 0;
    let younger = 0;

    data.forEach(user => {
      if (!user.date_naissance) return;
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
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1.5,
          borderRadius: 8
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
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1.5,
        borderRadius: 8
      }]
    };
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value || 'type');
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value || 'all');
  };

  const chartData = generateChartData(selectedOption, roleFilter);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { family: 'Inter, sans-serif', weight: 'bold' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: { family: 'Inter, sans-serif', weight: 'bold' }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0a2540',
        titleFont: { family: 'Inter, sans-serif', size: 13 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        padding: 10,
        borderRadius: 8
      }
    }
  };

  const maleCount = rawData.filter(u => u.genre === 'homme' || u.genre === 'Homme').length;
  const femaleCount = rawData.filter(u => u.genre === 'femme' || u.genre === 'Femme').length;

  return (
    <Sidebar>
      <Box px={4} py={2}>
        {/* Header */}
        <Box mb={8}>
          <Heading size="lg" color="#0a2540" fontWeight="extrabold">
            Statistiques & Analyses
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Visualiser les répartitions, grades et genres au sein du personnel universitaire.
          </Text>
        </Box>

        {/* Top metrics bar */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="blue.50" p={3} borderRadius="xl">
                <Icon as={FiUsers} color="blue.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Effectif Analysé</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="#0a2540">{rawData.length}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="teal.50" p={3} borderRadius="xl">
                <Icon as={FiPieChart} color="teal.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Hommes</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="#0a2540">{maleCount}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="pink.50" p={3} borderRadius="xl">
                <Icon as={FiPieChart} color="pink.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Femmes</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="#0a2540">{femaleCount}</StatNumber>
              </Stat>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Select Card */}
        <Card borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" mb={6}>
          <CardBody py={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Icon as={FiBarChart2} color="blue.500" />
                  <Text fontWeight="bold" color="gray.700" fontSize="sm">Dimension d'Analyse</Text>
                </Flex>
                <Select borderRadius="xl" onChange={handleOptionChange} value={selectedOption} fontSize="sm">
                  <option value="type">Répartition par Type (Enseignant vs Fonctionnaire)</option>
                  <option value="grade">Répartition par Grade</option>
                  <option value="departement">Répartition par Département</option>
                  <option value="genre">Répartition par Genre</option>
                  <option value="lieu_naissance">Répartition par Lieu de Naissance</option>
                  <option value="age">Répartition par Âge (Moins vs Plus de 40 ans)</option>
                </Select>
              </Box>

              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Icon as={FiSliders} color="teal.500" />
                  <Text fontWeight="bold" color="gray.700" fontSize="sm">Filtre Rapide</Text>
                </Flex>
                <Select borderRadius="xl" onChange={handleRoleChange} value={roleFilter} fontSize="sm">
                  <option value="all">Tous les profils</option>
                  <option value="enseignant">Enseignants uniquement</option>
                  <option value="fonctionnaire">Fonctionnaires uniquement</option>
                </Select>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Chart Card */}
        <Card borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
          <CardBody p={6}>
            <Box h="400px">
              <Bar data={chartData} options={options} />
            </Box>
          </CardBody>
        </Card>
      </Box>
    </Sidebar>
  );
};

export default Statistics;
