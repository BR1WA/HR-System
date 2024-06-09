import { Heading,Box,Image, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Tbody, Tr, Td, Tfoot, Th, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useToast, Thead, TableCaption} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../axios"
import { useEffect, useState, useRef } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { ChevronDownIcon } from '@chakra-ui/icons';


const Users = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);
    const [userId, setUserId] = useState();
    const toast = useToast();
    const [filter, setFilter] = useState("Tous");
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/users');
            console.log('Response:', response.data);
        setUsers(response.data.map(user => [user.nom, user.type, user.id, user.avatar, user.prenom,user.is_archived]));
        console.log(users);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

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
            <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
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
                                                <form className="max-w-lg mx-auto">
                                                    <div className="flex">
                                                        <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Your Email</label>
                                                    <Menu>
                                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                        {filter}
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => setFilter("Archivés")}>Archivés</MenuItem>
                                                        <MenuItem onClick={() => setFilter("Tous")}>Tous</MenuItem>
                                                        <MenuItem onClick={() => setFilter("Non Archivés")}>Non Archivés</MenuItem>
                                                        <MenuItem>Mark as Draft</MenuItem>
                                                        <MenuItem>Delete</MenuItem>
                                                        <MenuItem>Attend a Workshop</MenuItem>
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
                                                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                                <span className="sr-only">Search</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
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
                                                <Td className="flex items-center gap-4 cursor-pointer " onClick={()=>viewProfile(user[2])}><Avatar src={user[3]} />{user[0]} {user[4]}</Td>
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
                                    <Tfoot>
                                    <Tr>
                                        <Th>Afficher Plus...</Th>
                                    </Tr>
                                    </Tfoot>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                            <Table variant='simple'>
                                    <Tbody>
                                        {users.filter(user=>user[1] == 'fonctionnaire').map((user,index)=>(
                                            
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
                                    <Tfoot>
                                    <Tr>
                                        <Th>Afficher Plus...</Th>
                                    </Tr>
                                    </Tfoot>
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

export default Users