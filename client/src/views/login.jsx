import { Heading,Box,Image,Text,Input,Button } from "@chakra-ui/react"
import { useState } from "react"

const Login = ()=>{

const [email,setEmail] = useState("");
const [isValid,setIsValid] = useState(false)
const [isTouched, setIsTouched] = useState(false); 

const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
    setIsTouched(true)
}

const handleSubmit = (e) => {
    e.preventDefault();

}
    return(
        <div className="p-3">
            <Box boxSize="200px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <div className="flex flex-col items-center gap-20">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Authentifier vous!</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex flex-col justify-center gap-6 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Input variant='outline' placeholder='Email' name="email" isInvalid={!isValid && isTouched} value={email} onChange={handleChange} />
                    <Button colorScheme='facebook'  isDisabled={!isValid}>Envoyer</Button>
                </div>
            </div>
        </div>
    )
}
export default Login