import React, { useEffect, useState, useCallback } from 'react';
import { Heading, Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, Icon, Flex, Badge, Button, useToast, Table, Thead, Tbody, Tr, Th, Td, Avatar } from '@chakra-ui/react';
import { FiUsers, FiUserCheck, FiFileText, FiClock, FiPlusCircle, FiActivity, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { axiosInstance } from '../../axios';

const Options = () => {
  const [users, setUsers] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, demandesRes] = await Promise.all([
        axiosInstance.get('/users'),
        axiosInstance.get('/demandes')
      ]);
      setUsers(usersRes.data);
      setDemandes(demandesRes.data);
    } catch (error) {
      console.error(error);
      toast({
        description: 'Erreur lors du chargement des données du tableau de bord.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalEmployees = users.length;
  const totalEnseignants = users.filter(u => u.type === 'enseignant').length;
  const totalFonctionnaires = users.filter(u => u.type === 'fonctionnaire').length;
  const pendingDemandes = demandes.filter(d => d.traitement === 'en cours').length;

  const demandsMap = [
    { value: 'demande__vacance_annuelle', title: 'Congé Annuel' },
    { value: 'demande_quitter_territoire_national', title: 'Quitter le Territoire' },
    { value: 'demande_attestation_salaire', title: 'Attestation Salaire' },
    { value: 'demande_attestation_travail', title: 'Attestation de travail' },
    { value: 'demande_attestation_travail_ar', title: 'Attestation Travail (AR)' },
    { value: 'demande_licence_exceptionnelle', title: 'Permis Exceptionnel' },
    { value: 'damande_absence', title: "Demande d'Absence" }
  ];

  const getFriendlyType = (val) => {
    const item = demandsMap.find(d => d.value === val);
    return item ? item.title : val;
  };

  const quickActions = [
    {
      title: 'Ajouter Personnel',
      desc: 'Enregistrer un nouvel enseignant ou fonctionnaire avec le wizard stepper.',
      icon: FiPlusCircle,
      link: '/stepper',
      color: 'blue.500',
      bg: 'blue.50'
    },
    {
      title: 'Consulter Annuaire',
      desc: 'Rechercher, modifier, archiver et gérer les profils individuels.',
      icon: FiUsers,
      link: '/users',
      color: 'teal.500',
      bg: 'teal.50'
    },
    {
      title: 'Boîte de Réception',
      desc: `Traiter et imprimer les certificats administratifs (${pendingDemandes} en attente).`,
      icon: FiFileText,
      link: '/demandes',
      color: 'purple.500',
      bg: 'purple.50'
    }
  ];

  return (
    <Sidebar>
      <Box px={4} py={2}>
        {/* Page Header */}
        <Box mb={8}>
          <Heading size="lg" color="#0a2540" fontWeight="extrabold">
            Tableau de bord
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Bienvenue dans votre espace de gestion des ressources humaines.
          </Text>
        </Box>

        {/* Live Metrics Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={8}>
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex justify="space-between" align="center">
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500" fontSize="xs" uppercase>Effectif Total</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="extrabold" color="#0a2540" mt={1}>{totalEmployees}</StatNumber>
              </Stat>
              <Box bg="blue.50" p={3.5} borderRadius="2xl">
                <Icon as={FiUsers} color="blue.500" boxSize={6} />
              </Box>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex justify="space-between" align="center">
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500" fontSize="xs" uppercase>Enseignants</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="extrabold" color="#0a2540" mt={1}>{totalEnseignants}</StatNumber>
              </Stat>
              <Box bg="teal.50" p={3.5} borderRadius="2xl">
                <Icon as={FiUserCheck} color="teal.500" boxSize={6} />
              </Box>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex justify="space-between" align="center">
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500" fontSize="xs" uppercase>Fonctionnaires</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="extrabold" color="#0a2540" mt={1}>{totalFonctionnaires}</StatNumber>
              </Stat>
              <Box bg="orange.50" p={3.5} borderRadius="2xl">
                <Icon as={FiUserCheck} color="orange.400" boxSize={6} />
              </Box>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex justify="space-between" align="center">
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500" fontSize="xs" uppercase>Demandes en cours</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="extrabold" color="yellow.600" mt={1}>{pendingDemandes}</StatNumber>
              </Stat>
              <Box bg="yellow.50" p={3.5} borderRadius="2xl">
                <Icon as={FiClock} color="yellow.500" boxSize={6} />
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Quick Actions Grid */}
        <Heading size="md" color="#0a2540" fontWeight="bold" mb={5}>
          Actions Rapides
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          {quickActions.map((action, idx) => (
            <Box
              key={idx}
              as={Link}
              to={action.link}
              bg="white"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              shadow="sm"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'md',
                borderColor: action.color,
              }}
              cursor="pointer"
            >
              <Flex align="center" gap={4} mb={4}>
                <Box bg={action.bg} p={3} borderRadius="xl">
                  <Icon as={action.icon} color={action.color} boxSize={6} />
                </Box>
                <Text fontSize="lg" fontWeight="bold" color="#0a2540">
                  {action.title}
                </Text>
              </Flex>
              <Text color="gray.500" fontSize="sm" lineHeight="tall">
                {action.desc}
              </Text>
              <Flex align="center" color={action.color} fontWeight="bold" fontSize="xs" mt={4} gap={1}>
                Ouvrir <Icon as={FiArrowRight} />
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* Recent Demands Log Section */}
        <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
          <Flex justify="space-between" align="center" mb={6}>
            <Flex align="center" gap={2}>
              <Icon as={FiActivity} color="blue.500" boxSize={5} />
              <Heading size="md" color="#0a2540" fontWeight="bold">
                Demandes Récentes
              </Heading>
            </Flex>
            <Button as={Link} to="/demandes" size="sm" variant="ghost" colorScheme="blue" rightIcon={<FiArrowRight />}>
              Voir toutes
            </Button>
          </Flex>

          {demandes.length === 0 ? (
            <Text color="gray.400" fontSize="sm" fontStyle="italic" py={4}>
              Aucune demande enregistrée pour le moment.
            </Text>
          ) : (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th pl={0} color="gray.400">Demandeur</Th>
                  <Th color="gray.400">Type de Document</Th>
                  <Th color="gray.400">Statut</Th>
                </Tr>
              </Thead>
              <Tbody>
                {demandes.slice(0, 4).map((demande) => (
                  <Tr key={demande.id}>
                    <Td pl={0} py={3}>
                      <Flex align="center" gap={3}>
                        <Avatar size="xs" name={`${demande.user?.nom} ${demande.user?.prenom}`} src={demande.user?.avatar} />
                        <Text fontWeight="semibold" fontSize="xs" color="gray.700">
                          {demande.user?.nom} {demande.user?.prenom}
                        </Text>
                      </Flex>
                    </Td>
                    <Td py={3}>
                      <Text fontSize="xs" color="gray.600">
                        {getFriendlyType(demande.type)}
                      </Text>
                    </Td>
                    <Td py={3}>
                      <Badge
                        colorScheme={
                          demande.traitement === 'valider' ? 'green' :
                          demande.traitement === 'rejeter' ? 'red' : 'yellow'
                        }
                        variant="subtle"
                        fontSize="2xs"
                        px={2}
                        py={0.5}
                        borderRadius="md"
                      >
                        {demande.traitement === 'valider' ? 'Validée' :
                         demande.traitement === 'rejeter' ? 'Rejetée' : 'En cours'}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Sidebar>
  );
};

export default Options;