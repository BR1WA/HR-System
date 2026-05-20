import React from 'react';
import { Box, Flex, Icon, Link, Text, Divider, Button, Avatar, IconButton, Drawer, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiBarChart2, FiLogOut, FiMenu, FiPlusCircle } from 'react-icons/fi';

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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center" gap={3}>
          <Box bg="blue.500" p={2} borderRadius="lg" shadow="0 0 15px #3182ce">
            <FiUsers size={20} color="white" />
          </Box>
          <Text fontSize="xl" fontWeight="extrabold" letterSpacing="widest" bgGradient="linear(to-r, blue.300, teal.300)" bgClip="text">
            HR PORTAL
          </Text>
        </Flex>
      </Flex>
      <Box px="4">
        <Divider opacity={0.15} mb={6} />
      </Box>
      <Flex direction="column" justify="space-between" h="calc(100vh - 120px)" px="4" pb="6">
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
        <Text fontSize="lg" fontWeight="extrabold" bgGradient="linear(to-r, blue.300, teal.300)" bgClip="text">
          HR PORTAL
        </Text>
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
