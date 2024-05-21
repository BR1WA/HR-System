import { Heading,Box,Image,Input,Button,Select} from "@chakra-ui/react"

const Step3 = ({setStep,formData,handleChange}) => {

  return (
    <div className="p-3">
        <Box boxSize="200px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg">Coordonées</Heading>
                <span className="bg-[#0F4493] w-20 h-0.5"></span>
            </div>
            <div className="flex flex-col items-center gap-16">
                <div className="sm:grid grid-cols-2 gap-9 flex flex-col">
                    <Input variant='outline' placeholder='Email' name="email" value={formData.email} onChange={handleChange}/>
                    <Input variant='outline' placeholder='telephone' name="telephone" value={formData.telephone}onChange={handleChange}/>
                    <Input variant='outline' placeholder='Adresse' name="adresse" value={formData.adresse} onChange={handleChange}/>
                    <Input variant='outline' placeholder='Nationalité' name="nationalite" value={formData.nationalite} onChange={handleChange}/>
                    <Select placeholder='Situation familiale' name="situation_familiale" value={formData.situation_familiale} onChange={handleChange}>
                        <option value='célibataire'>célibataire</option>
                        <option value='marié'>marié</option>
                        <option value='divorcé'>divorcé</option>
                    </Select>
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
