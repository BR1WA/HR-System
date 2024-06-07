import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import React, { useRef } from 'react'
import Grades from "./staticData/grades"
import Indices from "./staticData/indices"
import TypePersonnel from "./staticData/type_personnel"
import Echelles from "./staticData/echelles"
import Echelons from "./staticData/echelons"

const Step4 = ({setStep,formData,handleChange}) => {

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
            <div className="flex flex-col items-center gap-10 lg:w-1/3 md:w-1/2">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
    <div className="relative">
        <Select 
            type="text" 
            id="floating_type_personnel" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="type_personnel" 
            value={formData.type_personnel} 
            onChange={handleChange} 
            required 
        >{TypePersonnel.map(typePersonnel => (
            <option key={typePersonnel.value} value={typePersonnel.value}>
            {typePersonnel.label}
            </option>
        ))}
        </Select>
        <label 
            htmlFor="floating_type_personnel" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Type de Personnel
        </label>
    </div>
    <div className="relative">
        <Select 
            id="floating_grade" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            name="grade" 
            value={formData.grade} 
            onChange={handleChange} 
            required 
        > {Grades.map(grade => (
            <option key={grade.value} value={grade.value}>
            {grade.label}
            </option>
        ))}
        </Select>
        <label 
            htmlFor="floating_grade" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Grade
        </label>
    </div>
    <div className="relative">
        <Select 
            type="text" 
            id="floating_echelon" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="echelon" 
            value={formData.echelon} 
            onChange={handleChange} 
            required 
        >
            {Echelons.map(echelon => (
                <option key={echelon} value={echelon}>
                    {echelon}
                </option>
            ))}
        </Select>
        <label 
            htmlFor="floating_echelon" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Echelon
        </label>
    </div>
    <div className="relative">
        <Select 
            type="text" 
            id="floating_echelle" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="echelle" 
            value={formData.echelle} 
            onChange={handleChange} 
            required 
        >
            {Echelles.map(echelle => (
                <option key={echelle.value} value={echelle.value}>
                    {echelle.value}
                </option>
            ))}
        </Select>
        <label 
            htmlFor="floating_echelle" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Echelle
        </label>
    </div>
    <div className="relative">
        <Select 
            id="floating_indice" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            name="indice" 
            value={formData.indice} 
            onChange={handleChange} 
            required 
        > {formData.type == "enseignant" ? Indices.enseignants.map(indice => (
            <option key={indice.value} value={indice.value}>
            {indice.value}
            </option>
        )) : Indices.fonctionnaires.map(indice => (
            <option key={indice.value} value={indice.value}>
            {indice.value}
            </option>
        ))}
        </Select>
        <label 
            htmlFor="floating_indice" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Indice
        </label>
    </div>
    <div className="relative">
        <input 
            type="date" 
            id="floating_date_recrutement" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="date_recrutement" 
            value={formData.date_recrutement} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_date_recrutement" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Date de recrutement
        </label>
    </div>
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
