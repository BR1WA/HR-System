import { Heading,Box,Image,Text  } from "@chakra-ui/react"
import React from "react"

const Home = ()=>{
    return(
        <div className="p-3">
        <Box boxSize="200px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col gap-4 items-center">
            <Heading color='#0F4493' size="lg">Vous êtes qui ?</Heading>
            <span className="bg-[#0F4493] w-20 h-0.5"></span>

            </div>
            <div className="flex justify-center gap-20 w-full">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" className="hover:bg-blue-800 cursor-pointer	">
                <img width="77" src="https://img.icons8.com/ios-glyphs/90/ffffff/administrator-male.png" alt="administrator-male"/>
                <Text fontSize="2xl" className="font-bold">ADMIN</Text >    
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="#0F4493" w="250px" h="250px" color="white" borderRadius="8" className="hover:bg-blue-800 cursor-pointer	">
                <img width="77" src="https://img.icons8.com/ios-filled/100/ffffff/user.png" alt="user"/>
                    <Text fontSize="2xl" className="font-bold">FONCTIONAIRE</Text >
                </Box>
            </div>
        </div>
        </div>
    )
}

export default Home