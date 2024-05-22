import { Heading,Box,Image,Input,Button,useToast} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step1 = ({setStep,formData,handleChange}) => {


  return (
    <div className="p-3">
        <Box boxSize="200px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">Informations personnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
                    <Input variant='outline' placeholder='Nom' name="nom" value={formData.nom} onChange={handleChange} required/>
                    <Input variant='outline' placeholder='الاسم' dir="rtl" name="nom_ar" value={formData.nom_ar} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Prenom' name="prenom" value={formData.prenom}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='النسب' dir="rtl" name="prenom_ar" value={formData.prenom_ar} onChange={handleChange}/>
                    <Input variant='outline' placeholder='N° PPR' name="ppr" value={formData.ppr}  onChange={handleChange}/>
                </div>
                <Button colorScheme='facebook' className="w-1/2" onClick={()=>setStep(2)} >Suivant</Button>
            </div>
        </div>
    </div>
  )
}

export default Step1
