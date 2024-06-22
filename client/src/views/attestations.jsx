import { Heading,Box,Image,Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast, Menu, MenuButton, MenuList, MenuItem, IconButton} from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../axios";
import { IoMdNotificationsOutline } from "react-icons/io";


const Attestations = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [certificate, setCertificate] = useState({});
    const currentYear = new Date().getFullYear();
    const toast = useToast();
    const [notifications, setNotifications] = useState({});
    const [showMore, setShowMore] = useState(false);
    const [type, setType] = useState(sessionStorage.getItem('type'));

    const demands = [
        { id: 1, title: 'Demande de congé annuel', description: 'Une demande présentée par l\'employé pour obtenir un congé annuel du travail.', value: 'demande__vacance_annuelle' },
        { id: 2, title: 'Demande de permis de quitter le territoire national', description: 'Une demande présentée par l\'employé pour obtenir un permis de quitter le territoire national pour une période déterminée.', value: 'demande_quitter_territoire_national' },
        { id: 3, title: 'Demande de attestation de salaire', description: 'Ce formulaire est utilisé pour demander un certificat prouvant le salaire perçu par l\'employé.', value: 'demande_attestation_salaire' },
        { id: 4, title: 'Demande de attestation de travail', description: 'Ce formulaire est utilisé pour demander un certificat prouvant l\'emploi actuel de l\'employé.', value: 'demande_attestation_travail' },
        { id: 5, title: 'Demande de permis exceptionnel', description: 'Cette demande est présentée pour obtenir un permis exceptionnel pour des affaires personnelles ou des circonstances particulières.', value: 'demande_licence_exceptionnelle' }
    ];

    // const months = [
    // { arabic: 'يناير', french: 'Janvier' },
    // { arabic: 'فبراير', french: 'Février' },
    // { arabic: 'مارس', french: 'Mars' },
    // { arabic: 'أبريل', french: 'Avril' },
    // { arabic: 'ماي', french: 'Mai' },
    // { arabic: 'يونيو', french: 'Juin' },
    // { arabic: 'يوليوز', french: 'Juillet' },
    // { arabic: 'غشت', french: 'Août' },
    // { arabic: 'شتنبر', french: 'Septembre' },
    // { arabic: 'أكتوبر', french: 'Octobre' },
    // { arabic: 'نونبر', french: 'Novembre' },
    // { arabic: 'دجنبر', french: 'Décembre' }
    // ];

    // const years = Array.from(new Array(42), (val, index) => currentYear - index);

    const handlePreview = (demandId) => {
        const pdfName = `${demandId}.pdf`;
        const pdfUrl = '/attestations/' + pdfName;
        window.open(pdfUrl, '_blank');
    };
    
    const demandCertificate = useCallback(async () => {
        try {
            const response = await axiosInstance.post('/demandes', {
                user_id: sessionStorage.getItem("id"),
                type: certificate.value,
                ...formData,
            });

            const newNotification = {
                id: response.data.id,
                user_id: sessionStorage.getItem("id"),
                type: certificate.value,
                traitement: 'en cour',
                ...formData,
            };

            setNotifications(prevNotifications => [newNotification, ...prevNotifications]);

            toast({
                description: 'La demande a été envoyée avec succès.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            console.error('There was an error sending the form!', error);
        } finally {
            onClose();
            setFormData({});
        }
    }, [certificate, formData, onClose]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const getUserDemandes = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/demandes/${sessionStorage.getItem('id')}`);
            setNotifications(response.data);
        } catch (error) {
            console.error('There was an error fetching the user demands!', error);
            toast({
                description: 'Une erreur s\'est produite lors de la récupération des demandes.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    useEffect(() => {
        getUserDemandes();
    }, []);

    const logOut = () => {
        sessionStorage.clear();
        window.location.reload();
    };
    
  return (
        <div className="p-3">
            <div className="flex justify-between items-center">
                <Box boxSize="100px" h="20">
                    <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
                </Box>
                <div className="flex gap-3">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<IoMdNotificationsOutline className="text-lg" />}
                            variant='outline'
                        />
                        <MenuList className="bg-white p-2 shadow-md overflow-y-scroll max-h-96">
                            <div className="space-y-2">
                                {Array.from(notifications).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .slice(0, 5)
                                    .map((notification) => (
                                        <MenuItem key={notification.id}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{demands.find((demand) => demand.value === notification.type)?.title}</span>
                                                <span className="text-xs text-gray-500">{notification.traitement}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                            </div>
                            {notifications.length > 5 && (
                                <Button mt={4}
                                    colorScheme="facebook"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowMore(!showMore)}
                                    className="w-full text-center"
                                >
                                    {showMore ? 'Afficher moins' : 'Afficher plus'}
                                </Button>
                            )}
                            {showMore && (
                                <div className="space-y-2 mt-2">
                                    {Array.from(notifications).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                        .slice(5)
                                        .map((notification) => (
                                            <MenuItem key={notification.id}>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{demands.find((demand) => demand.value === notification.type)?.title}</span>
                                                    <span className="text-xs text-gray-500">{notification.traitement}</span>
                                                </div>
                                            </MenuItem>
                                        ))}
                                </div>
                            )}
                        </MenuList>
                    </Menu>
                    <Button colorScheme="facebook" onClick={()=>logOut()}>Déconnecter</Button>

                </div>
            </div>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Choisissez une attestation !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex flex-col justify-center gap-5 sm:grid md:grid-cols-3 sm:grid-cols-2 ">
                        {demands.map((demand, index) => (
                            (type === 'enseignant' && index === 0) ? null : (
                                <div key={index} className="bg-slate-200 p-3 rounded-md flex flex-col gap-2">
                                    <Heading size="md" fontWeight="bold">{demand.title}</Heading>
                                    <Text>{demand.description}</Text>
                                    <div className="flex-grow"></div>
                                    <div className="mt-4 ">
                                        <Button marginRight="3" colorScheme='facebook' variant='outline' onClick={() => handlePreview(demand.id)}>Aperçu</Button>
                                        <Button colorScheme="facebook" onClick={()=>{onOpen();setCertificate(demand)}}>Demander</Button>
                                    </div>
                                </div>
                            )
                        ))}
                </div>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={()=>{onClose();setFormData({})}}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{certificate.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {certificate.id === 1 && (
                                <>
                                    <FormControl>
                                        <FormLabel>De</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date de début" name="date_debut" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>À</FormLabel>
                                        <Input type="date" placeholder="Date de fin" name="date_fin" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 2 && (
                                <>
                                    <FormControl>
                                        <FormLabel>de</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date debut" name="date_debut" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>à</FormLabel>
                                        <Input type="date" placeholder="Date fin" name="date_fin" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Destination</FormLabel>
                                        <Input placeholder="Destination" name="destination_torab_lwatani" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 3 && (
                                <>
                                    <FormControl>
                                        <FormLabel>De</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date de début" name="date_debut" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>À</FormLabel>
                                        <Input type="date" placeholder="Date de fin" name="date_fin" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 5 && (
                                <>
                                    <FormControl>
                                        <FormLabel>de</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date debut" name="date_debut" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>à</FormLabel>
                                        <Input type="date" placeholder="Date fin" name="date_fin" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Motif</FormLabel>
                                        <Input placeholder="Motif" name="raison" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='facebook' mr={3} onClick={()=>demandCertificate()}>
                                Confirmer
                            </Button>
                            <Button onClick={()=>{onClose();setFormData({})}}>Annuler</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
  )
}

export default Attestations
