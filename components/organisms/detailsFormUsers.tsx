import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputComponent from '@/components/atoms/inputUi';
import Image from "next/image";
import { get, set, isEmpty } from 'lodash';
import ModalUserPermis from '@/components/organisms/modalUserPermis';
import ListPermis from '@/components/molecules/listPermis';
import { TrashIcon } from '@heroicons/react/24/outline';

interface DetailsFormUsersProps {
    permissions?: any[];
    departments?: any[];
    location?: any[];
    user: any;
    updatedPerson: any;
    selectedPermissions: any[];
    updateUsersPermissions: any;
    updateUsersGroups?: any;
    saveUsersPermissions: any;
    showNotification: any;
    action?: any;
    close: any;
    show: boolean;
}

const DetailsFormUsers: React.FC<DetailsFormUsersProps> = (props: DetailsFormUsersProps) => {

    const [loading, setLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalGroupsOpen, setModalGroupsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([
      'STAFF',
      'SENIOR',
      'MANAGER',
      'SENIOR MANAGER',
      'DIRECTOR'
    ]);

    const [ newUser, setNewUser ]: any = useState({
        name: '',
        area: '',
        location: '',
        jobTitle: '',
        admissionDate: null,
        birthdate: null
      });

    const handleSelect = (item: string) => {
      setSelectedGroups([...selectedGroups, item]);
      setIsOpen(false);
    };
    
    const handleRemove = (item: string) => {
      setSelectedGroups(selectedGroups.filter(selected => selected !== item));
    };

    useEffect(() => {
        if(!isEmpty(props.user)) {
          if(!isEmpty(props.user.group)){
            setSelectedGroups(props.user.group);
          }
          setNewUser({
            name: props.user.name,
            jobTitle: props.user.jobTitle,
            area: get(props.user, 'area.id', 0) ? props.user.area.id : get(props.user, 'area', 0),
            location: get(props.user, 'location.id', 0) ? props.user.location.id : get(props.user, 'location', 0),
            admissionDate: get(props.user, 'admissionDate', null),
            birthdate: get(props.user, 'birthdate', null)
          });
        }
      }, [props.user]);

    useEffect(() => {
        if(!isEmpty(props.selectedPermissions)) {
          setSelectedPermissions(props.selectedPermissions[0].permissions)
        }
    }, [props.selectedPermissions]);  

    const clearInfo = () => {
      setNewUser({
        name: '',
        jobTitle: '',
        area: '',
        location: '',
        admissionDate: null,
        birthdate: null
      });
      setFile(null);
      props.close;
    }  

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
  
          return new Promise((resolve, reject) => {
              reader.onloadend = async () => {
                  try {
                      const base64Image = reader.result.split(',')[1];
                      const infoImege = await axios.post(`/api/azureBlobStorage?type=${get(file, 'type', '')}`, {base64Image});
                      console.log('Imagen cargada con éxito');
                      resolve(infoImege.data.urlImage); // Resuelve con la URL de la imagen
                  } catch (error: any) {
                      console.error('Error al cargar la imagen:', error.message);
                      reject(error);
                  }
              };
              reader.onerror = (error: any) => {
                  reject(error);
              };
          });
      } catch (error: any) {
          console.error('Error al cargar la imagen:', error.message);
          throw error;
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
         const dataS =  await handleUpload();

          if(dataS) {
            set(data, 'urlImage', dataS);
          }
          image = true;
        } catch(e: any) {
          dataFrontPage = '';
          image = true;
        }

        setLoading(true);
        await props.updatedPerson(props.user.id, data).then(async () => {
          try {
            await props.updateUsersGroups({
              personId: props.user.userId,
              groups: selectedGroups,
            })
          } catch(e) {
            console.log(e)
          }
          if(!isEmpty(props.selectedPermissions)) {
            await props.updateUsersPermissions(props.selectedPermissions[0].id, {
              userId: props.user.userId,
              permissions: selectedPermissions,
            }).then(() => {
              setLoading(false);
              clearInfo();
              props.close();
              props.showNotification('Se agrego correctamente.', "success");
            })
          } else {
            await props.saveUsersPermissions({
              userId: props.user.userId,
              permissions: selectedPermissions,
            }).then(() => {
              setLoading(false);
              clearInfo();
              props.close();
              props.showNotification('Se agrego correctamente.', "success");
            })
          }
        });
  }
    return (
        <>
            {
                props.show ?
                    <>
                    <div className="relative z-10" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto relative w-96">
                                <div className="h-full overflow-y-auto bg-white p-8">
                                    <div className="space-y-6 pb-16">
                                    <div>
                                        <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg py-8">
                                            {/* <Image
                                                width={1024}
                                                height={1024}
                                                alt={"perfil"}
                                                priority
                                                src={props.user ? props.user.urlImage : 'peopple.png'} 
                                                className="object-cover w-36 h-36" /> */}
                                            <div className='grid flex gap-4 items-center justify-center'>
                                                  <div>
                                                          {(previewURL || props.user) && (
                                                              <> 
                                                                  <div className="mt-2">
                                                                      <Image
                                                                          src={previewURL ? previewURL : get(props.user, 'urlImage', '')}
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
                                                <div>
                                                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25  py-2">
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
                                          </div>    
                                        </div>
                                        <div className="mt-4 flex items-start justify-between">
                                        <div>
                                            <h2 className="text-base font-semibold leading-5 text-gray-900">
                                                { get(props.user, 'name', '') }
                                            </h2>
                                            <p className="text-sm font-medium text-gray-500">
                                                { get(props.user, 'jobTitle', '') }
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Informacion</h3>
                                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                        <div className="grid grid-cols-3 py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                                Nombre
                                            </dt>
                                            <dd className="col-span-2">
                                                <InputComponent
                                                    type={'text'}
                                                    onChange={onChangeHandle}
                                                    defaultValue={get(newUser, 'name', '')}
                                                    name={'name'}
                                                    label={''}
                                                    placeholder={'Nombre'}
                                                />
                                            </dd>
                                        </div>
                                        <div className="flex grid grid-cols-3 justify-between py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                              Puesto
                                            </dt>
                                            <dd className="col-span-2">
                                                <InputComponent
                                                    type={'text'}
                                                    onChange={onChangeHandle}
                                                    defaultValue={get(newUser, 'jobTitle', '')}
                                                    name={'jobTitle'}
                                                    label={''}
                                                    placeholder={'Posicion'}
                                                />
                                            </dd>
                                        </div>
                                        <div className="flex grid grid-cols-3 justify-between py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                              Fecha de Nacimiento
                                            </dt>
                                            <dd className="col-span-2">
                                                <InputComponent
                                                    type={'date'}
                                                    onChange={onChangeHandle}
                                                    defaultValue={get(newUser, 'birthdate', 0) ? get(newUser, 'birthdate', '').slice(0,10) : ''}
                                                    name={'birthdate'}
                                                    label={''}
                                                    placeholder={'Fecha de Nacimiento'}
                                                />
                                            </dd>
                                        </div>
                                        <div className="flex grid grid-cols-3 justify-between py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                              Fecha de Ingreso
                                            </dt>
                                            <dd className="col-span-2">
                                                <InputComponent
                                                    type={'date'}
                                                    onChange={onChangeHandle}
                                                    defaultValue={get(newUser, 'admissionDate', 0) ? get(newUser, 'admissionDate', '').slice(0,10) : ''}
                                                    name={'admissionDate'}
                                                    label={''}
                                                    placeholder={'Fecha de Ingreso'}
                                                />
                                            </dd>
                                        </div>
                                        <div className="flex grid grid-cols-3 justify-between py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                                Departamento
                                            </dt>
                                            <dd className="col-span-2">
                                                  {
                                                    props.departments && props.departments.length ?
                                                      <>
                                                        <select onChange={onChangeHandle} value={newUser.area} name={"area"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                          <option> Seleccione un Departamento </option>
                                                          {
                                                            props.departments.map((item: any) => (
                                                                <>
                                                                  <option value={item.id}> {item.name} </option>
                                                                </>
                                                            ))
                                                          }
                                                        </select>
                                                      </> : null
                                                  }
                                            </dd>
                                        </div>
                                        <div className="flex grid grid-cols-3 justify-between py-3 text-sm font-medium">
                                            <dt className="flex items-center">
                                              Localización
                                            </dt>
                                            <dd className="col-span-2">
                                                {
                                                  props.location && props.location.length ?
                                                    <>
                                                      <select onChange={onChangeHandle} value={newUser.location} name={"location"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                      <option> Seleccione una Localización de la oficina </option>
                                                        {
                                                          props.location.map((item: any) => (
                                                              <>
                                                                <option value={item.id}> {item.name} </option>
                                                              </>
                                                          ))
                                                        }
                                                      </select>
                                                    </> : null
                                                }
                                            </dd>
                                        </div>
                                        </dl>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-medium text-gray-900">Lista de Permisos</h3>
                                        <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                          {
                                            selectedPermissions && selectedPermissions.map((item: any) => (
                                              <>
                                                  <li className="flex items-center justify-between py-3">
                                                      <div className="flex items-center">
                                                        <p className="ml-4 text-sm font-medium text-gray-900">{ item }</p>
                                                      </div>
                                                  </li>
                                              </>
                                            ))
                                          }
                                          <li className="flex items-center justify-between py-2">
                                              <button type="button" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }}  className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>
                                                </span>
                                                <span className="ml-4 text-sm font-medium text-gray-600 group-hover:text-gray-500">
                                                    Agregar o remover Permisos 
                                                  </span>
                                              </button>
                                          </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900"> Lista Grupos Asignados</h3>
                                        <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                          {
                                            selectedGroups && selectedGroups.map((item: any) => (
                                              <>
                                                  <li className="flex items-center justify-between py-3">
                                                      <div className="flex items-center">
                                                        <p className="ml-4 text-sm font-medium text-gray-900">{ item }</p>
                                                      </div>
                                                  </li>
                                              </>
                                            ))
                                          }
                                          <li className="flex items-center justify-between py-2">
                                              <button type="button" onClick={() => setModalGroupsOpen(true)} style={{ cursor: 'pointer' }}  className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>
                                                </span>
                                                <span className="ml-4 text-sm font-medium text-gray-600 group-hover:text-gray-500">
                                                    Agregar o remover Grupos 
                                                  </span>
                                              </button>
                                          </li>
                                        </ul>
                                    </div>
                                    <div className="flex">
                                          {
                                            loading ?
                                              <>
                                                <div role="status" className='flex justify-center'>
                                                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                  </svg>
                                                  <span className="sr-only">Loading...</span>
                                              </div>
                                              </> : <>
                                                <button 
                                                  type={"button"}
                                                  onClick={onHandleUpdatedUserPermissions}
                                                  className="flex-1 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-yellow-600">
                                                    Actualizar
                                                </button>
                                                <button onClick={props.close} type="button" className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    Cerrar
                                                </button>
                                              </>
                                          }
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </> : null
            }
            <ModalUserPermis isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                  <ListPermis 
                    permissions={props.permissions} 
                    selectedPermissions={selectedPermissions} 
                    setSelectedPermissions={setSelectedPermissions} />
            </ModalUserPermis>


              <ModalUserPermis isOpen={modalGroupsOpen} onClose={() => setModalGroupsOpen(false)}>
                <>
                    <div className="isolate bg-white p-2 flex">
                        <div className="webkit-center px-4 pb-5 sm:px-0 items-center">
                          <div className="grid grid-cols-2 gap-4">
                            <div className='px-2'>
                                <label id="listbox-label" className="block text-sm font-medium text-gray-900">
                                    Seleccione Grupos
                                </label>
                                <div className="relative p-2">
                                    <button
                                        type="button"
                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                        aria-haspopup="listbox"
                                        aria-expanded={isOpen}
                                        aria-labelledby="listbox-label"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <span className="block truncate">
                                          { options.length ? 'Seleccione un Grupo' : 'No existen mas opciones' }
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <svg
                                            className="h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                                clipRule="evenodd"
                                            />
                                            </svg>
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <ul
                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                            role="listbox"
                                            aria-labelledby="listbox-label"
                                            style={{ height: 'auto' }}
                                        >
                                            {options.filter((option: string) => !selectedGroups.includes(option)).map((option) => (
                                                <>
                                                    <li
                                                        key={option}
                                                        className="relative cursor-default select-none py-2 pl-4 pr-4 text-gray-900"
                                                        role="option"
                                                        onClick={() => handleSelect(option)}
                                                    >
                                                        <span className="block truncate font-normal border-b-2" style={{ cursor: 'pointer' }}>{ option }</span>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-900">Grupos Asignados al directorio</h2>
                                <table className={"min-w-full divide-y divide-gray-300"}>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Eliminar</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <div className='max-h-72 overflow-y-auto'>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {
                                                selectedGroups.map((item: any) => (
                                                    <>
                                                        <tr>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"> { item } </td>
                                                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm sm:table-cell">
                                                                <TrashIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-gray-600 rounded-full"} onClick={() => handleRemove(item)} style={{ cursor: 'pointer' }} />
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                        </tbody>
                                    </div>
                                </table>
                            </div>

                          </div>
                        </div>
                    </div>

                </>
              </ModalUserPermis>
        </>
    )
}

export default DetailsFormUsers;