import React, { useEffect, useState } from 'react';
import Btn from '../atoms/btn';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import InputAutoComplit from '../atoms/inputAutoComplit';
import ModalUserPermis from './modalUserPermis';
import ListPermis from '../molecules/listPermis';
import SearchInput from '../atoms/searchInput';
import { isEmpty, get } from 'lodash';
import InputComponent from '@/components/atoms/inputUi';
import Image from 'next/image';

interface UserPermisProps {
  people: any[],
  disabled: boolean;
  permissions: any[],
  setSelectedPermissions: any;
  editUserInfo: any;
  showEditUser: any;
  selectedPermissions: string[];
  selectedPerson: any;
  setSelectedPerson: void;
  listUsersPermissions: any[];
  location?: any[];
  departments: any[];
  crearPermissionsUsers: any;
  newUserPermissions?: boolean;
  newUser: any;
  setFile?: any;
  setNewUser: any;
  clearInfoData: any;
}

export default function UserPermis(props: UserPermisProps) {
  const [isNuevoUsuarioVisible, setNuevoUsuarioVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ searchPersons, setSearchPersons ]: any[] = useState([]);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    props.setNewUser((newUser: any) => ({...newUser, [name]: value}));
  }

  const handlePreloaderImage = async (event: any) => {
    props.setFile(event.target.files[0]);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    if(!isEmpty(props.listUsersPermissions)) {
      setSearchPersons(props.listUsersPermissions.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, props.listUsersPermissions])

  return (
    <>
      {/* Title and btn*/}
      <div className='block md:flex justify-between'>
        <div>
          <h2 className="text-base font-semibold leading-6 text-gray-900">Usuarios</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">Usuario y asignacion de permisos</p>
        </div>
        {isNuevoUsuarioVisible ? (
          // Botón para volver atrás si se está mostrando el contenido de usuarios
          <Btn label={'Volver atrás'} onClick={() => {
            setNuevoUsuarioVisible(false);
            props.clearInfoData();
          }} size={'mt-5 md:mt-0 h-10'} color={'bg-gray-200'}/>
        ) : (
          <>
            {
               props.newUserPermissions ?
                <>
                  <Btn label={'Nuevo usuario'} onClick={() => setNuevoUsuarioVisible(true)} size={'mt-5 md:mt-0 h-10'} color={'bg-[#f3bb33]'}/>
                </> : null
            }
          </>
        )}
      </div>

      {/* Body content user */}
      {isNuevoUsuarioVisible ? (
        // contenido de permisos
        <div className='mt-5 overflow-y-scroll bg-white p-5 h-[500px] lg:h-[650px] 2xl:h-[870px] border border-[#E9EBED] rounded'>
              <InputAutoComplit 
                setSelectedPerson={props.setSelectedPerson} 
                selectedPerson={props.selectedPerson} 
                people={props.people} />

              <div className='grid sitems-center justify-center'>
                {
                    props.selectedPerson && get(props.selectedPerson, 'id', 0) ?
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
                                            {previewURL && (
                                                <>
                                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Imagen cargada:
                                                    </label>
                                                    <div className="mt-2">
                                                        <Image
                                                            src={previewURL}
                                                            width={1080}
                                                            height={1080}
                                                            className={"w-40 h-38 border rounded mt-2"}
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
                                      defaultValue={props.selectedPerson.displayName}
                                      name={'name'}
                                      label={''}
                                      placeholder={'Nombre'}
                                  />
                                <span className='text-sm text-gray-500'>
                                  { props.selectedPerson.mail }
                                </span>
                            </div>

                            <div className='mb-1 mt-2 grid grid-cols-2 gap-4'>
                                
                                <InputComponent
                                      type={'text'}
                                      onChange={onChangeHandle}
                                      defaultValue={props.selectedPerson.jobTitle}
                                      name={'jobTitle'}
                                      label={'Puesto'}
                                      placeholder={'Posicion'}
                                  />
                                <InputComponent
                                      type={'date'}
                                      onChange={onChangeHandle}
                                      defaultValue={props.selectedPerson.birthdate}
                                      name={'birthdate'}
                                      label={'Fecha de Nacimiento'}
                                      placeholder={'Fecha de Nacimiento'}
                                  />
                            </div>

                            <div className='mb-1 mt-2 grid'>
                                <InputComponent
                                      type={'date'}
                                      onChange={onChangeHandle}
                                      defaultValue={props.selectedPerson.admissionDate}
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
                                        props.departments && props.departments.length ?
                                          <>
                                            <select onChange={onChangeHandle} name={"area"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                  </div>
                                  <div>
                                    <label className='text-sm text-gray-500'>Localización de la oficina</label>
                                    {
                                        props.location && props.location.length ?
                                          <>
                                            <select onChange={onChangeHandle} name={"location"} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                  </div>
                                </div>
                            </div>
                            <div onClick={() => setModalOpen(true)} className='mb-5 grid cursor-pointer border-dotted border-2 border-sky-500 rounded-md p-4'>
                              <p className='text-indigo-700 text-[0.9rem]'>Selecionar permisos</p>
                              {
                                props.selectedPermissions && props.selectedPermissions.map((item: any) => (
                                  <>
                                      <span className='text-sm'> { item } </span>
                                  </>
                                ))
                              }
                            </div>
                            <div className='mb-5 grid'>
                              <Btn 
                                label={'Crear'}
                                onClick={props.crearPermissionsUsers}
                                size={''}
                                disabled={props.disabled}
                                color={props.disabled ? 'bg-gray-200' : 'bg-parvalColor'}/>
                            </div>
                          </div>
                      </> : <>
                        <div className="mt-3 pt-16 sm:ml-3 sm:mt-0 lg:ml-0 lg:mt-3">
                          <h3 className="text-sm flex justify-center font-medium text-gray-900">
                            Seleccione una persona
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            Debe seleccionar una persona para asignar permisos
                          </p>
                        </div>
                      </>
                }
              </div>
              {/* Modal permis content */}
              <ModalUserPermis isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <ListPermis 
                  permissions={props.permissions} 
                  selectedPermissions={props.selectedPermissions} 
                  setSelectedPermissions={props.setSelectedPermissions} />
              </ModalUserPermis>
        </div>
            
      ) : (

        // contenido de usuarios
        <>
          <div>
            <SearchInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setSearch(value);
              }}
              type={'text'}
              name={'search'}
              value={search}
              placeholder={"Buscar Personas"} />
          </div>
          <div className='mt-5 overflow-y-scroll bg-white p-5 h-[500px] lg:h-[650px] 2xl:h-[870px] border border-[#E9EBED] rounded'>
            <ul role="list" className="divide-y divide-gray-100">
              
              {props.listUsersPermissions && (search !== '' ? searchPersons : props.listUsersPermissions).map((person: any) => (
                <>
                    <li onClick={() => {
                      props.editUserInfo(person);
                      props.showEditUser(true);
                    }} key={person.id} className="relative flex justify-between py-5" style={{ cursor: 'pointer' }}>
                        <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                            {/* <Image
                              priority
                              src={person.urlImage}
                              width={1080}
                              height={1080}
                              alt={"logo de parval"}
                              className={"h-12 w-12 flex-none rounded-full bg-gray-50"}
                            /> */}
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {person.name}
                              </p>
                              <p className="flex text-[0.8rem] leading-5 text-gray-500">
                                { !isEmpty(person.area) && !isEmpty(props.departments) ? get((props.departments.find(item => String(get(item, 'id', '')) === String(get(person, 'area', '')))), 'name', '') : ''}
                              </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
                            <div className="hidden sm:block">
                              <p className="text-sm leading-6 text-gray-900">{person.jobTitle}</p>
                            </div>
                            <ChevronRightIcon  className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> 
                        </div>
                    </li>
                </>
              ))}
            </ul>
          </div>
        </>
    
      )}
    </>
  );
}
