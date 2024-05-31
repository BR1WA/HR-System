import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'

const Step5 = ({setStep,formData,handleChange}) => {
  return (
    <div className="p-3">
        <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">informations professionnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
    <div className="relative">
        <input 
            type="text" 
            id="floating_departement" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="departement" 
            value={formData.departement} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_departement" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Departement
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_diplome" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="diplome" 
            value={formData.diplome} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_diplome" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Diplome
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_specialite" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="specialite" 
            value={formData.specialite} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_specialite" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Specialite
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_etabl_diplome" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="etabl_diplome" 
            value={formData.etabl_diplome} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_etabl_diplome" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Université de diplome
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_situation_administrative" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="situation_administrative" 
            value={formData.situation_administrative} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_situation_administrative" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Situation Administrative
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_fonction_exercee" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="fonction_exercee" 
            value={formData.fonction_exercee} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_fonction_exercee" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            Fonction exercée
        </label>
    </div>
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
