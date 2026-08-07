import React, { useEffect, useRef } from 'react';
import { Box, Flex, Icon, Link, Text, Divider, Button, Avatar, IconButton, Drawer, DrawerContent, DrawerOverlay, useDisclosure, Image, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiBarChart2, FiLogOut, FiMenu, FiPlusCircle } from 'react-icons/fi';
import { axiosInstance } from '../axios';

const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Tableau de bord', icon: FiHome, path: '/options' },
    { name: 'Personnel', icon: FiUsers, path: '/users' },
    { name: 'Demandes Inbox', icon: FiFileText, path: '/demandes' },
    { name: 'Statistiques', icon: FiBarChart2, path: '/statistics' },
    { name: 'Ajouter Utilisateur', icon: FiPlusCircle, path: '/stepper' },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Box
      transition="3s ease"
      bg="linear-gradient(180deg, #0a2540 0%, #071e33 100%)"
      borderRight="1px solid"
      borderRightColor="rgba(255,255,255,0.08)"
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}
    >
      <Flex direction="column" align="center" justify="center" w="full" py={5} px={4} gap={3}>
        <Box bg="white" p={2.5} borderRadius="2xl" shadow="0 4px 20px rgba(0,0,0,0.25)" display="inline-flex" alignItems="center" justifyContent="center">
          <Image 
            src="/1200px-Université_Abdelmalek_Essaâdi.png" 
            alt="Université Abdelmalek Essaâdi" 
            maxW="110px" 
            objectFit="contain"
          />
        </Box>
        <Text fontSize="2xs" fontWeight="extrabold" color="blue.300" letterSpacing="widest" textAlign="center" lineHeight="short">
          UNIVERSITÉ ABDELMALEK ESSAÂDI
        </Text>
      </Flex>
      <Box px="4">
        <Divider opacity={0.15} mb={6} />
      </Box>
      <Flex direction="column" justify="space-between" h="calc(100vh - 170px)" px="4" pb="6">
        <Flex direction="column" gap={2}>
          {navItems.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                as={RouterLink}
                to={link.path}
                key={link.name}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex
                  align="center"
                  p="3.5"
                  mx="2"
                  borderRadius="xl"
                  role="group"
                  cursor="pointer"
                  transition="all 0.3s"
                  bg={isActive ? 'blue.600' : 'transparent'}
                  color={isActive ? 'white' : 'gray.400'}
                  _hover={{
                    bg: isActive ? 'blue.600' : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    transform: 'translateX(4px)',
                  }}
                  fontWeight="semibold"
                  fontSize="sm"
                  shadow={isActive ? '0 4px 12px rgba(49, 130, 206, 0.3)' : 'none'}
                >
                  <Icon
                    mr="4"
                    fontSize="18"
                    as={link.icon}
                    color={isActive ? 'white' : 'gray.400'}
                    _groupHover={{
                      color: 'white',
                    }}
                  />
                  {link.name}
                </Flex>
              </Link>
            );
          })}
        </Flex>
        
        <Box>
          <Divider opacity={0.15} my={4} />
          <Flex align="center" gap={3} px="4" mb={6}>
            <Avatar size="sm" name="Administrateur" bg="blue.500" src="" />
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="white">
                Admin
              </Text>
              <Text fontSize="2xs" color="gray.500">
                simomi2015@gmail.com
              </Text>
            </Box>
          </Flex>
          <Button
            w="full"
            variant="ghost"
            colorScheme="red"
            color="red.300"
            _hover={{ bg: 'rgba(229, 62, 62, 0.1)', color: 'red.200' }}
            leftIcon={<FiLogOut />}
            onClick={handleLogout}
            justifyContent="flex-start"
            borderRadius="xl"
            pl="6"
          >
            Déconnecter
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const prevCountRef = useRef(null);

  useEffect(() => {
    const userType = sessionStorage.getItem('type');
    if (userType !== 'admin') return;

    const pollDemandes = async () => {
      try {
        const response = await axiosInstance.get('/demandes');
        // Filter pending demands
        const pendingDemandes = response.data.filter(d => d.traitement === 'en cours');
        const currentCount = pendingDemandes.length;

        if (prevCountRef.current !== null && currentCount > prevCountRef.current) {
          const latest = pendingDemandes[pendingDemandes.length - 1];
          if (latest) {
            const employeeName = latest.user ? `${latest.user.prenom} ${latest.user.nom}` : 'Un employé';
            const labelMap = {
              'demande_vacance_annuelle': 'Congé annuel',
              'demande_quitter_territoire_national': 'Quitter le territoire',
              'demande_attestation_salaire': 'Attestation de salaire',
              'demande_attestation_travail': 'Attestation de travail',
              'demande_licence_exceptionnelle': 'Permis exceptionnel'
            };
            const typeLabel = labelMap[latest.type] || latest.type;

            toast({
              title: 'Nouvelle demande reçue !',
              description: `${employeeName} a soumis une demande pour : ${typeLabel}.`,
              status: 'info',
              duration: 8000,
              isClosable: true,
              position: 'top-right',
              variant: 'solid'
            });
          }
        }
        prevCountRef.current = currentCount;
      } catch (err) {
        console.error('Error polling notifications:', err);
      }
    };

    pollDemandes();
    const interval = setInterval(pollDemandes, 8000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <Box minH="100vh" bg="#f4f6f8">
      {/* Sidebar for Desktop */}
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      
      {/* Mobile Nav Header */}
      <Flex
        display={{ base: 'flex', md: 'none' }}
        ml={{ base: 0, md: 64 }}
        px={{ base: 4, md: 24 }}
        height="20"
        alignItems="center"
        bg="#0a2540"
        borderBottomWidth="1px"
        borderBottomColor="rgba(255,255,255,0.08)"
        justifyContent="space-between"
        color="white"
      >
        <IconButton variant="ghost" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} color="white" _hover={{ bg: 'rgba(255,255,255,0.1)' }} />
        <Flex align="center" gap={2}>
          <Box bg="white" p={1} borderRadius="lg" display="inline-flex" align="center" justify="center">
            <Image 
              src="/1200px-Université_Abdelmalek_Essaâdi.png" 
              alt="Université Abdelmalek Essaâdi" 
              maxH="32px"
              objectFit="contain"
            />
          </Box>
          <Text fontSize="xs" fontWeight="extrabold" color="blue.300" letterSpacing="widest">UAE HR PORTAL</Text>
        </Flex>
        <Box w={8} />
      </Flex>

      {/* Drawer for Mobile */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Page Content wrapper */}
      <Box ml={{ base: 0, md: 64 }} p="6" transition="0.3s ease">
        {children}
      </Box>
    </Box>
  );
}
