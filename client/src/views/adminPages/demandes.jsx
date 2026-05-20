import React, { useEffect, useState, useCallback } from 'react';
import { Heading, Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, useToast, Flex, Avatar, Text, SimpleGrid, Stat, StatLabel, StatNumber, Icon } from '@chakra-ui/react';
import { FiClock, FiCheckCircle, FiXCircle, FiPrinter, FiInbox } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import { axiosInstance } from '../../axios';

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const toast = useToast();

  const demandsMap = [
    { value: 'demande__vacance_annuelle', title: 'Congé Annuel' },
    { value: 'demande_quitter_territoire_national', title: 'Quitter le Territoire' },
    { value: 'demande_attestation_salaire', title: 'Attestation Salaire' },
    { value: 'demande_attestation_travail', title: 'Attestation de Travail' },
    { value: 'demande_attestation_travail_ar', title: 'Attestation Travail (AR)' },
    { value: 'demande_licence_exceptionnelle', title: 'Permis Exceptionnel' },
    { value: 'damande_absence', title: "Demande d'Absence" }
  ];

  const getFriendlyType = (val) => {
    const item = demandsMap.find(d => d.value === val);
    return item ? item.title : val;
  };

  const fetchDemandes = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/demandes');
      setDemandes(response.data);
    } catch (error) {
      console.error(error);
      toast({
        description: 'Impossible de récupérer les demandes.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchDemandes();
  }, [fetchDemandes]);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/demandes/${id}/status`, { status });
      toast({
        description: `La demande a été mise à jour en "${status}"`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchDemandes();
    } catch (error) {
      console.error(error);
      toast({
        description: 'Une erreur s\'est produite lors de la mise à jour.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const printCertificate = async (demandId) => {
    try {
      const response = await axiosInstance.get(`/demandes/${demandId}/generatePDF`);
      window.open(response.data, '_blank');
      fetchDemandes(); // Refreshes status (as generating PDF sets status to valider)
    } catch (error) {
      console.error(error);
      toast({
        description: 'Erreur lors de la génération du PDF.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const pendingCount = demandes.filter(d => d.traitement === 'en cours').length;
  const approvedCount = demandes.filter(d => d.traitement === 'valider').length;
  const rejectedCount = demandes.filter(d => d.traitement === 'rejeter').length;

  return (
    <Sidebar>
      <Box px={4} py={2}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg" color="#0a2540" fontWeight="extrabold">
              Inbox des Demandes
            </Heading>
            <Text color="gray.500" fontSize="sm" mt={1}>
              Gérer et valider les demandes de documents administratifs formulées par le personnel.
            </Text>
          </Box>
        </Flex>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="yellow.50" p={3} borderRadius="xl">
                <Icon as={FiClock} color="yellow.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">En cours</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="yellow.600">{pendingCount}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="green.50" p={3} borderRadius="xl">
                <Icon as={FiCheckCircle} color="green.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Validées</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="green.600">{approvedCount}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="red.50" p={3} borderRadius="xl">
                <Icon as={FiXCircle} color="red.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Rejetées</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="red.600">{rejectedCount}</StatNumber>
              </Stat>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Main Demands List */}
        <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
          {demandes.length === 0 ? (
            <Flex direction="column" align="center" py={16}>
              <Icon as={FiInbox} color="gray.300" boxSize={12} mb={4} />
              <Text color="gray.500" fontWeight="semibold">Aucune demande trouvée</Text>
            </Flex>
          ) : (
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th color="gray.500" fontWeight="bold">Demandeur</Th>
                  <Th color="gray.500" fontWeight="bold">Type de Demande</Th>
                  <Th color="gray.500" fontWeight="bold">Dates</Th>
                  <Th color="gray.500" fontWeight="bold">Statut</Th>
                  <Th color="gray.500" fontWeight="bold" textAlign="right">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {demandes.map((demande) => (
                  <Tr key={demande.id} _hover={{ bg: 'gray.50/50' }}>
                    <Td>
                      <Flex align="center" gap={3}>
                        <Avatar size="sm" name={`${demande.user?.nom} ${demande.user?.prenom}`} src={demande.user?.avatar} />
                        <Box>
                          <Text fontWeight="bold" color="gray.700">
                            {demande.user?.nom} {demande.user?.prenom}
                          </Text>
                          <Text fontSize="2xs" color="gray.400">
                            PPR: {demande.user?.ppr} | CIN: {demande.user?.cin}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle" px={2.5} py={1} borderRadius="lg" fontSize="xs" fontWeight="semibold">
                        {getFriendlyType(demande.type)}
                      </Badge>
                    </Td>
                    <Td>
                      {demande.date_debut ? (
                        <Text fontSize="xs" color="gray.600" fontWeight="medium">
                          Du {demande.date_debut} au {demande.date_fin}
                        </Text>
                      ) : (
                        <Text fontSize="xs" color="gray.400" fontStyle="italic">N/A</Text>
                      )}
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          demande.traitement === 'valider' ? 'green' :
                          demande.traitement === 'rejeter' ? 'red' : 'yellow'
                        }
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        fontSize="2xs"
                        fontWeight="bold"
                      >
                        {demande.traitement === 'valider' ? 'Validée' :
                         demande.traitement === 'rejeter' ? 'Rejetée' : 'En cours'}
                      </Badge>
                    </Td>
                    <Td>
                      <Flex justify="flex-end" gap={2}>
                        {demande.traitement === 'en cours' && (
                          <>
                            <Button
                              size="xs"
                              colorScheme="green"
                              leftIcon={<FiCheckCircle />}
                              onClick={() => updateStatus(demande.id, 'valider')}
                              borderRadius="lg"
                              px={3}
                            >
                              Valider
                            </Button>
                            <Button
                              size="xs"
                              colorScheme="red"
                              variant="outline"
                              leftIcon={<FiXCircle />}
                              onClick={() => updateStatus(demande.id, 'rejeter')}
                              borderRadius="lg"
                              px={3}
                            >
                              Rejeter
                            </Button>
                          </>
                        )}
                        <Button
                          size="xs"
                          colorScheme="facebook"
                          leftIcon={<FiPrinter />}
                          onClick={() => printCertificate(demande.id)}
                          borderRadius="lg"
                          px={3}
                        >
                          Imprimer PDF
                        </Button>
                      </Flex>
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

export default Demandes;
