import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"

const Step2 = ({setStep,formData,handleChange}) => {

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
            <form className="flex flex-col items-center gap-10">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
                    <Input variant='outline' placeholder='CIN' name="cin" value={formData.cin} onChange={handleChange} />
                    <Input variant='outline' placeholder='Date de naissance' name="date_naissance" value={formData.date_naissance} onChange={handleChange} />
                    <Select placeholder='Genre' className="placeholder-gray-500" name="genre" value={formData.genre} onChange={handleChange}>
                        <option value='homme'>homme</option>
                        <option value='femme'>femme</option>
                    </Select>
                    <Input variant='outline' placeholder='Lieu de naissance' name="lieu_naissance" value={formData.lieu_naissance} onChange={handleChange} />
                </div>
                <div className="flex justify-center gap-6 w-full">
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(1)}  variant='outline' >Precedent</Button>
                    <Button colorScheme='facebook' className="sm:w-1/4" onClick={()=>setStep(3)} >Suivant</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Step2
