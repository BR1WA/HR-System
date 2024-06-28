import { Heading,Box,Image,Text, Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const UserOptions = () => {

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
        <Button colorScheme="facebook" onClick={()=>logOut()}>Déconnecter</Button>
      </div>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Choisissez une action !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex justify-center gap-14 w-full">
                    <Box as={Link} to="/profile" display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                    <img width="80" src="https://img.icons8.com/ios-filled/100/ffffff/user.png" alt="user"/>
                        <Text fontSize="2xl" className="font-bold">PROFILE</Text>
                    </Box>
                    <Box as={Link} to="/attestations" display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                        <img width="80" src="https://img.icons8.com/ios-filled/100/ffffff/contract.png" alt="contract"/>
                        <Text fontSize="2xl" className="font-bold text-center">DEMANDE D'ATTESTATIONS</Text>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default UserOptions