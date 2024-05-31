import { Heading,Box,Image,Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Attestations = () => {
  return (
        <div className="p-3">
            <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Choisissez une attestation !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex justify-center gap-14 w-full">

                </div>
            </div>
        </div>
  )
}

export default Attestations
