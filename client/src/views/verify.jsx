import { useState } from 'react';
import { Heading, Box, Image, Input, Button, useToast, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios';

const Verify = () => {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setIsValid(/^\d{6}$/.test(newCode));
    setIsTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isValid && isTouched && code) {
      try {
        const response = await axiosInstance.post('/verify-email', { email, otp: code });
        if (response.data.success) {
          sessionStorage.setItem('id', response.data.data.user.id);
          sessionStorage.setItem('type', response.data.data.user.type);
          sessionStorage.setItem('token', response.data.data.token);
          
          toast({
            title: 'Authentification réussie',
            description: 'Bienvenue sur votre portail RH.',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });

          response.data.data.user.role === 'admin' ? navigate('/options') : navigate('/userOptions');
        } else {
          toast({
            title: 'Erreur',
            description: response.data.message || 'Code de vérification invalide.',
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: 'top',
          });
        }
      } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
        console.error('API Error:', error);
        toast({
          title: 'Code invalide',
          description: typeof errorMessage === 'string' ? errorMessage : 'Code de vérification invalide.',
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="linear-gradient(135deg, #0a2540 0%, #071e33 100%)"
      p={4}
      position="relative"
      overflow="hidden"
    >
      {/* Background Decorative Blobs */}
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="40vw"
        h="40vw"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(49, 130, 206, 0.15) 0%, rgba(0,0,0,0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="-10%"
        w="50vw"
        h="50vw"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(75, 192, 192, 0.12) 0%, rgba(0,0,0,0) 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      {/* Main Glass Card */}
      <Box
        maxW="md"
        w="full"
        bg="rgba(255, 255, 255, 0.03)"
        backdropFilter="blur(16px)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="3xl"
        p={{ base: 6, md: 10 }}
        shadow="2xl"
        textAlign="center"
        zIndex={1}
      >
        {/* University Logo Box */}
        <Flex justify="center" mb={6}>
          <Box
            bg="white"
            p={3.5}
            borderRadius="2xl"
            shadow="0 8px 30px rgba(0, 0, 0, 0.3)"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Image
              src="/1200px-Université_Abdelmalek_Essaâdi.png"
              alt="Université Abdelmalek Essaâdi Logo"
              maxW="140px"
              objectFit="contain"
            />
          </Box>
        </Flex>

        <Heading size="lg" color="white" fontWeight="extrabold" mb={1} letterSpacing="wide">
          Vérification OTP
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={8} fontWeight="medium">
          Saisissez le code de 6 chiffres envoyé à votre boîte de messagerie
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={5}>
            <Box textAlign="left">
              <Input
                variant="filled"
                type="text"
                placeholder="code de 6 chiffres"
                size="lg"
                borderRadius="xl"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="white"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                _focus={{
                  bg: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px #3182ce',
                }}
                _placeholder={{ color: 'gray.500' }}
                isInvalid={!isValid && isTouched}
                value={code}
                onChange={handleChange}
                h="12"
                textAlign="center"
                fontSize="xl"
                letterSpacing="4px"
              />
              {!isValid && isTouched && (
                <Text color="red.300" fontSize="xs" mt={1.5} pl={1} fontWeight="semibold" textAlign="center">
                  Veuillez entrer un code à 6 chiffres valide.
                </Text>
              )}
            </Box>

            <Button
              colorScheme="blue"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600', shadow: '0 0 15px rgba(66, 153, 225, 0.4)' }}
              _active={{ bg: 'blue.700' }}
              type="submit"
              isLoading={isLoading}
              isDisabled={!isValid}
              size="lg"
              borderRadius="xl"
              h="12"
              fontWeight="bold"
              shadow="md"
              transition="all 0.2s"
            >
              Se Connecter
            </Button>
          </Flex>
        </form>

        <Text color="gray.600" fontSize="xs" mt={8} fontWeight="semibold">
          © {new Date().getFullYear()} Université Abdelmalek Essaâdi. Tous droits réservés.
        </Text>
      </Box>
    </Flex>
  );
};

export default Verify;
