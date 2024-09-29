import React, { useState, useEffect } from 'react';
import {
  BellIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import ModalComponents from '@/components/organisms/modalComponents';
import { useRouter } from "next/router";
import DetailsFormUsers from  '@/components/organisms/detailsFormUsers';
import { useMsal } from "@azure/msal-react";
import { GetListUsers } from '@/utils/getListUsers';
import { GetUserForEmail } from '@/utils/getUserForEmail';
import { useStorePermissions } from '@/hooks/permissions/StoreProvider';
import { useStoreUsersPermissions } from '@/hooks/usersPermissions/StoreProvider';
import { useStorePerson } from '@/hooks/Person/StoreProvider';
import { useStoreDepartments } from '@/hooks/Departments/StoreProvider';
import { useStoreLocation } from '@/hooks/Location/StoreProvider';
import { useStoreAssignedUserGroups } from "@/hooks/assignedUserGroups/StoreProvider";
import { useAssignedUserGroups } from '@/hooks/assignedUserGroups';
import { usePerson } from '@/hooks/Person';
import { usePermissions } from '@/hooks/permissions';
import { useLocation } from '@/hooks/Location';
import { useDepartments } from '@/hooks/Departments';
import { isEmpty, get } from 'lodash';
import { useUsersPermissions } from '@/hooks/usersPermissions';
import { useNotification } from '@/hooks/Notifications';
import Btn from '@/components/atoms/btn';
import Loading from '@/components/molecules/loading';
import Permissions from '@/utils/permissions';
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import VerificatePermissions from  '@/utils/verificatePermissions';
import UserPermis from '@/components/organisms/userPermis';

const secondaryNavigation = [
  { name: 'Usuarios', icon: UserCircleIcon },
  { name: 'Permisos', icon: KeyIcon },
  // { name: 'Notificaciones', icon: BellIcon },
];

function ConfiguracionComponents() {
  const [currentPage, setCurrentPage] = useState('Usuarios');
  const { accounts, instance } = useMsal();
  const [ loading, setLoading ] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [disabledPermissions, setDisabledPermissions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedPerson, setSelectedPerson]: any = useState({});
  const [ permissionsValue, setPermissionsValue ] = useState(false);
  const { showNotification } = useNotification();
  const [ duplicate , setDuplicate ] = useState(false);
  const [ newUser, setNewUser ]: any = useState({
    userId: '',
    name: '',
    area: '',
    location: '',
    jobTitle: '',
    admissionDate: null,
    birthdate: null
  });

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

  const [ newPermissions, setNewPermissions ] = useState({
    codePermission: '',
    description: '',
  });

  const clearInfo = () => {
    setDisabled(false);
    setSelectedPermissions([]);
    setSelectedPerson({});
    setNewUser({
      userId: '',
      name: '',
      jobTitle: '',
      area: '',
      location: '',
      admissionDate: null,
      birthdate: null
    });
    setFile(null);
  }

  const { permissions } = useStorePermissions();
  const { usersPermissions } = useStoreUsersPermissions();
  const { person } = useStorePerson();
  const { departments } = useStoreDepartments();
  const { location } = useStoreLocation();
  const { authLogin } = useStoreAuthLogin();
  const router = useRouter();

  const { getAllPermissions, savePermissions } = usePermissions();
  const { updatedAssignedUserGroups } = useAssignedUserGroups();
  const { getAllPersons, savePerson, updatedPerson } = usePerson();
  const { getAllLocation } = useLocation();
  const { getAllDepartments } = useDepartments();
  const { 
    getAllUsersPermissions,
    saveUsersPermissions,
    updateUsersPermissions } = useUsersPermissions();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
        await Promise.all([
          getAllPermissions(),
          getAllUsersPermissions(),
          getAllPersons(),
          getAllLocation(),
          getAllDepartments(),
        ]);
      setLoading(false);
    }
    if(isEmpty(permissions) || isEmpty(usersPermissions) || isEmpty(person) || isEmpty(departments) || isEmpty(location)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchUserForEmail = async (email: string) => {
    try {
      await GetUserForEmail(accounts[0], instance, email).then((res: any) => {
        if (res && !isEmpty(res.data)) {
          setSelectedPerson(res.data);
          const userExist = person.filter((item: any) => res.data.id === item.userId); 
          if(!isEmpty(userExist)) {
            setDuplicate(true);
          } else {
            setDuplicate(false);
          }
        }
      });
    } catch(e) {
      setSelectedPerson({});
      console.log(e);
    }
  }

  const onClosePermissions = () => {
    setNewPermissions({
      codePermission: '',
      description: '',
    });
    setIsOpen(false);
    setDisabledPermissions(false);
  }

  useEffect(() => {
    if(selectedPerson && selectedPerson.id) {
      setNewUser({
        userId: get(selectedPerson, 'id', ''),
        name: get(selectedPerson, 'displayName', ''),
        jobTitle: get(selectedPerson, 'jobTitle', ''),
        area: '',
        location: '',
        admissionDate: null,
        birthdate: null
      });
    }
  }, [selectedPerson]);

  useEffect(() => {
    if(newPermissions.description === '' || newPermissions.codePermission === '') {
      setDisabledPermissions(true);
    } else {
      setDisabledPermissions(false);
    }
  }, [newPermissions]);

  useEffect(() => {
    if(newUser.area === '' || newUser.location === '' || newUser.name === '' || newUser.jobTitle === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newUser]);

  const onSavePermissions = async () => {
    if(!disabledPermissions) {
     await savePermissions(newPermissions);
     onClosePermissions();
    }
  }

  const onHandleSaveUserPermissions = async () => {
    let dataFrontPage: string = '';
    let image: boolean = false;
    try {
      dataFrontPage = await handleUpload().then((res: any) => {
        if(res.data.data.success) {
          return res.data.data.urlImage;
        }
      });
      image = true;
    } catch(e: any) {
      dataFrontPage = '';
      image = true;
    }
        
    const data: any = {
      ...newUser,
      urlImage: dataFrontPage
    }
    await savePerson(data).then(async () => {
      await saveUsersPermissions({
        userId: get(selectedPerson, 'id', 0),
        permissions: selectedPermissions,
      }).then(() => {
        clearInfo();
        showNotification('Se Agrego Correctamente.', "success");
      })
    });
  }

  useEffect(() => {
    if(get(selectedPerson, 'id', 0) && usersPermissions && usersPermissions.length) {
      const info = usersPermissions.filter((item: any) => item.userId === selectedPerson.id);

      if(info.length) {
        setSelectedPermissions(info[0].permissions);
      }

    }
  }, [selectedPerson, usersPermissions]);

  const onHandleChangesPermissions = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    let modifyCode = '';
    if(name === 'codePermission') { 
      modifyCode = value.replace(/ /g, "_");
    }
    setNewPermissions(newPermissions => ({...newPermissions, [name]: name === 'codePermission' ? modifyCode.toLocaleUpperCase() : value }));
  }


  useEffect(() => {
    if(!isEmpty(authLogin.permissions)) {
      setPermissionsValue(VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.ADMINISTRADOR_PERMISOS, Permissions.SUPER_ADMINISTRADOR]))
    }
  }, [authLogin]);

  useEffect(() => {
    if(!isEmpty(editUserInfo) && !isEmpty(usersPermissions)) {
      const info = usersPermissions.filter((item: any) => item.userId === get(editUserInfo, 'userId', ''));
      if(info.length) {
        setSelectedPermissions(info);
      }
    }
  }, [editUserInfo]);

  useEffect(() => {
    if(get(authLogin, 'id', false) && !isEmpty(authLogin.permissions)) {
        const verify = VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.ADMINISTRADOR_PERMISOS, Permissions.ADMINISTRADOR, Permissions.SUPER_ADMINISTRADOR]);
        if(!verify) {
            router.push('/');
        }
    }
  }, [authLogin])


  return (
    <>
      {
        loading ?
          <>
            <div className={'pt-20'}>
                <div className={'flex justify-center'}>
                  <Loading name={'Cargando ...'} />
                </div>
            </div>
          </> :
          <div className="mx-auto lg:flex">
            {/* List menu */}
            <aside className="flex overflow-x-auto md:w-[790px] w-[380px] lg:w-[230px] border-b border-gray-900/5 lg:block lg:flex-none lg:border-0">
              <nav className="flex-none px-4 sm:px-6 lg:px-0 border-r-[1px] border-[#E1E3E6] h-auto lg:h-screen">
                <ul role="list" className="flex gap-x-3 gap-y-[1rem] whitespace-nowrap lg:flex-col">
                  {secondaryNavigation.map((item: any) => (
                    <>
                      {
                        item.name === 'Permisos' && !permissionsValue ?
                          null :
                          <li key={item.name}>
                            <span
                              onClick={() => setCurrentPage(item.name)}
                              style={{ cursor: 'pointer' }}
                              className={`group flex gap-x-3 rounded-md p-4 text-sm leading-6 font-semibold
                                ${currentPage === item.name ? 'bg-gray-50 text-parvalColor' : 'text-gray-700 hover:text-parvalColor hover:bg-gray-50'}`}
                            >
                              <item.icon
                                className={`h-6 w-6 shrink-0
                                  ${currentPage === item.name ? 'text-parvalColor' : 'text-gray-400 group-hover:text-parvalColor'}`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </span>
                          </li>
                      }
                    </>
                  ))}
                </ul>
              </nav>
            </aside>

            <main className="bg-[#F8FAFC] px-12 py-5 overflow-y-auto h-screen sm:px-6 lg:flex-auto">
              {currentPage === 'Usuarios' && <UserPermis 
                                                setSelectedPermissions={setSelectedPermissions}
                                                onSearchUserForEmail={onSearchUserForEmail}
                                                clearInfoData={clearInfo}
                                                newUser={newUser}
                                                newUserPermissions={authLogin && VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.ADMINISTRADOR, Permissions.SUPER_ADMINISTRADOR])}
                                                editUserInfo={setEditUserInfo}
                                                showEditUser={setShowInfo}
                                                setFile={setFile}
                                                disabled={disabled}
                                                duplicate={duplicate}
                                                setNewUser={setNewUser}
                                                crearPermissionsUsers={onHandleSaveUserPermissions}
                                                listUsersPermissions={person && person.length ? person : []}
                                                selectedPerson={selectedPerson}
                                                selectedPermissions={selectedPermissions}
                                                permissions={permissions}
                                                departments={departments && departments.length ? departments : []}
                                                location={location && location.length? location : []} />}
              {currentPage === 'Permisos' &&  <div>
                    <div>

                    </div>
                    <div className={'grid gap-4'}>
                      <div className={'flex justify-end'}>
                        <Btn label={'Nuevo Permiso'} onClick={() => setIsOpen(true)} size={'mt-5 md:mt-0 h-10'} color={'bg-[#f3bb33]'} />
                      </div>
                      <ul role="list" className="divide-y p-2 h-[675px] bg-white  divide-gray-100 overflow-auto ring-1 ring-gray-900/5 sm:rounded-xl">
                        {
                          permissions && permissions.length ? permissions.map((item: any, index: number) => (
                            <>
                              <li key={index} className="flex items-center mb-2 bg-gray-50 px-4 py-2 rounded justify-between gap-x-6 py-5">
                                <div className="min-w-0">
                                  <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{ item.codePermission} </p>
                                  </div>
                                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    { item.description}
                                  </div>
                                </div>
                              </li>
                            </>
                          )) : <>
                            <div>
                              No Tiene Permisos Registrados
                            </div>
                          </>
                        }
                        
                      </ul>
                    </div>
                </div>}
              {/* {currentPage === 'Notificaciones' && <div>Contenido de Notificaciones</div>} */}
            </main>
            <DetailsFormUsers 
              show={showInfo} 
              user={editUserInfo}
              permissions={permissions}
              departments={departments}
              selectedPermissions={selectedPermissions}
              updateUsersGroups={updatedAssignedUserGroups}
              location={location && location.length? location : []}
              updatedPerson={updatedPerson}
              updateUsersPermissions={updateUsersPermissions}
              saveUsersPermissions={saveUsersPermissions}
              showNotification={showNotification}
              close={() => {
                setShowInfo(false);
                setEditUserInfo({});
                setSelectedPermissions([]);
              }} />
          </div>
      }    
      <ModalComponents 
        isOpen={isOpen}
        onClose={onClosePermissions}>
         <> 
              <div className="p-6">
                {
                  loading ?
                    <div className={'pt-20'}>
                        <div className={'flex justify-center'}>
                          <Loading name={'Cargando ...'} />
                        </div>
                    </div>
                    :
                    <>
                      <div className='flex justify-center'>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">
                            Agregar Nuevo Permiso
                          </h2>
                      </div>
                      <div className='py-2'>
                          <hr />
                        </div>
                      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="codePermission" className="block text-sm font-semibold leading-6 text-gray-900">
                              Codigo Permiso
                            </label>
                            <div className="mt-2.5">
                              <input
                                type={"text"}
                                name={"codePermission"}
                                onChange={onHandleChangesPermissions}
                                id={"codePermission"}
                                value={newPermissions.codePermission}
                                className={"block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                              Descripcion del Permiso
                            </label>
                            <div className="mt-2.5">
                              <textarea
                                name={"description"}
                                id={"description"}
                                rows={4}
                                onChange={onHandleChangesPermissions}
                                className={"block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                value={newPermissions.description}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='py-4'>
                          <hr />
                        </div>
                        <div className="mt-2 grid grid-cols-2">
                          <div>
                            <button
                              style={{ cursor: 'pointer' }}
                              onClick={onClosePermissions}
                              className="rounded-md bg-gray-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Cerrar
                            </button>
                          </div>
                          <div className={'flex justify-end'}>
                            <Btn 
                              label={'Guardar Permiso'} 
                              disabled={disabledPermissions}
                              onClick={onSavePermissions} 
                              size={'mt-5 md:mt-0 h-10'} 
                              color={'bg-[#f3bb33]'} />
                          </div>
                        </div>
                      </div>
                    </>
                }
              </div>
         </>     
      </ModalComponents>
    </>
  );
}

export default function Configuracion() {
  return (
    <>
      <ConfiguracionComponents />
    </>
  )
}
