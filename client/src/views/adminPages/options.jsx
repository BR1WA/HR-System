import { Heading,Box,Image,Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Options = () => {
    return(
        <>
        <div className="p-3">
            <Box boxSize="200px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Choisissez une action !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex justify-center gap-20 w-full">
                    <Box as={Link} to="/addUser" onClick={sessionStorage.removeItem("user")} display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                    <img width="77" src="https://img.icons8.com/metro/100/ffffff/plus-math.png" alt="plus-math"/>
                    <Text fontSize="2xl" className="font-bold">AJOUTER</Text>    
                    </Box>
                    <Box as={Link} to="/users" display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" _hover={{ bg: 'blue.800' }} cursor="pointer" transition="background-color 0.2s">
                    <img width="77" src="https://img.icons8.com/ios-filled/100/ffffff/user.png" alt="user"/>
                        <Text fontSize="2xl" className="font-bold">CONSULTER</Text>
                    </Box>
                </div>
            </div>
        </div>
        </>
    )
}

export default Options