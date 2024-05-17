import { Heading,Box,Image,Input,Button,useToast,Checkbox} from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Verify = ()=>{

const [code,setCode] = useState("");
const [rememberMe,setRememberMe] = useState(true);
const [isValid,setIsValid] = useState(false)
const [isTouched, setIsTouched] = useState(false); 
const [isLoading, setIsLoading] = useState(false);
const [cookies,setCookie] = useCookies(['user'])
const toast = useToast();
const email = useSelector((state) => state.user.email);
const navigate = useNavigate();

const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setIsValid(/^\d{6}$/.test(newCode));
    setIsTouched(true);
}
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let response=null;
    if (isValid && isTouched && code) {
        try {
            response = await axios.post('http://127.0.0.1:8000/api/verifiy-email', { email,otp: code });
            console.log('API Response:', response.data);
            if (response.data.success) {
                if(rememberMe) setCookie('user_id', response.data.data.user.id,7);
                navigate('/options');
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            console.error('API Error:', errorMessage);
        }finally{
            setIsLoading(false);
            toast({
                description: response.data.message,
                status: response.data.success ? 'success' : 'error',
                duration: 9000,
                isClosable: true,
            });
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
                <form className="flex flex-col justify-center gap-7 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <Input variant='outline' placeholder='code de 6 chiffres' isInvalid={!isValid && isTouched} value={code} onChange={handleChange} />
                        <Checkbox  defaultChecked={rememberMe} size='sm' fontWeight='' onChange={() => setRememberMe(prevRememberMe => !prevRememberMe)}>souviens-toi de moi</Checkbox>
                    </div>
                    <Button colorScheme='facebook' type="submit" isLoading={isLoading} isDisabled={!isValid}>Se Connecter</Button>
                </form>
            </div>
        </div>
    )
}
export default Verify