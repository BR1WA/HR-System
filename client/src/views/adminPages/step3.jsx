import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step3 = ({setStep,formData,setFormData}) => {
    const email = useRef(null);
    const tel = useRef(null);
    const adresse = useRef(null);
    const nationalite = useRef(null);
    const situationFam = useRef(null);

    const handleClick = () => {
        setFormData({...formData,
            email : email.current.value,
            tel : tel.current.value,
            adresse : adresse.current.value,
            nationalite : nationalite.current.value,
            situationFam : situationFam.current.value
        })
        setStep(4);
    }
  return (
    <div className="p-3">
        <Box boxSize="200px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg">Authentifier vous!</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="grid grid-cols-2 gap-9">
                    <Input variant='outline' placeholder='Email' ref={email} />
                    <Input variant='outline' placeholder='Telepghone' ref={tel}/>
                    <Input variant='outline' placeholder='Adresse' ref={adresse} />
                    <Input variant='outline' placeholder='Nationalité' ref={nationalite} />
                    <Select placeholder='Situation familiale' ref={situationFam}>
                        <option value='homme'>homme</option>
                        <option value='femme'>femme</option>
                    </Select>
                </div>
                <Button colorScheme='facebook' className="w-1/2" onClick={handleClick} >Suivant</Button>
            </div>
        </div>
    </div>
  )
}

export default Step3
