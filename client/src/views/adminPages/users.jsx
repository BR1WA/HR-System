import { Heading,Box,Image, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Tbody, Tr, Td, Tfoot, Th, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Thead, TableCaption} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../axios"
import { useEffect, useState, useRef, useCallback } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoMdNotificationsOutline } from "react-icons/io";


const Users = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);
    const [userId, setUserId] = useState();
    const toast = useToast();
    const [filter, setFilter] = useState("Tous");
    const [search, setSearch] = useState("");
    const [notifications, setNotifications] = useState({});
    const [showMore, setShowMore] = useState(false);
    const [toasted, setToasted] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

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
        }
    }, []);

    useEffect(() => {
        if (Array.isArray(notifications)) {
            const count = notifications.filter(notification => notification.traitement !== 'validé').length;
            setNotificationCount(count);
        }
    }, [notifications]);


    const printCertificate = async (demandId) => {
        try {
            console.log('Printing certificate for demand ID:', demandId);
            const response = await axiosInstance.get(`/demandes/${demandId}/generatePDF`);
            console.log('Received response from server:', response);
            window.open(response.data, '_blank');

            // Update the notifications state
            const updatedNotifications = notifications.map(notification => {
                if (notification.id === demandId) {
                    return { ...notification, traitement: 'validé' };
                }
                return notification;
            });
            setNotifications(updatedNotifications);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    useEffect(() => {
        getUserDemandes();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/users');
                console.log('Response:', response.data);
                setUsers(response.data.map(user => {
                    const isArchived = user.is_archived;
                    const archiveRaison = isArchived ? user.archive.raison : null;
                    
                    return [user.nom, user.type, user.id, user.avatar, user.prenom, isArchived, archiveRaison, user.date_recrutement];
                }));
                console.log(users);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        }
        fetchData();
    }, []);

      useEffect(() => {
    users.forEach(user => {
        const recruitmentDate = new Date(user[7]);
        const today = new Date();
        
        // Calculate the target anniversary dates
        const twoYearsAgo = new Date(today);
        twoYearsAgo.setFullYear(today.getFullYear() - 2);
        
        const fourYearsAgo = new Date(today);
        fourYearsAgo.setFullYear(today.getFullYear() - 4);
        
        const sixYearsAgo = new Date(today);
        sixYearsAgo.setFullYear(today.getFullYear() - 6);
        
        // Calculate the week before each anniversary date
        const oneWeekBeforeTwoYears = new Date(twoYearsAgo);
        oneWeekBeforeTwoYears.setDate(twoYearsAgo.getDate() - 7);
        
        const oneWeekBeforeFourYears = new Date(fourYearsAgo);
        oneWeekBeforeFourYears.setDate(fourYearsAgo.getDate() - 7);
        
        const oneWeekBeforeSixYears = new Date(sixYearsAgo);
        oneWeekBeforeSixYears.setDate(sixYearsAgo.getDate() - 7);
        
        // Check if the recruitment date falls within the target ranges
        if(!toasted){
            if (recruitmentDate >= oneWeekBeforeTwoYears && recruitmentDate <= twoYearsAgo) {
                toast({
                    description: `L'utilisateur ${user[0]} ${user[4]} atteindra bientôt 2 ans.`,
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                });
                setToasted(true);
            } else if (recruitmentDate >= oneWeekBeforeFourYears && recruitmentDate <= fourYearsAgo) {
                toast({
                    description: `L'utilisateur ${user[0]} ${user[4]} atteindra bientôt 4 ans.`,
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                });
                setToasted(true);
            } else if (recruitmentDate >= oneWeekBeforeSixYears && recruitmentDate <= sixYearsAgo) {
                toast({
                    description: `L'utilisateur ${user[0]} ${user[4]} atteindra bientôt 6 ans.`,
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                });
                setToasted(true);
            }
        }
    });
}, [users]);



    const archiveUser = async (userId) => {
    const raison = initialRef.current.value; 
        try {
        const response = await axiosInstance.post(`/archive/${userId}`, { raison });
        console.log(response.data);
        const updatedUsers = users.map(([nom, type, id, avatar, prenom, is_archived]) => {
            if (id === userId) {
                return [nom, type, id, avatar, prenom, true];
            }
            return [nom, type, id, avatar, prenom, is_archived];
        });
        setUsers(updatedUsers);
        toast({
            description: 'L\'Utilisateur a été archivé avec succès.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (error) {
        console.error('There was an error archiving the user!', error);
        }
    };

      const viewProfile = (id) => {
        sessionStorage.setItem("id",id);
        console.log(id);
        Navigate("/user")
      }

      const deleteUser = async (id) => {
        try {
            const response = await axiosInstance.delete(`/users/${id}`);
            console.log('Response:', response.data);
            fetchData();
        } catch (error) {
            console.error('There was an error deleting the user', error);
        }
      }

      const editUser = (id) => {
        sessionStorage.setItem('user', id);
        Navigate('/stepper');
      }
    const logOut = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    return(
        <>
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Archiver</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Raison</FormLabel>
                <Input ref={initialRef} placeholder="Raison d'archivage" />
                </FormControl>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme='facebook' mr={3} onClick={()=>archiveUser(userId)}>
                Archiver
                </Button>
                <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        <div className="p-3">
            <div className="flex justify-between items-center">
                <Box boxSize="100px" h="20">
                    <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
                </Box>
                <div className="flex gap-3">
                    <Menu>
                        <div className="relative">
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<IoMdNotificationsOutline className="text-lg" />}
                                variant='outline'
                            />
                            {notificationCount > 0 && (
                                <span className="absolute -left-1 -top-1 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">{notificationCount}</span>
                            )}
                        </div>
                        <MenuList className="bg-white p-2 shadow-md overflow-y-scroll max-h-96">
                            <div className="space-y-2">
                                {Array.from(notifications).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .slice(0, 5)
                                    .map((notification) => (
                                        <MenuItem key={notification.id}>
                                            <div className="flex items-center gap-2 mr-2">
                                                <span className="text-sm font-medium">{notification.user.nom} {notification.user.prenom} :</span>
                                                <span className="text-sm font-medium">{demands.find((demand) => demand.value === notification.type)?.title}</span>
                                            {notification.traitement === 'validé' ? (
                                                <span className="text-sm italic">Imprimé</span>
                                            ) : (
                                                <Button colorScheme="facebook" size='xs' className="ml-auto" onClick={() => printCertificate(notification.id)}>Imprimer</Button>
                                            )}
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
                                                <span className="text-sm font-medium">{notification.user.nom} {notification.user.prenom} :</span>
                                                <span className="text-sm font-medium">{demands.find((demand) => demand.value === notification.type)?.title}</span>
                                            {notification.traitement === 'validé' ? (
                                                <span className="text-sm italic">Imprimé</span>
                                            ) : (
                                                <Button colorScheme="facebook" size='xs' className="ml-auto" onClick={() => printCertificate(notification.id)}>Imprimer</Button>
                                            )}
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
                    <Heading color='#0F4493' size="lg">Personnel</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="w-2/3">
                    <Tabs isFitted variant='enclosed' fontWeight="bold">
                        <TabList mb='1em'>
                            <Tab>Enseignants</Tab>
                            <Tab>Fonctionnaires</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Table variant='simple'>
                                    <Tbody>
                                        <Thead className="flex justify-center w-full">
                                            <Th className="w-full">
                                                <div className="max-w-lg mx-auto">
                                                    <div className="flex">
                                                        <Menu>
                                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                                {filter}
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem onClick={() => setFilter("Archivés")}>Archivés</MenuItem>
                                                                <MenuItem onClick={() => setFilter("Tous")}>Tous</MenuItem>
                                                                <MenuItem onClick={() => setFilter("Non Archivés")}>Non Archivés</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                        <div className="relative w-full">
                                                            <input
                                                                type="text"
                                                                id="search-input"
                                                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                                placeholder="Rechercher..."
                                                                value={search}
                                                                onChange={(e) => setSearch(e.target.value)}
                                                            />
                                                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-800 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Th>
                                        </Thead>
                                        {users.filter(user=>user[1] == 'enseignant')
                                        .filter(user => {
                                            if (filter === 'Archivés') {
                                            return user[5] == 1; // Assuming `user[5]` is a boolean indicating if the user is archived
                                            } else if (filter === 'Non Archivés') {
                                            return user[5] == 0; // Assuming `user[5]` is a boolean indicating if the user is archived
                                            }
                                            return true; // By default, show all users if no filter is applied
                                        })
                                        .filter(user => {
                                        const fullName = `${user[0]} ${user[4]}`.toLowerCase();
                                        return fullName.includes(search.toLowerCase());
                                        }).map((user,index)=>(
                                            <Tr key={index} className="hover:bg-slate-100 flex justify-between">
                                                <Td className="flex items-center gap-4 cursor-pointer " onClick={()=>viewProfile(user[2])}><Avatar src={user[3]} />{user[0]} {user[4]} <span className="text-xs text-gray-500">{user[6]}</span></Td>
                                                <Td>
                                                    <Menu>
                                                        <MenuButton
                                                            as={IconButton}
                                                            aria-label='Options'
                                                            icon={<RxHamburgerMenu />}
                                                            variant='outline'
                                                        />
                                                        <MenuList fontWeight="semibold">
                                                            <MenuItem onClick={()=>viewProfile(user[2])}>
                                                                Voir Profile
                                                            </MenuItem>
                                                            <MenuItem onClick={()=>editUser(user[2])}>
                                                                Modifier
                                                            </MenuItem>
                                                            <MenuItem onClick={()=>{onOpen();setUserId(user[2])}}>
                                                                Archiver
                                                            </MenuItem>
                                                            <MenuItem color="tomato" onClick={()=>deleteUser(user[2])}>
                                                                Suprimer
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                            <Table variant='simple'>
                                    <Tbody>
                                        <Thead className="flex justify-center w-full">
                                            <Th className="w-full">
                                                <div className="max-w-lg mx-auto">
                                                    <div className="flex">
                                                        <Menu>
                                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                                {filter}
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem onClick={() => setFilter("Archivés")}>Archivés</MenuItem>
                                                                <MenuItem onClick={() => setFilter("Tous")}>Tous</MenuItem>
                                                                <MenuItem onClick={() => setFilter("Non Archivés")}>Non Archivés</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                        <div className="relative w-full">
                                                            <input
                                                                type="text"
                                                                id="search-input"
                                                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                                placeholder="Rechercher..."
                                                                value={search}
                                                                onChange={(e) => setSearch(e.target.value)}
                                                            />
                                                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-800 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Th>
                                        </Thead>
                                        {users.filter(user=>user[1] == 'fonctionnaire')
                                        .filter(user => {
                                            if (filter === 'Archivés') {
                                            return user[5] == 1; // Assuming `user[5]` is a boolean indicating if the user is archived
                                            } else if (filter === 'Non Archivés') {
                                            return user[5] == 0; // Assuming `user[5]` is a boolean indicating if the user is archived
                                            }
                                            return true; // By default, show all users if no filter is applied
                                        })
                                        .filter(user => {
                                        const fullName = `${user[0]} ${user[4]}`.toLowerCase();
                                        return fullName.includes(search.toLowerCase());
                                        }).map((user,index)=>(
                                            <Tr key={index} className="hover:bg-slate-100 flex justify-between">
                                                <Td className="flex items-center gap-4 cursor-pointer " onClick={()=>viewProfile(user[2])}><Avatar src={user[3]} />{user[0]} {user[4]}</Td>
                                                <Td>
                                                    <Menu>
                                                        <MenuButton
                                                            as={IconButton}
                                                            aria-label='Options'
                                                            icon={<RxHamburgerMenu />}
                                                            variant='outline'
                                                        />
                                                        <MenuList>
                                                            <MenuItem onClick={()=>viewProfile(user[2])}>
                                                                Voir Profile
                                                            </MenuItem>
                                                            <MenuItem>
                                                                Modifier
                                                            </MenuItem>
                                                            <MenuItem onClick={()=>{onOpen();setUserId(user[2])}}>
                                                                Archiver
                                                            </MenuItem>
                                                            <MenuItem color="tomato" onClick={()=>deleteUser(user[2])}>
                                                                Suprimer
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )
}

export default Users;