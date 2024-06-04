import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"

const Step3 = ({setStep,formData,handleChange}) => {

  return (
    <div className="p-3">
        <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">Coordonées</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-16">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
    <div className="relative">
        <input 
            type="email" 
            id="floating_email" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_email" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Email
        </label>
    </div>
    <div className="relative">
        <input 
            type="tel" 
            id="floating_telephone" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_telephone" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Téléphone
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_adresse" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="adresse" 
            value={formData.adresse} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_adresse" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Adresse
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_nationalite" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="nationalite" 
            value={formData.nationalite} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_nationalite" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Nationalité
        </label>
    </div>
    <div className="relative">
        <Select 
            id="floating_situation_familiale" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" 
            name="situation_familiale" 
            value={formData.situation_familiale} 
            onChange={handleChange} 
            required
        >
            <option value="" disabled>Situation familiale</option>
            <option value="célibataire">célibataire</option>
            <option value="marié">marié</option>
            <option value="divorcé">divorcé</option>
        </Select>
        <label 
            htmlFor="floating_situation_familiale" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Situation familiale
        </label>
    </div>
</div>

                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(2)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(4)} >Suivant</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step3
