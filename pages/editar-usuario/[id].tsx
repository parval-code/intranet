import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useStorePerson } from '@/hooks/Person/StoreProvider';
import { useStoreDepartments } from '@/hooks/Departments/StoreProvider';
import { useStoreLocation } from '@/hooks/Location/StoreProvider';
import { useStorePermissions } from '@/hooks/permissions/StoreProvider';
import { useStoreUsersPermissions } from '@/hooks/usersPermissions/StoreProvider';
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { useAuthLogin } from "@/hooks/AuthLogin";
import InputComponent from '@/components/atoms/inputUi';
import Image from 'next/image';
import { usePerson } from '@/hooks/Person';
import { usePermissions } from '@/hooks/permissions';
import { useLocation } from '@/hooks/Location';
import { useDepartments } from '@/hooks/Departments';
import { useUsersPermissions } from '@/hooks/usersPermissions';
import { get, isEmpty, set } from 'lodash';
import { useNotification } from '@/hooks/Notifications';
import Btn from '@/components/atoms/btn';
import ModalUserPermis from '@/components/organisms/modalUserPermis';
import ListPermis from '@/components/molecules/listPermis';
import Loading from '@/components/molecules/loading';

const EditUsersComponent = () => {

    const router = useRouter();
    const { id }: any = useRouter().query;
    const [ loading, setLoading ] = useState(false);
    const { getAuthLogin } = useAuthLogin();
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [ newUser, setNewUser ]: any = useState({
      name: '',
      area: '',
      location: '',
      jobTitle: '',
      admissionDate: null,
      birthdate: null
    });

    const { showNotification } = useNotification();
    const { getAllPermissions } = usePermissions();
    const { getOnePerson, updatedPerson } = usePerson();
    const { getAllLocation } = useLocation();
    const { getAllDepartments } = useDepartments();
    const { getOneUsersPermissions, saveUsersPermissions, updateUsersPermissions } = useUsersPermissions();

    const { permissions } = useStorePermissions();
    const { usersPermissions } = useStoreUsersPermissions();
    const { person } = useStorePerson();
    const { departments } = useStoreDepartments();
    const { location } = useStoreLocation();
    const { authLogin } = useStoreAuthLogin();

    useEffect(() => {
      async function fetchData() {
          setLoading(true);
          await Promise.all([
              getAuthLogin(),
              getOnePerson(id),
              getAllLocation(),
              getAllDepartments(),
              getAllPermissions(),
          ]);
          setLoading(false);
        }
      if(!!id) {
          fetchData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        await Promise.all([
            getAllLocation(),
            getAllDepartments(),
            getAllPermissions(),
        ]);
        setLoading(false);
      }
      if(isEmpty(permissions) && isEmpty(departments) && isEmpty(location)) {
        fetchData();
      }
    }, [permissions, departments, location])

    useEffect(() => {
      async function fetchDataUsersPermissions() {
        setLoading(true);
        await Promise.all([
          getOneUsersPermissions(person[0].userId),
        ]);
        setLoading(false);
      }
      if(!isEmpty(person)) {
        fetchDataUsersPermissions();
      }
    }, [person])

    // const clearInfo = () => {
    //   setNewUser({
    //     name: '',
    //     jobTitle: '',
    //     area: '',
    //     location: '',
    //     admissionDate: null,
    //     birthdate: null
    //   });
    //   setFile(null);
    // }

    useEffect(() => {
      if(!isEmpty(usersPermissions)){
        setSelectedPermissions(usersPermissions[0].permissions)
      }
    }, [usersPermissions])

    useEffect(() => {
      if(!isEmpty(person)) {
        setNewUser({
          name: person[0].name,
          jobTitle: person[0].jobTitle,
          area: person[0].area,
          location: person[0].location,
          admissionDate: get(person[0], 'admissionDate', null),
          birthdate: get(person[0], 'birthdate', null)
        });
      }
    }, [person])

    const handlePreloaderImage = async (event: any) => {
      setFile(event.target.files[0]);
      setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewUser((newUser: any) => ({...newUser, [name]: value}));
    }

    const handleUpload = async () => {
      if (!file) {
        console.error('Selecciona un archivo antes de cargar');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1];
          const infoImege = await axios.post(`/api/azureBlobStorage?type=${get(file, 'type', '')}`, {base64Image});
  
          // if(infoImege.data.urlImage) {
          //   console.log('infoImege.data.urlImage', infoImege.data.urlImage, 'infoImege.data.urlImage');  
          //   setFrontPage(infoImege.data.urlImage)
          // }
        };
  
        console.log('Imagen cargada con éxito');
      } catch (error: any) {
        console.error('Error al cargar la imagen:', error.message);
      }
    };

    const onHandleUpdatedUserPermissions = async () => {
      let dataFrontPage: string = '';
      let image: boolean = false;
      const data: any = {
        ...newUser,
        updatedAt: new Date()
      }
      try {
        await handleUpload().then((res: any) => {
          if(res.data.data.success) {
            set(data, 'urlImage', res.data.data.urlImage);
          }
        });
        image = true;
      } catch(e: any) {
        dataFrontPage = '';
        image = true;
      }
          
      setLoading(true);
      await updatedPerson(person[0].id, data).then(async () => {
        if(!isEmpty(usersPermissions)) {
          await updateUsersPermissions(usersPermissions[0].id, {
            userId: person[0].userId,
            permissions: selectedPermissions,
          }).then(() => {
            setLoading(false);
            showNotification('Se agrego correctamente.', "success");
          })
        } else {
          await saveUsersPermissions({
            userId: person[0].userId,
            permissions: selectedPermissions,
          }).then(() => {
            setLoading(false);
            showNotification('Se agrego correctamente.', "success");
          })
        }
      });
    }

    return (<>
    
        <div className='mt-5 overflow-y-scroll bg-white p-5 h-[600px] lg:h-[700px] 2xl:h-[870px] rounded'>
              <div className='grid sitems-center justify-center'>
                {
                    loading ? <>
                        <div className={'pt-20'}>
                            <div className={'flex justify-center'}>
                                <Loading name={'Cargando ...'} />
                            </div>
                        </div>
                    </> : person && get(person[0], 'id', 0) ?
                      <>
                        <div className={'grid'}>
                            <div className='mt-[50px] 2xl:mt-[170px] flex gap-4 items-center justify-center'>
                                  <div>
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Asignar una imagen
                                            </label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-14">
                                                <div className="text-center">
                                                <div className='text-sm flex gap-5 leading-6 text-indigo-500 cursor-pointer'>
                                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Subir Imagen</span>
                                                    <input
                                                        onChange={handlePreloaderImage}
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                    </label>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                    </div>
                                    <div>
                                            {(previewURL || person) && (
                                                <>
                                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Imagen cargada:
                                                    </label>
                                                    <div className="mt-2">
                                                        <Image
                                                            src={previewURL ? previewURL : get(person[0], 'urlImage', '')}
                                                            width={1080}
                                                            height={1080}
                                                            className={"w-44 h-44 rounded mt-2"}
                                                            alt={"logo de parval"}
                                                            priority
                                                        />
                                                    </div>
                                                </>
                                            )}
                                  </div>     
                            </div>
                            <div className='mb-1 mt-2 grid'>
                                <InputComponent
                                      type={'text'}
                                      onChange={onChangeHandle}
                                      defaultValue={newUser.name}
                                      name={'name'}
                                      label={''}
                                      placeholder={'Nombre'}
                                  />
                                <span className='text-sm text-gray-500'>
                                  { person[0].mail }
                                </span>
                            </div>

                            <div className='mb-1 mt-2 grid grid-cols-2 gap-4'>
                                
                                <InputComponent
                                      type={'text'}
                                      onChange={onChangeHandle}
                                      defaultValue={newUser.jobTitle}
                                      name={'jobTitle'}
                                      label={'Puesto'}
                                      placeholder={'Posicion'}
                                  />
                                <InputComponent
                                      type={'date'}
                                      onChange={onChangeHandle}
                                      defaultValue={newUser.birthdate}
                                      name={'birthdate'}
                                      label={'Fecha de Nacimiento'}
                                      placeholder={'Fecha de Nacimiento'}
                                  />
                            </div>

                            <div className='mb-1 mt-2 grid'>
                                <InputComponent
                                      type={'date'}
                                      onChange={onChangeHandle}
                                      defaultValue={newUser.admissionDate}
                                      name={'admissionDate'}
                                      label={'Fecha de Ingreso'}
                                      placeholder={'Fecha de Ingreso'}
                                  />
                            </div>

                            <div className='mb-5 mt-10'>
                              <div className='grid grid-cols-2 gap-4'>
                                  <div>
                                      <label className='text-sm text-gray-500'>Departamento</label>
                                      {
                                        departments && departments.length ?
                                          <>
                                            <select onChange={onChangeHandle} value={newUser.area} name={"area"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                              <option> Seleccione un Departamento </option>
                                              {
                                                departments.map((item: any) => (
                                                    <>
                                                      <option value={item.id}> {item.name} </option>
                                                    </>
                                                ))
                                              }
                                            </select>
                                          </> : null
                                      }
                                  </div>
                                  <div>
                                    <label className='text-sm text-gray-500'>Localización de la oficina</label>
                                    {
                                        location && location.length ?
                                          <>
                                            <select onChange={onChangeHandle} value={newUser.location} name={"location"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <option> Seleccione una Localización de la oficina </option>
                                              {
                                                location.map((item: any) => (
                                                    <>
                                                      <option value={item.id}> {item.name} </option>
                                                    </>
                                                ))
                                              }
                                            </select>
                                          </> : null
                                      }
                                  </div>
                                </div>
                            </div>
                            <div onClick={() => setModalOpen(true)} className='mb-5 grid cursor-pointer border-dotted border-2 border-sky-500 rounded-md p-4'>
                              <p className='text-indigo-700 text-[0.9rem]'>Selecionar permisos</p>
                              {
                                selectedPermissions && selectedPermissions.map((item: any) => (
                                  <>
                                      <span className='text-sm'> { item } </span>
                                  </>
                                ))
                              }
                            </div>
                            <div className='mb-5 grid'>
                              <Btn 
                                label={'Actualizar'}
                                onClick={onHandleUpdatedUserPermissions}
                                size={''}
                                disabled={disabled}
                                color={disabled ? 'bg-gray-200' : 'bg-parvalColor'}/>
                            </div>
                          </div>
                      </> : <>
                        <div className="mt-3 pt-16 sm:ml-3 sm:mt-0 lg:ml-0 lg:mt-3">
                          <h3 className="text-sm flex justify-center font-medium text-gray-900">
                            Seleccione una persona
                          </h3>
                        </div>
                      </>
                }
              </div>

              <ModalUserPermis isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                  <ListPermis 
                    permissions={permissions} 
                    selectedPermissions={selectedPermissions} 
                    setSelectedPermissions={setSelectedPermissions} />
              </ModalUserPermis>
        </div>
    </>)

}

export default function EditUsers() {
    return (            
        <>
          <EditUsersComponent />
        </>
    )
}