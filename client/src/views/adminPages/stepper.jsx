import React, { useEffect, useState } from 'react'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import { Spinner } from '@chakra-ui/react';

const Stepper = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
    type : '',
    ppr: '',
    nom: '',
    prenom: '',
    nom_ar: '',
    prenom_ar: '',
    cin: '',
    genre: '',
    lieu_naissance: '',
    adresse: '',
    telephone: '',
    situation_familiale: '',
    nationalite: '',
    grade: '',
    type_personnel: '',
    departement: '',
    diplome: '',
    specialite: '',
    etabl_diplome: '',
    situation_administrative: '',
    fonction_exercee: '',
    service_affectation: '',
    type_mouvement: '',
    organisme_accueil: '',
    date_mouvement: '',
    date_expiration_mouvement: '',
    date_naissance: '',
    date_debut_fonction: '',
    date_recrutement: '',
    echelle: '',
    echelon: '',
    indice: '',
    email: '',
    type: '',
    arrete: null
  });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    
    const fetchData = async () => {
        if(sessionStorage.getItem("user")){
        try {
            const response = await axiosInstance.get(`/users/${sessionStorage.getItem('user')}`);
            console.log('Response:', response.data);
            setFormData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error fetching the data !', error);
        } finally {
            setIsLoading(false)
        }
    }else{
        setIsLoading(false)
    }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const data = new FormData();
        for (const key in formData) {
        data.append(key, formData[key]);
        }
        data.append("type", sessionStorage.getItem("type"));
      try {
        
        if(sessionStorage.getItem("user")){
            const response = await axiosInstance.put(`/users/${sessionStorage.getItem("user")}`, data);
            console.log('Response:', response.data);
            navigate('/options');
        }else{
            const response = await axiosInstance.post('/users', data);
            console.log('Response:', response.data);
            navigate('/options');
        }
      } catch (error) {
          console.error('There was an error submitting the form!', error);
      }
    }

    const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'arrete' && files.length > 0) {
        // If the input is a file input and files are selected, handle the file
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],  // Store the file object
        }));
    } else {
        // Handle other input changes
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    
    const logOut = () => {
        sessionStorage.clear();
        window.location.reload();
    };
    
    if (isLoading === true) {return (
        <div className='text-3xl h-screen font-bold text-blue-900 flex items-center justify-center'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
        </div>)
      }else{
    return (
        <div>
            {step == 1 && <Step1 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange} logOut={logOut}/> }
            {step == 2 && <Step2 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange} logOut={logOut}/> }
            {step == 3 && <Step3 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange} logOut={logOut}/> }
            {step == 4 && <Step4 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange} logOut={logOut}/> }
            {step == 5 && <Step5 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange} logOut={logOut}/> }
            {step == 6 && <Step6 setStep={setStep} setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} logOut={logOut}/> }
        </div>
    )
    }
}

export default Stepper
