import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step4 = ({setStep,formData,handleChange}) => {

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
                    <Input variant='outline' placeholder='Type de Personnel' name="type_personnel" value={formData.type_personnel}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Grade' name="grade" value={formData.grade} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Echelon' name="echelon" value={formData.echelon} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Echelle' name="echelle" value={formData.echelle} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Indice' name="indice" value={formData.indice} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Date de recrutement' name="date_recrutement" value={formData.date_recrutement} onChange={handleChange}/>
                </div>
                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(3)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(5)} >Suivant</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step4
