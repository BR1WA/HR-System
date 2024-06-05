import { Heading,Box,Image,Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../axios";

const Attestations = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [certificate, setCertificate] = useState({});
    const currentYear = new Date().getFullYear();

    const demands = [
        { id: 1, title: 'Demande de congé annuel', description: 'Une demande présentée par l\'employé pour obtenir un congé annuel du travail.' },
        { id: 2, title: 'Demande de permis de quitter le territoire national', description: 'Une demande présentée par l\'employé pour obtenir un permis de quitter le territoire national pour une période déterminée.' },
        { id: 3, title: 'Demande de attestation de salaire', description: 'Ce formulaire est utilisé pour demander un certificat prouvant le salaire perçu par l\'employé.' },
        { id: 4, title: 'Demande de attestation de travail', description: 'Ce formulaire est utilisé pour demander un certificat prouvant l\'emploi actuel de l\'employé.' },
        { id: 5, title: 'Demande de permis exceptionnel', description: 'Cette demande est présentée pour obtenir un permis exceptionnel pour des affaires personnelles ou des circonstances particulières.' }
    ];

    const months = [
    { arabic: 'يناير', french: 'Janvier' },
    { arabic: 'فبراير', french: 'Février' },
    { arabic: 'مارس', french: 'Mars' },
    { arabic: 'أبريل', french: 'Avril' },
    { arabic: 'ماي', french: 'Mai' },
    { arabic: 'يونيو', french: 'Juin' },
    { arabic: 'يوليوز', french: 'Juillet' },
    { arabic: 'غشت', french: 'Août' },
    { arabic: 'شتنبر', french: 'Septembre' },
    { arabic: 'أكتوبر', french: 'Octobre' },
    { arabic: 'نونبر', french: 'Novembre' },
    { arabic: 'دجنبر', french: 'Décembre' }
    ];

    const years = Array.from(new Array(42), (val, index) => currentYear - index);

    const handlePreview = (demandId) => {
        const pdfName = `${demandId}.pdf`;
        const pdfUrl = '/attestations/' + pdfName;
        window.open(pdfUrl, '_blank');
    };
    
    const demandCertificate = async () => {
        try {
        const response = await axiosInstance.post(`/archive/${sessionStorage.getItem("id")}`, { raison });
        console.log(response.data);
        toast({
            description: 'L\'Utilisateur a été archivé avec succès.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
        } catch (error) {
        console.error('There was an error archiving the user!', error);
        } finally {
            onClose();
        }
    };
    
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
        <div className="p-3">
            <Box boxSize="100px" h="20">
            <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
            </Box>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <Heading color='#0F4493' size="lg">Choisissez une attestation !</Heading>
                    <span className="bg-[#0F4493] w-20 h-0.5"></span>
                </div>
                <div className="flex flex-col justify-center gap-5 sm:grid md:grid-cols-3 sm:grid-cols-2 ">
                        {demands.map((demand, index) => (
                            <div key={index} className="bg-slate-200 p-3 rounded-md flex flex-col gap-2">
                                <Heading size="md" fontWeight="bold">{demand.title}</Heading>
                                <Text>{demand.description}</Text>
                                <div className="flex-grow"></div>
                                <div className="mt-4 ">
                                    <Button marginRight="3" colorScheme='facebook' variant='outline' onClick={() => handlePreview(demand.id)}>Aperçu</Button>
                                    <Button colorScheme="facebook" onClick={()=>{onOpen();setCertificate(demand)}}>Demander</Button>
                                </div>
                            </div>
                        ))}
                </div>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={()=>{onClose();setFormData({})}}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{certificate.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {certificate.id === 1 && (
                                <>
                                    <FormControl>
                                        <FormLabel>Durée</FormLabel>
                                        <Input type="number" required ref={initialRef} placeholder="Durée de congé" name="duree" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Motif</FormLabel>
                                        <Input placeholder="Motif" name="motif" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 2 && (
                                <>
                                    <FormControl>
                                        <FormLabel>de</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date debut" name="date_debut" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>à</FormLabel>
                                        <Input ref={initialRef} type="date" placeholder="Date fin" name="date_fin" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Motif</FormLabel>
                                        <Input placeholder="Motif" name="motif" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 3 && (
                                <>
                                    <FormControl>
                                        <FormLabel>Quantité</FormLabel>
                                        <NumberInput max={5} min={1}>
                                            <NumberInputField ref={initialRef} placeholder="Nombre de copies" name="quantite" onChange={handleChange}/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel htmlFor="langue">La Langue d'attestation</FormLabel>
                                        <Select id="langue" name="langue" onChange={handleChange}>
                                            <option value="arabe">العربية</option>
                                            <option value="français">français</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel htmlFor="annee">Année</FormLabel>
                                        <Select id="annee" name="annee" onChange={handleChange}>
                                            <option value="">Sélectionnez une année</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 4 && (
                                <>
                                    <FormControl>
                                        <FormLabel>Quantité</FormLabel>
                                        <NumberInput max={5} min={1}>
                                            <NumberInputField ref={initialRef} placeholder="Nombre de copies" name="quantite" onChange={handleChange}/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel htmlFor="langue">Langue</FormLabel>
                                        <Select id="langue" name="langue" onChange={handleChange}>
                                            <option value="arabe">العربية</option>
                                            <option value="français">français</option>
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                            
                            {certificate.id === 5 && (
                                <>
                                    <FormControl>
                                        <FormLabel>Durée</FormLabel>
                                        <Input type="number" required ref={initialRef} placeholder="Durée de congé" name="duree" onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Motif</FormLabel>
                                        <Input placeholder="Motif" name="motif" onChange={handleChange}/>
                                    </FormControl>
                                </>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='facebook' mr={3} onClick={()=>demandCertificate()}>
                                Confirmer
                            </Button>
                            <Button onClick={()=>{onClose();setFormData({})}}>Annuler</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
  )
}

export default Attestations
