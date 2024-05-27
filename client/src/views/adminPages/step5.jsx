import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step5 = ({setStep,formData,handleChange}) => {
  return (
    <div className="p-3">
        <Box boxSize="200px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">informations professionnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
                    <Input variant='outline' placeholder='Departement' name="departement" value={formData.departement}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Diplome' name="diplome" value={formData.diplome} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Specialite' name="specialite" value={formData.specialite} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Université de diplome' name="etabl_diplome" value={formData.etabl_diplome} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Situation Administratif' name="situation_administrative" value={formData.situation_administrative}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Fonction exercée' name="fonction_exercee" value={formData.fonction_exercee} onChange={handleChange}/>
                </div>
                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(4)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(6)} >Suivant</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step5
