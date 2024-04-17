import { Heading,Box,Image,Text,Input,Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"

const Login = ()=>{

const [email,setEmail] = useState("");
const [isValid,setIsValid] = useState(false)
const [isTouched, setIsTouched] = useState(false); 
const [SubmissionMessage, setSubmissionMessage] = useState("");

const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
    setIsTouched(true)
}
const handleSubmit =  async(e) => {
    e.preventDefault();
    if (isValid && isTouched && email) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email: email
          });
          setSubmissionMessage('OTP message sent successfully');
          console.log('API Response:', response.data);
        } catch (error) {
          setSubmissionMessage('Email not found.');
          console.error('API Error:', error.response ? error.response.data : error.message);
        }
      } else {
        setSubmissionMessage('Please enter a valid email before submitting.');
      }
    };
    useEffect(()=>{    
    console.log(SubmissionMessage);
  },[SubmissionMessage]);

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
                    <Input variant='outline' placeholder='Email' isInvalid={!isValid && isTouched} value={email} onChange={handleChange} />
                    <Button colorScheme='facebook' type="submit"  isDisabled={!isValid}>Envoyer</Button>
                </form>
            </div>
        </div>
    )
}
export default Login