import React, { useEffect, useState } from 'react'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Stepper = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async () => {
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/users', formData);
          console.log('Response:', response.data);
          navigate('/options');
      } catch (error) {
          console.error('There was an error submitting the form!', error);
      }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);


  return (
    <div>
        {step == 1 && <Step1 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange}/> }
        {step == 2 && <Step2 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange}/> }
        {step == 3 && <Step3 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange}/> }
        {step == 4 && <Step4 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange}/> }
        {step == 5 && <Step5 setStep={setStep} setFormData={setFormData} formData={formData} handleChange={handleChange}/> }
        {step == 6 && <Step6 setStep={setStep} setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} handleChange={handleChange}/> }
    </div>
  )
}

export default Stepper
