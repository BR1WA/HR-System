import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios';
import { Heading,Box,Image, Spinner, Menu, MenuButton, MenuList, MenuItem, IconButton} from "@chakra-ui/react"
import {useRef} from "react";
import { useToast} from "@chakra-ui/react"
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";





const User = () => {

  const [userInfos, setUserInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const toast = useToast();

  const fetchData = async () => {
    setIsLoading(true)
    try {
        const response = await axiosInstance.get(`/users/${sessionStorage.getItem('id')}`);
        console.log('Response:', response.data);
        setUserInfos(response.data);
        setIsLoading(false);
        setPhoto(response.data.avatar!== null ? response.data.avatar : null);
    } catch (error) {
        console.error('There was an error fetching the data !', error);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);
  
  const avatar = useRef(null);
  useEffect(() => {
    console.log(photo);
  }, [photo]);

  const uploadAvatar = async() => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar.current.files[0]);
      const response = await axiosInstance.post('/avatar/'+sessionStorage.getItem('id'), formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        
    });
      const avatarUrl = response.data.avatar + '?t=' + new Date().getTime();
      setPhoto(avatarUrl);
      console.log(avatarUrl);
      toast({
        description: 'L\'avatar a été changé avec succès.',
        status: 'success',
        duration: 9000,
        isClosable: true,
    });
    } catch (error) {
      console.log(error);
    }
  }
  const deleteAvatar = async () => {
    try {
        const response = await axiosInstance.delete('/avatar/' + sessionStorage.getItem('id'));
        if (response.status === 200) {
            setPhoto(null);
            toast({
                description: 'L\'avatar a été supprimé avec succès.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.log(error);
        toast({
            description: 'Error deleting avatar',
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
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
    <div className="p-3">
        <Box boxSize="200px" h="20">
        <Image src='1200px-Université_Abdelmalek_Essaâdi.png' alt='université abdelmalek essadi' objectFit='cover'/>
        </Box>
        <div className="flex flex-col items-center gap-12 w-full">
            <div className="flex flex-col gap-4 items-center">
                <Heading color='#0F4493' size="lg">Profile</Heading>
                <span className="bg-[#0F4493] w-12 h-0.5"></span>
            </div>
            <div className='flex flex-col items-center gap-3 relative'>
              <Image
                borderRadius='full'
                boxSize='220px'
                objectFit='cover'
                src={photo || 'user.jpg'}
                alt='Photo de Profile'
              />
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<IoAdd className='text-lg' />}
                  variant='outline'
                  rounded="full"
                  className='bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center absolute bottom-11 left-12 cursor-pointer'
                />
                <MenuList fontWeight="semibold">
                  <MenuItem onClick={()=>avatar.current.click()} command={<IoAdd className='text-lg' />}>
                    Ajouter une photo
                  </MenuItem>
                  {photo && 
                  <MenuItem onClick={deleteAvatar} color="tomato" command={<MdDelete className='text-lg' />}>
                    Suprimer la photo
                  </MenuItem>}
                </MenuList>
              </Menu>

              <input ref={avatar} type="file" className='hidden' onChange={uploadAvatar}/>
              <h1 className='font-bold text-2xl'>{userInfos.nom} {userInfos.prenom}</h1>
            </div>
        </div>
        <div className='grid sm:grid-cols-2 grid-cols-1 p-10 gap-10'>
          <div className='shadow-lg p-5'>
            <Heading color='#0F4493' size="md" marginBottom="5">Information Personnelles</Heading>
            <p className='capitalize flex flex-col gap-2'>
              <li className='flex justify-between'><p><b>nom</b> : {userInfos.nom}</p><p dir='rtl'><b>النسب</b> : {userInfos.nom_ar}</p></li>
              <li className='flex justify-between'><p><b>prenom</b> : {userInfos.prenom}</p><p dir='rtl'><b>الإسم</b> : {userInfos.prenom_ar}</p></li>
              <li className='list-none'><b>CIN</b> : {userInfos.cin}</li>
              <li className='list-none'><b>genre</b> : {userInfos.genre}</li>
              <li className='list-none'><b>date de naissance</b> : {userInfos.date_naissance}</li>
              <li className='list-none'><b>lieu de naissance</b> : {userInfos.lieu_naissance}</li>
              <li className='list-none'><b>identifiant de l'employer</b> : {userInfos.ppr}</li>
            </p>
          </div>
          <div className='shadow-lg p-5'>
            <Heading color='#0F4493' size="md" marginBottom="5">Coordonnées</Heading>
            <p className='capitalize flex flex-col gap-2'>
              <li className='list-none normal-case	'><b>Email</b> : {userInfos.email}</li>
              <li className='list-none'><b>téléphone</b> : {userInfos.telephone}</li>
              <li className='list-none'><b>adresse</b> : {userInfos.adresse}</li>
              <li className='list-none'><b>nationalité</b> : {userInfos.nationalite}</li>
              <li className='list-none'><b>situation familiale</b> : {userInfos.situation_familiale}</li>
            </p>
          </div>
        </div>
        <div className='m-10 shadow-lg p-5'>
          <Heading color='#0F4493' size="md" marginBottom="5">Informations Professionnelles</Heading>
          <p className='capitalize flex flex-col gap-2'>
            <li className='list-none'><b>Type de Personnel</b> : {userInfos.type_personnel}</li>
            <li className='list-none'><b>date de recrutement</b> : {userInfos.date_recrutement}</li>
            <li className='list-none'><b>grade</b> : {userInfos.grade}</li>
            <li className='list-none'><b>echelon</b> : {userInfos.echelon}</li>
            <li className='list-none'><b>echelle</b> : {userInfos.echelle}</li>
            <li className='list-none'><b>incice</b> : {userInfos.indice}</li>

            <li className='list-none'><b>departement</b> : {userInfos.departement}</li>
            <li className='list-none'><b>diplome</b> : {userInfos.diplome}</li>
            <li className='list-none'><b>univérsité de diplome</b> : {userInfos.etabl_diplome}</li>
            <li className='list-none'><b>specialite</b> : {userInfos.specialite}</li>
            <li className='list-none'><b>Situation Administrative</b> : {userInfos.situation_administrative	}</li>
            <li className='list-none'><b>Fonction exercée</b> : {userInfos.fonction_exercee}</li>
            
            <li className='list-none'><b>Date debut de fonction</b> : {userInfos.date_debut_fonction}</li>
            <li className='list-none'><b>Service affectation</b> : {userInfos.service_affectation}</li>
            <li className='list-none'><b>Type mouvement</b> : {userInfos.type_mouvement}</li>
            <li className='list-none'><b>Ministére</b> : {userInfos.organisme_accueil	}</li>
            <li className='list-none'><b>Date mouvement</b> : {userInfos.date_mouvement}</li>
            <li className='list-none'><b>Date d'expiration de mouvement</b> : {userInfos.date_expiration_mouvement}</li>
          </p>
        </div>
    </div>
  )
}
}

export default User
