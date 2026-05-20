import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Heading, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Tbody, Tr, Td, Th, Thead, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Flex, Text, Badge, SimpleGrid, Stat, StatLabel, StatNumber, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import { FiMenu, FiChevronDown, FiUserCheck, FiUsers, FiLock, FiEdit2, FiTrash2, FiSearch, FiSliders } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [userId, setUserId] = useState();
  const toast = useToast();
  const [filter, setFilter] = useState('Tous');
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data.map(user => {
        const isArchived = user.is_archived;
        const archiveRaison = isArchived && user.archive ? user.archive.raison : null;
        return [
          user.nom,
          user.type,
          user.id,
          user.avatar,
          user.prenom,
          isArchived,
          archiveRaison,
          user.email
        ];
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        description: 'Impossible de récupérer les utilisateurs.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const archiveUser = async (uId) => {
    const raison = initialRef.current.value;
    try {
      await axiosInstance.post(`/archive/${uId}`, { raison });
      toast({
        description: "L'utilisateur a été archivé avec succès.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchData();
      onClose();
    } catch (error) {
      console.error('Error archiving user:', error);
      toast({
        description: "Une erreur s'est produite lors de l'archivage.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const viewProfile = (id) => {
    sessionStorage.setItem('id', id);
    navigate('/user');
  };

  const deleteUser = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        toast({
          description: "L'utilisateur a été supprimé.",
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const editUser = (id) => {
    sessionStorage.setItem('user', id);
    navigate('/stepper');
  };

  const totalTeachers = users.filter(u => u[1] === 'enseignant').length;
  const totalStaff = users.filter(u => u[1] === 'fonctionnaire').length;
  const totalArchived = users.filter(u => u[5] === 1 || u[5] === true).length;

  const renderUserTable = (userType) => {
    const filtered = users
      .filter(u => u[1] === userType)
      .filter(u => {
        if (filter === 'Archivés') return u[5] === 1 || u[5] === true;
        if (filter === 'Non Archivés') return !u[5];
        return true;
      })
      .filter(u => {
        const fullName = `${u[0]} ${u[4]}`.toLowerCase();
        const email = (u[7] || '').toLowerCase();
        return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
      });

    return (
      <Box overflowX="auto" mt={4}>
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th color="gray.500" fontWeight="bold">Personnel</Th>
              <Th color="gray.500" fontWeight="bold">Email</Th>
              <Th color="gray.500" fontWeight="bold">Statut</Th>
              <Th color="gray.500" fontWeight="bold" textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((user, index) => {
              const [nom, type, id, avatar, prenom, isArchived, archiveRaison, email] = user;
              return (
                <Tr key={id || index} _hover={{ bg: 'gray.50/50' }}>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Avatar size="sm" name={`${nom} ${prenom}`} src={avatar} />
                      <Box>
                        <Text fontWeight="bold" color="gray.700" cursor="pointer" _hover={{ color: 'blue.600' }} onClick={() => viewProfile(id)}>
                          {nom} {prenom}
                        </Text>
                        {isArchived && archiveRaison && (
                          <Text fontSize="2xs" color="red.500" fontWeight="semibold">
                            Motif: {archiveRaison}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {email || 'N/A'}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={isArchived ? 'red' : 'green'}
                      variant="subtle"
                      borderRadius="full"
                      px={2.5}
                      py={0.5}
                      fontSize="2xs"
                      fontWeight="bold"
                    >
                      {isArchived ? 'Archivé' : 'Actif'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex justify="flex-end">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<FiMenu />}
                          variant="ghost"
                          size="sm"
                          _hover={{ bg: 'gray.100' }}
                        />
                        <MenuList fontWeight="semibold" fontSize="sm">
                          <MenuItem icon={<FiUsers />} onClick={() => viewProfile(id)}>
                            Voir Profil
                          </MenuItem>
                          <MenuItem icon={<FiEdit2 />} onClick={() => editUser(id)}>
                            Modifier
                          </MenuItem>
                          {!isArchived ? (
                            <MenuItem icon={<FiLock />} onClick={() => { setUserId(id); onOpen(); }}>
                              Archiver
                            </MenuItem>
                          ) : null}
                          <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => deleteUser(id)}>
                            Supprimer
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
            {filtered.length === 0 && (
              <Tr>
                <Td colSpan={4} textAlign="center" py={10} color="gray.400">
                  Aucun membre du personnel trouvé
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <Sidebar>
      <Box px={4} py={2}>
        {/* Header */}
        <Box mb={8}>
          <Heading size="lg" color="#0a2540" fontWeight="extrabold">
            Gestion du Personnel
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Consulter, rechercher, modifier et archiver les membres du corps professoral et administratif.
          </Text>
        </Box>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="blue.50" p={3} borderRadius="xl">
                <Icon as={FiUserCheck} color="blue.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Enseignants</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="#0a2540">{totalTeachers}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="teal.50" p={3} borderRadius="xl">
                <Icon as={FiUsers} color="teal.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Fonctionnaires</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="#0a2540">{totalStaff}</StatNumber>
              </Stat>
            </Flex>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <Flex align="center" gap={4}>
              <Box bg="red.50" p={3} borderRadius="xl">
                <Icon as={FiLock} color="red.500" boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontWeight="bold" color="gray.500">Archivés</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="extrabold" color="red.600">{totalArchived}</StatNumber>
              </Stat>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Filter and Search Panel */}
        <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" mb={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {/* Search Input */}
            <Flex align="center" border="1px solid" borderColor="gray.200" px={3} py={1} borderRadius="xl" _focusWithin={{ borderColor: 'blue.500', boxShadow: 'sm' }}>
              <Icon as={FiSearch} color="gray.400" mr={2} />
              <Input
                variant="unstyled"
                placeholder="Rechercher par nom, prénom ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fontSize="sm"
                h={9}
              />
            </Flex>

            {/* Filter Toggle Buttons */}
            <Flex align="center" gap={2} justify={{ base: 'flex-start', md: 'flex-end' }}>
              <Icon as={FiSliders} color="gray.400" mr={1} display={{ base: 'none', sm: 'inline-block' }} />
              {['Tous', 'Non Archivés', 'Archivés'].map(f => (
                <Button
                  key={f}
                  size="sm"
                  borderRadius="lg"
                  onClick={() => setFilter(f)}
                  colorScheme={filter === f ? 'blue' : 'gray'}
                  variant={filter === f ? 'solid' : 'ghost'}
                  px={4}
                >
                  {f}
                </Button>
              ))}
            </Flex>
          </SimpleGrid>
        </Box>

        {/* Main Tabs for Enseignants & Fonctionnaires */}
        <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" p={6}>
          <Tabs variant="line" colorScheme="blue">
            <TabList mb="1em">
              <Tab fontWeight="bold" py={3}>Enseignants</Tab>
              <Tab fontWeight="bold" py={3}>Fonctionnaires</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0} pb={0}>
                {renderUserTable('enseignant')}
              </TabPanel>
              <TabPanel px={0} pb={0}>
                {renderUserTable('fonctionnaire')}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>

      {/* Archive Modal */}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl">
          <ModalHeader color="#0a2540" fontWeight="extrabold">Archiver le collaborateur</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Raison de l'archivage</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Indiquez le motif d'archivage (ex: Départ à la retraite, Mutation...)"
                borderRadius="xl"
                fontSize="sm"
                py={5}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="red" borderRadius="xl" px={6} onClick={() => archiveUser(userId)}>
              Archiver
            </Button>
            <Button onClick={onClose} borderRadius="xl" variant="outline">
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Sidebar>
  );
};

export default Users;