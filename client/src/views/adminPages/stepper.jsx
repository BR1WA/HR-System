import React, { useEffect, useState } from 'react'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const Stepper = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({});

    const handleSubmit = () => {
        console.log(formData);
    }

    useEffect(() => {
        console.log( formData);
    }, [formData]);


  return (
    <div>
        {step == 1 && <Step1 setStep={setStep} setFormData={setFormData} formData={formData}/> }
        {step == 2 && <Step2 setStep={setStep} setFormData={setFormData} formData={formData}/> }
        {step == 3 && <Step3 setStep={setStep} setFormData={setFormData} formData={formData}/> }
    </div>
  )
}

export default Stepper
