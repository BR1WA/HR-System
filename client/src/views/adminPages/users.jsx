import { Heading,Box,Image, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Tbody, Tr, Td, Tfoot, Th, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../axios"
import { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";


const Users = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/users');
            console.log('Response:', response.data);
            setUsers(response.data.map(user => [user.nom,user.type,user.id,user.avatar,user.prenom]));
        console.log(users);
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

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
        <div className="p-3">
            <Box boxSize="200px" h="20">
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
                                        {users.filter(user=>user[1] == 'enseignant').map((user,index)=>(
                                            
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
                                                            <MenuItem onClick={()=>editUser(user[2])}>
                                                                Modifier
                                                            </MenuItem>
                                                            <MenuItem>
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
                                                <Td className="flex items-center gap-4 cursor-pointer " onClick={()=>viewProfile(user[2])}><Avatar src={user[3]} />{user[0]}</Td>
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
                                                            <MenuItem>
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