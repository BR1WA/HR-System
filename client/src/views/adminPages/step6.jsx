import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"
import TypesMouvement from "./staticData/types_mouvement"

const Step6 = ({setStep,formData,handleChange,handleSubmit,logOut}) => {
  return (
    <div className="p-3">
        <div className="flex justify-between">
            <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <Button colorScheme="facebook" onClick={()=>logOut()}>Déconnecter</Button>
        </div>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg" textAlign="center" textTransform="capitalize">informations professionnelles</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
    <div className="relative">
        <input 
            type="date" 
            id="floating_date_debut_fonction" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="date_debut_fonction" 
            value={formData.date_debut_fonction} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_date_debut_fonction" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Date debut de fonction
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_service_affectation" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="service_affectation" 
            value={formData.service_affectation} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_service_affectation" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Service affectation
        </label>
    </div>
    <div className="relative">
        <Select 
            id="floating_type_mouvement" 
            className="block px-2.5 pb-2.5 pt-1 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="type_mouvement" 
            value={formData.type_mouvement} 
            onChange={handleChange} 
            required 
        >
            {TypesMouvement.map(typeMouvement => (
                <option key={typeMouvement.value} value={typeMouvement.value}>
                    {typeMouvement.label}
                </option>
            ))}
        </Select>
        <label 
            htmlFor="floating_type_mouvement" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Type mouvement
        </label>
    </div>
    <div className="relative">
        <input 
            type="text" 
            id="floating_organisme_accueil" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="organisme_accueil" 
            value={formData.organisme_accueil} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_organisme_accueil" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Ministére
        </label>
    </div>
    <div className="relative">
        <input 
            type="date" 
            id="floating_date_mouvement" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="date_mouvement" 
            value={formData.date_mouvement} 
            onChange={handleChange} 
            required 
        />
        <label 
            htmlFor="floating_date_mouvement" 
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
            Date mouvement
        </label>
    </div>
    <div className="relative">
        <input 
            type="date" 
            id="floating_date_expiration_mouvement" 
            className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            name="date_expiration_mouvement" 
            value={formData.date_expiration_mouvement} 
            onChange={handleChange} 
            required 
        /><label 
    htmlFor="floating_date_expiration_mouvement" 
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 block w-full text-center"
    style={{ whiteSpace: 'nowrap' }}
>
    Date expiration de mouvement
</label>
    </div>
</div>

                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(5)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={handleSubmit} >{sessionStorage.getItem("user") ? "modifier" : "Ajouter"}</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step6
