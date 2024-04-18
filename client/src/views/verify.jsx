import { Heading,Box,Image,Input,Button,useToast} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from 'react-redux';

const Verify = ()=>{

const [email,setEmail] = useState(useSelector((state) => state.user.email));
const [isValid,setIsValid] = useState(false)
const [isTouched, setIsTouched] = useState(false); 
const [isLoading, setIsLoading] = useState(false);
const toast = useToast();

const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail); // Update email
    setIsValid(/^\d{6}$/.test(newEmail)); // Validate the new value directly
    setIsTouched(true); // Mark as touched
}
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (isValid && isTouched && email) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email });
            console.log('API Response:', response.data);
            toast({
                description: 'Message envoyé avec succès.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            console.error('API Error:', errorMessage);
            toast({
                description: 'Email introuvable.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }finally{
            setIsLoading(false)
        }
    }
};
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
                <form className="flex flex-col justify-center gap-6 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" onSubmit={handleSubmit}>
                    <Input variant='outline' placeholder='code de 6 chiffres' isInvalid={!isValid && isTouched} value={email} onChange={handleChange} />
                    <Button colorScheme='facebook' type="submit" isLoading={isLoading} isDisabled={!isValid}>Se Connecter</Button>
                </form>
            </div>
        </div>
    )
}
export default Verify