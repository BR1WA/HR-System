import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step2 = ({setStep,formData, setFormData}) => {
    const CIN = useRef(null);
    const dateN = useRef(null);
    const genre = useRef(null);
    const lieuN = useRef(null);

    const handleClick = () => {
        setFormData({...formData,
            CIN : CIN.current.value,
            dateN : dateN.current.value,
            genre : genre.current.value,
            lieuN : lieuN.current.value,
        })
        setStep(3);
    }

  return (
    <div className="p-3">
        <Box boxSize="200px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg">Informations personnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <form className="flex flex-col items-center gap-10">
                <div className="grid grid-cols-2 gap-9">
                    <Input variant='outline' placeholder='CIN' ref={CIN} />
                    <Input variant='outline' placeholder='Date de naissance' ref={dateN} />
                    <Select placeholder='Genre' ref={genre}>
                        <option value='homme'>homme</option>
                        <option value='femme'>femme</option>
                    </Select>
                    <Input variant='outline' placeholder='Lieu de naissance' ref={lieuN} />
                </div>
                <Button colorScheme='facebook' type="submit" className="w-1/2" onClick={handleClick}>Suivant</Button>
            </form>
        </div>
    </div>
  )
}

export default Step2
