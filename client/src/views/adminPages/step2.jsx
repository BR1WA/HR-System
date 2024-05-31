import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"

const Step2 = ({setStep,formData,handleChange}) => {

  return (
    <div className="p-3">
        <Box boxSize="100px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">Informations personnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
    <div className="relative">
        <input 
            type="text" 
            id="floating_cin" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="cin" 
            value={formData.cin} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_cin" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            CIN
        </label>
    </div>
    <div className="relative">
        <input 
            type="date" 
            id="floating_date_naissance" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="date_naissance" 
            value={formData.date_naissance} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_date_naissance" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Date de naissance
        </label>
    </div>
    <div className="relative">
        <select 
            id="floating_genre" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" 
            name="genre" 
            value={formData.genre} 
            onChange={handleChange} 
            required
        >
            <option value="" disabled>Genre</option>
            <option value="homme">homme</option>
            <option value="femme">femme</option>
        </select>
        <label 
            htmlFor="floating_genre" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Genre
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_lieu_naissance" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="lieu_naissance" 
            value={formData.lieu_naissance} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_lieu_naissance" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Lieu de naissance
        </label>
    </div>
</div>

                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(1)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(3)} >Suivant</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step2
