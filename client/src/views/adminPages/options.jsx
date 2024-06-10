import { Heading,Box,Image,Text, Menu, MenuButton, MenuList, MenuItem, useToast, IconButton, Button} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom"
import { axiosInstance } from "../../axios";
import { saveAs } from 'file-saver';

const Options = () => {
    const toast = useToast();
    const [notifications, setNotifications] = useState({});
    const [showMore, setShowMore] = useState(false);

    const demands = [
        { id: 1, title: 'Demande de congé annuel', description: 'Une demande présentée par l\'employé pour obtenir un congé annuel du travail.', value: 'demande__vacance_annuelle' },
        { id: 2, title: 'Demande de permis de quitter le territoire national', description: 'Une demande présentée par l\'employé pour obtenir un permis de quitter le territoire national pour une période déterminée.', value: 'demande_quitter_territoire_national' },
        { id: 3, title: 'Demande d\'attestation de salaire', description: 'Ce formulaire est utilisé pour demander un certificat prouvant le salaire perçu par l\'employé.', value: 'demande_attestation_salaire' },
        { id: 4, title: 'Demande de attestation de travail', description: 'Ce formulaire est utilisé pour demander un certificat prouvant l\'emploi actuel de l\'employé.', value: 'demande_attestation_travail' },
        { id: 5, title: 'Demande de permis exceptionnel', description: 'Cette demande est présentée pour obtenir un permis exceptionnel pour des affaires personnelles ou des circonstances particulières.', value: 'demande_licence_exceptionnelle' }
    ];
    
    const getUserDemandes = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/demandes`);
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

    const printCertificate = async (demandId) => {
        try {
            console.log('Printing certificate for demand ID:', demandId);
            const response = await axiosInstance.get(`/demandes/${demandId}/generatePDF`, {
                responseType: 'blob', // Important to receive the file as a blob
            });

            console.log('Received response from server:', response);

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'attestation.pdf');
            console.log('Saved PDF blob as "attestation.pdf"');
        } catch (error) {
            if (error.name === 'AxiosError' && error.code === 'ERR_NETWORK') {
                console.error('Network error occurred', error);
                toast({
                    description: 'Network error occurred',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    name: 'AxiosError',
                    code: 'ERR_NETWORK',
                });
            } else {
                console.error('There was an error fetching the user demands!', error);
                toast({
                    description: 'Une erreur s\'est produite lors de la récupération des demandes.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    }
    

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    useEffect(() => {
        getUserDemandes();
    }, []);

    const logOut = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    return(
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
                                            <div className="flex items-center gap-2 mr-2">
                                                <span className="text-sm font-medium">{notification.user.nom} {notification.user.prenom} :</span>
                                                <span className="text-sm font-medium">{demands.find((demand) => demand.value === notification.type)?.title}</span>
                                            </div>
                                            <Button colorScheme="facebook" size='xs' className="ml-auto" onClick={() => printCertificate(notification.id)}>Imprimer</Button>

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
                    <Heading color='#0F4493' size="lg">Choisissez une action !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex justify-center gap-14 w-full">
                    <Box as={Link} to="/addUser" onClick={sessionStorage.removeItem("user")} display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                    <img width="77" src="https://img.icons8.com/metro/100/ffffff/plus-math.png" alt="plus-math"/>
                    <Text fontSize="2xl" className="font-bold">AJOUTER</Text>    
                    </Box>
                    <Box as={Link} to="/users" display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                    <img width="77" src="https://img.icons8.com/ios-filled/100/ffffff/user.png" alt="user"/>
                        <Text fontSize="2xl" className="font-bold">CONSULTER</Text>
                    </Box>
                    <Box as={Link} to="/statistics" display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                        <img width="77" src="https://img.icons8.com/ios-filled/100/ffffff/bar-chart--v1.png" alt="bar-chart--v1"/>
                        <Text fontSize="2xl" className="font-bold">STATISTIQUES</Text>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Options