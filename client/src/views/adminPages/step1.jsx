import { Heading,Box,Image,Input,Button,useToast} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step1 = ({setStep,formData, setFormData}) => {
    const nom = useRef(null);
    const nomAr = useRef(null);
    const prenom = useRef(null);
    const prenomAr = useRef(null);
    const PPR = useRef(null);

    const handleClick = () => {
        setFormData({...formData,
            nom : nom.current.value,
            nomAr : nomAr.current.value,
            prenom : prenom.current.value,
            prenomAr : prenomAr.current.value,
            PPR : PPR.current.value
        })
        setStep(2);
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
                    <Input variant='outline' placeholder='Nom' ref={nom} />
                    <Input variant='outline' placeholder='الاسم' dir="rtl" ref={nomAr}/>
                    <Input variant='outline' placeholder='Prenom' ref={prenom} />
                    <Input variant='outline' placeholder='النسب' dir="rtl" ref={prenomAr} />
                    <Input variant='outline' placeholder='N° PPR' ref={PPR} />
                </div>
                <Button colorScheme='facebook' className="w-1/2" onClick={handleClick} >Suivant</Button>
            </div>
        </div>
    </div>
  )
}

export default Step1
