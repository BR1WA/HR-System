import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"

const Step6 = ({setStep,formData,handleChange,handleSubmit}) => {
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
                    <Input variant='outline' placeholder='Date debut de fonction' name="date_debut_fonction" value={formData.date_debut_fonction}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Service affectation' name="service_affectation" value={formData.service_affectation}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Type mouvement' name="type_mouvement" value={formData.type_mouvement}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Ministére' name="ministere" value={formData.ministere}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Date mouvement' name="date_mouvement" value={formData.date_mouvement}  onChange={handleChange}/>
                    <Input variant='outline' placeholder='Date expiration de mouvement' name="date_expiration_mouvement" value={formData.date_expiration_mouvement}  onChange={handleChange}/>
                </div>
                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(5)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={handleSubmit} >Ajouter</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Step6
