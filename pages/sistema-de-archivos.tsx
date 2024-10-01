import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import ModalComponents from '@/components/organisms/modalComponents';
import Loading from '@/components/molecules/loading';
import Btn from '@/components/atoms/btn';
import { isEmpty } from 'lodash';
import { useDepartments } from '@/hooks/Departments'; 
import { useStoreDepartments } from "@/hooks/Departments/StoreProvider";
import { useFileSystemDepartments } from '@/hooks/FileSystemDepartments'; 
import { useStoreFileSystemDepartments } from "@/hooks/FileSystemDepartments/StoreProvider";
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { 
    CheckIcon, 
    TrashIcon,
    DocumentTextIcon, 
    FolderPlusIcon,
    FolderIcon, 
    EyeIcon, 
    FolderOpenIcon, 
    CloudArrowUpIcon, 
    PhotoIcon,
    PencilIcon,
    LockClosedIcon,
    ArrowDownCircleIcon
} from '@heroicons/react/24/outline';
import { WORDIcons, PDFIcons, XLSIcons } from '@/components/molecules/DesingIcons';
import VerificatePermissions, { VerificateEnabledGroup } from  '@/utils/verificatePermissions';
import Permissions from '@/utils/permissions';
import { GetFormatDateAndYear } from '@/utils/getMonthForDate';

interface IFilePlus {
  name: string;
  url?: string;
  document?: IFilePlus[];
  permissions?: any[];
  type: 'file' | 'folder';
}

const IconShow = (url: string) => {
    if(!isEmpty(url)) {
        const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
        const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';
    
        let icons;
        switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            icons = <PhotoIcon className={"mx-auto text-gray-400 h-7 w-7 hover:text-parvalColor rounded-full"} />
            break;
        case 'pdf':
            icons = <PDFIcons h={'h-12'} w={'w-12'} classAditional={'bg-transparent'}  />
            break;
        case 'doc':
        case 'docx':
            icons = <WORDIcons h={'h-10'} w={'w-10'} classAditional={'bg-transparent'} />
            break;
        case 'xls':
        case 'xlsx':
            icons = <XLSIcons h={'h-12'} w={'w-12'} classAditional={'bg-transparent'} />
            break;
        default:
            icons = <DocumentTextIcon className={"mx-auto text-gray-400 h-8 w-8 hover:text-white rounded-full"} />
            break;
        }
        return icons;
    }
  };

function IndexSistemaDeArchivos() {
  
  const { getAllDepartments } = useDepartments();
  const { getAllFileSystemDepartments, updateFileSystemDepartments, sendNotificationFileSystemDepartments } = useFileSystemDepartments();
  const { getAuthLogin } = useAuthLogin();
  const [ categorySelect, setCategorySelect] = useState(0);
  const { authLogin } = useStoreAuthLogin();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [ modalPdf, setModalPdf ] = useState(false);
  const [ reloadDelete, setReloadDelete ] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [fileSelect, setFileSelect] = useState('');
  const [folderSelect, setFolderSelect] = useState('');
  const [ editFolderName, setEditFolderName] = useState('');
  const [typeFileSelect, setTypeFileSelect] = useState('file');
  const [listDocumentsSelect, setListDocumentsSelect]: any = useState([]);
  const [fileName, setFileName] = useState('');
  const [data, setData]: any = useState([]);
  const [NameRemove,  setNameRemove]= useState('');
  const { departments } = useStoreDepartments() || [];
  const { fileSystemDepartments } = useStoreFileSystemDepartments() || [];
  const [permissions, setPermissions] = useState([]);
  const [file, setFile]: any = useState(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [preloading, setPreloading] = useState(false);
  const [loadingMakeFolders, setLoadingMakeFolders] = useState(false);
  const [searchFile, setSearchFile] = useState('');
  const [searchFolder, setSearchFolder] = useState('');
  const [filterDataFile, setFilterDataFile] = useState([]);
  const [filterDataFolder, setFilterDataFolder] = useState([]);
  const [ permissionsValue, setPermissionsValue ] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([
    'STAFF',
    'SENIOR',
    'MANAGER',
    'SENIOR MANAGER',
    'DIRECTOR'
  ]);

  const handleSelect = (item: string) => {
    setSelectedItems([...selectedItems, item]);
    setIsOpen(false);
  };

  const handleRemove = (item: string) => {
    setSelectedItems(selectedItems.filter(selected => selected !== item));
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        getAuthLogin(),
        getAllDepartments(),
        getAllFileSystemDepartments(),
      ]);
      setLoading(false);
    }
    if(isEmpty(departments) || isEmpty(fileSystemDepartments)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if(searchFile !== '') {
        const infoFilter = listDocumentsSelect.filter((item: any) => item.name.toLowerCase().includes(searchFile.toLowerCase()))
        if(isEmpty(infoFilter)) {
            setFilterDataFile([])
        } else {
            setFilterDataFile(infoFilter);
        }
    }
  }, [searchFile])

  useEffect(() => {
    if(searchFolder !== '' || fileSelect !== '') {
        const infoFilter = data[fileSelect].filter((item: any) => item.name.toLowerCase().includes(searchFolder.toLowerCase()))
        if(isEmpty(infoFilter)) {
            setFilterDataFolder([]);
            setFolderSelect('');
            setListDocumentsSelect([]);
        } else {
            setFilterDataFolder(infoFilter);
            setFolderSelect('');
            setListDocumentsSelect([]);
        }
    }
  }, [searchFolder])

  const [orderedData, setOrderedData]: any = useState([]);

  const addNewItem = (type: string) => {
    if (fileName.trim() === '') return;
    setPreloading(true);
  
    const updatedData = { ...data };
    
      if (typeFileSelect === 'file') {
        if (folderSelect) {
            const folderIndex = updatedData[fileSelect].findIndex(
                (item: IFilePlus) => item.name === folderSelect && item.type === 'folder'
            );
                    if (!file) {
                        console.error('Selecciona un archivo antes de cargar');
                        return;
                    }
                
                    try {
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        const reader: any = new FileReader();
                        reader.readAsDataURL(file);
                        let infoImege: any;
                        reader.onloadend = async () => {
                            const base64Image = reader.result.split(',')[1];
                            infoImege = await axios.post(`/api/blobStorageFileSystem?fileType=${get(file, 'type', '')}&containerRoute=${fileSelect}/${folderSelect}&fileName=${fileName}`, {base64Image});
                    
                            if(infoImege.data.urlImage) {
                                await updatedData[fileSelect][folderIndex].document?.push({
                                    name: fileName,
                                    type: 'file',
                                    date: new Date(),
                                    userName: get(authLogin, 'displayName', ''),
                                    userId: get(authLogin, 'id', ''),
                                    url: infoImege.data.urlImage,
                                });
                                onUpdateFileSystem().then(async (res: any) => {
                                    // console.log(res)
                                    if(res.success) {
                                        console.log(res.data, 'res.data', res)
                                        await sendNotificationFileSystemDepartments({ name: `${folderSelect}/${fileName}`, departament: fileSelect, grupos: selectedItems })
                                    }
                                });;
                            }
                        };
                
                        // console.log('Imagen cargada con éxito');
                
                        return {
                        success: true,
                        }
                    } catch (error: any) {
                        console.error('Error al cargar la imagen:', error.message);
                    }
                }          
      } else {
            try {
                setLoadingMakeFolders(true);
                updatedData[fileSelect].push({
                    name: fileName,
                    type: 'folder',
                    date: new Date(),
                    userName: get(authLogin, 'displayName', ''),
                    userId: get(authLogin, 'id', ''),
                    permissions: selectedItems,
                    document: [],
                });
                onUpdateFileSystem()
            } catch(e) {
                console.log(e)
            }
            
      }
    setShow(false);
    setPreloading(false);
    setFileName('');
    setData(updatedData);
    setFile(null);
    setSelectedItems([]);
  };

  const removeItem = async (itemName: string, isFolder: boolean, url?:string) => {
    const updatedData = { ...data };
    setReloadDelete(true);
    try {
        if (isFolder) {
            // Si estamos en el directorio principal
            const indexToRemove = updatedData[fileSelect].findIndex(
              (item: IFilePlus) => item.name === itemName && item.type === (isFolder ? 'folder' : 'file')
            );
        
            if (indexToRemove !== -1) {
              updatedData[fileSelect].splice(indexToRemove, 1);
            }
          } else {
            // Si estamos en un subdirectorio
            const folderIndex = updatedData[fileSelect].findIndex(
              (item: IFilePlus) => item.name === folderSelect && item.type === 'folder'
            );
        
            if (folderIndex !== -1) {
              const itemIndex = updatedData[fileSelect][folderIndex].document?.findIndex(
                (doc: IFilePlus) => doc.name === itemName && doc.type === (isFolder ? 'folder' : 'file')
              );
        
              if (itemIndex !== -1) {
                updatedData[fileSelect][folderIndex].document?.splice(itemIndex, 1);
        
                  // Después de eliminar, verificar si la carpeta está vacía y eliminarla
                  if (
                      isFolder && 
                      updatedData[fileSelect][folderIndex].document?.length === 0
                  ) {
                      updatedData[fileSelect].splice(folderIndex, 1); // Borrar la carpeta vacía
                  }
                  }
              }
          }

          if(isFolder) {
            setData(updatedData);
            await onUpdateFileSystem();
          } else {
            const info = await axios.post(`/api/removeazureBlobStorage`, { filePath: url });
            if(info.data.success) {
                setData(updatedData);
                await onUpdateFileSystem();
            }
          }
        setReloadDelete(false);
        setShowDelete(false);
        setNameRemove('');
        setFolderSelect('');
    } catch (e) {
        console.log(e)
    }

    setReloadDelete(false);
  };

  const handlePreloaderImage = async (event: any) => {
        setFile(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };
  
  useEffect(() => {
    if(!isEmpty(fileSystemDepartments)) {
        setPermissions(get(fileSystemDepartments[0], 'permissions', []));
        setData(fileSystemDepartments[0].fileSystem);
    }
  }, [fileSystemDepartments])

  useEffect(() => {
    if(!isEmpty(data)) {
        setOrderedData(Object.keys(data));
    }
  }, [data])

  const onUpdateFileSystem = async () => {
        try {
            setPreloading(true);
            await updateFileSystemDepartments(fileSystemDepartments[0].id, { fileSystem: data }).then(() => {
                setFile(null);
                setPreviewURL(null);
                setPreloading(false);
                setShow(false);
                setFileName('');
                setLoadingMakeFolders(false);
            });
            return { success: true }
        } catch(e) {
            console.log(e);
            setFile(null);
            setPreviewURL(null);
            setPreloading(false);
            setLoadingMakeFolders(false);
        }
        
    }

  const modifyNameFolder = async (oldFolderName: string, newFolderName: string) => {
    try {
        if (newFolderName.trim() === '' || oldFolderName === newFolderName) return;
        const updatedData = { ...data };
      
        // Si estamos en el directorio principal
        if (folderSelect) {
          const folderIndex = updatedData[fileSelect].findIndex((item: IFilePlus) => item.name === oldFolderName);

          if (folderIndex !== -1) {
            updatedData[fileSelect][folderIndex].name = newFolderName;
            updatedData[fileSelect][folderIndex].date = new Date();
            updatedData[fileSelect][folderIndex].userName = get(authLogin, 'displayName', '');
            updatedData[fileSelect][folderIndex].userId = get(authLogin, 'id', '');
            // updatedData[fileSelect][folderIndex].permissions = selectedItems;
          }
        }
        setData(updatedData);
        await onUpdateFileSystem();
        setEditFolderName('');
        setShowEdit(false);
    } catch(e) {
        console.log(e);
    }
    
    
  };

  useEffect(() => {
    console.log(authLogin);
    if(!isEmpty(authLogin) && !isEmpty(departments)) {
        const category = departments.find((item: any) => item.manager === authLogin.id);
        if(!isEmpty(category)) {
            setCategorySelect(category.id);
        }
     }
     if(!isEmpty(authLogin.permissions)) {
        setPermissionsValue(VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.SISTEMA_ARCHIVOS_ADMINISTRADOR]))
     }
  }, [authLogin, departments]);

  return (
    <>
      {loading ? (
        <div className="pt-20">
          <div className="flex justify-center">
            <Loading name={'Cargando ...'} />
          </div>
        </div>
      ) : (
        <>
          {/* codigo aqui */}
          <div className={"grid w-full"}>
            <div>
                {/*  col header rut */}
                <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
                        <li className="flex">
                            <div className="flex items-center" style={{ cursor: 'pointer' }} onClick={() => {
                                setFileSelect('');
                                setFolderSelect('');
                                setListDocumentsSelect([]);
                            }}>
                                <span className="text-gray-400 hover:text-gray-500">
                                    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Home</span>
                                </span>
                                <svg className="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                            </div>
                        </li>
                        
                        {
                            fileSelect === '' ? null :
                            <li className="flex">
                                <div className="flex items-center">
                                    <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{ departments.length ? departments.find((item: any) => String(item.id) === String(fileSelect))?.name : 'Nombre no disponible' }</span>
                                    <svg className="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
                                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                    </svg>
                                </div>
                            </li>
                        }
                        
                        {
                            folderSelect !== '' ?
                                <li className="flex">
                                    <div className="flex items-center">
                                        <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                            { folderSelect } 
                                        </span>
                                    </div>
                                </li> : null
                        }
                        
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-3 bg-white w-full" style={{ height: '86vh' }}>

                    {/* Col list deparment */}
                    <div className="lg:overflow-y-auto lg:border-l ">
                        <ul role="list" className="divide-y divide-white/5">
                            {/* start categories */}
                            { (permissionsValue ? orderedData : orderedData.filter((key: any) => String(key) === String(categorySelect))).map((key: any) => (
                                <li key={key} onClick={() => {
                                    setFileSelect(key)
                                    setFolderSelect('')
                                    setListDocumentsSelect([]);
                                }} style={{ cursor: 'pointer' }} className={`${fileSelect === key ? 'bg-gray-100' : ''} relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8`}>
                                    <div className="min-w-0 flex-auto">
                                        <div className="flex items-center gap-3">
                                            {
                                                fileSelect === key ?
                                                    <>
                                                        <div className="flex-none relative bottom-1 rounded-full bg-gray-100/10 p-1 text-gray-500">
                                                            <div className="h-2 w-2 rounded-full bg-yellow-400" />
                                                        </div>
                                                    </> : null
                                            }
                                            <h2 className="min-w-0 text-[15px] leading-6 text-gray-800">
                                                <span className="truncate">{ departments.length ? departments.find((item: any) => String(item.id) === String(key))?.name : 'Nombre no disponible' }</span>
                                                <hr className='mt-3'/>
                                            </h2>
                                        </div>
                                    </div>
                                    {
                                        fileSelect === key ?
                                            <>
                                                {/* <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                                </svg> */}
                                            </> : null
                                    }
                                </li>
                            ))}
                            {/* end categories */}
                        </ul>
                    </div>

                    {/* Col list new folder */}
                    <div className={"lg:overflow-y-auto lg:border-l"}>
                        {/* <header className="flex items-center justify-between border-b border-white/5 p-6">
                            <h2 className="text-sm font-semibold leading-7 text-white" style={{ height: '40px' }}> 
                                { departments.length ? departments.find((item: any) => String(item.id) === String(fileSelect))?.name : 'Nombre no disponible' } 
                            </h2>
                        </header> */}
                        {/* start  folders categories */}
                        <ul role="list" className="divide-y divide-white/5">
                            <li className={"p-2"}> 
                                {
                                    fileSelect === '' ? null :
                                        <>
                                            <div className={'grid grid-cols-5 gap-2'}>
                                                <div className={'col-span-4'}>
                                                    <input
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setSearchFolder(e.target.value);
                                                        }}
                                                        id={"searchFolder"}
                                                        name={"searchFolder"}
                                                        placeholder={'Buscar'}
                                                        type={"text"}
                                                        className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            setShow(true)
                                                            setTypeFileSelect('folder')
                                                            setFolderSelect('');
                                                            setListDocumentsSelect([]);
                                                        }}
                                                        disabled={fileSelect === ''}
                                                        className={`mt-5 mr-5 md:mt-0 h-9 flex items-center text-gray-800 rounded bg-parvalColor px-5 py-2 text-[14px] font-normal hover:bg-parvalColor`}>
                                                         <FolderPlusIcon className={"mx-auto text-gray-800 h-7 w-7 rounded-full"} />
                                                    </button>
                                                </div>
                                            </div>
                                        </> 
                                }
                            </li>
                            {
                                loadingMakeFolders ?
                                <>
                                    <div className={'flex justify-center'}>
                                        <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className='px-2 font-normal text-wrap'>Processing...</span> 
                                    </div>
                                </> : <>
                                    {
                                        fileSelect ? (searchFolder !== '' ? filterDataFolder : data[fileSelect]).map((item: IFilePlus, index: number) => (
                                                <>
                                                    {
                                                        VerificateEnabledGroup(!isEmpty(authLogin.group) ? get(authLogin, 'group', []) : [''], get(item, 'permissions', [''])) ?
                                                            <>
                                                                    <li key={index} onClick={() => {
                                                                    setFolderSelect(item.name);
                                                                    setListDocumentsSelect(item.document);
                                                                    }} style={{ cursor: 'pointer' }} className={`${item.name === folderSelect ? 'bg-gray-100' : ''} px-4 py-2 sm:px-6 lg:px-8`}>
                                                                        <>
                                                                            {
                                                                                showDelete && item.name === NameRemove ? 
                                                                                    <div className="flex items-center gap-x-3 bg-gray-200 px-4 py-2 sm:px-6 lg:px-8">
                                                                                        <TrashIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-red-600 rounded-full"} onClick={() => {
                                                                                            removeItem(item.name, true)
                                                                                        }} style={{ cursor: 'pointer' }} />   
                                                                                    </div> :
                                                                                    <div className="flex items-center gap-x-3">
                                                                                        {
                                                                                            item.name === folderSelect ?
                                                                                                <>
                                                                                                    <FolderOpenIcon className={"mx-auto text-parvalColor h-7 w-7 flex-shrink-0 rounded-full"} />
                                                                                                </> : <>
                                                                                                    <FolderIcon className={"mx-auto text-gray-400 h-7 w-7 flex-shrink-0 rounded-full"} />
                                                                                                </>
                                                                                        }
                                                                                        <div className="flex-auto truncate leading-4">
                                                                                            <h3 className="text-sm text-gray-800 truncate"> { item.name } </h3>
                                                                                            <h3 className="text-gray-800" style={{ fontSize: '8px' }}> { !isEmpty(get(item, 'date', null))  ? `${GetFormatDateAndYear(get(item, 'date', ''))} por ${get(item, 'userName', '')}` : null } </h3>
                                                                                        </div>
                                                                                        
                                                                                        <span className="flex gap-5 text-xs text-gray-600">

                                                                                           {permissionsValue ? <>
                                                                                            <PencilIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-green-400 rounded-full"} onClick={() => setShowEdit(true)} style={{ cursor: 'pointer' }} />
                                                                                            {
                                                                                                !isEmpty(item.document) ? null :
                                                                                                    <TrashIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-red-600 rounded-full"} onClick={() => {
                                                                                                        setShowDelete(true)
                                                                                                        setNameRemove(item.name);
                                                                                                    }} style={{ cursor: 'pointer' }} />
                                                                                            } 
                                                                                           </> : null }                                           
                                                                                        </span>
                                                                                    </div>
                                                                            }
                                                                        </>
                                                                    </li>
                                                            </>  : null
                                                            // <>
                                                            //     <li key={index} className={'relative px-4 py-2 sm:px-6 lg:px-8 bg-gray-50'}>
                                                            //         <LockClosedIcon className="absolute left-1/2 transform -translate-x-1/2 mx-auto text-parvalColor h-7 w-7 flex-shrink-0 rounded-full" />
                                                                
                                                            //         <div className="flex items-center gap-x-3">
                                                            //             {item.name === folderSelect ? (
                                                            //             <FolderOpenIcon className="mx-auto text-parvalColor h-7 w-7 flex-shrink-0 rounded-full" />
                                                            //             ) : (
                                                            //             <FolderIcon className="mx-auto text-gray-400 h-7 w-7 flex-shrink-0 rounded-full" />
                                                            //             )}
                                                            //             <h3 className="flex-auto truncate text-sm leading-6 text-gray-800">
                                                            //             {item.name}
                                                            //             </h3>
                                                            //         </div>
                                                            //     </li>
                                                            // </>

                                                    }
                                                    
                                                </>
                                            )) : <li className='flex justify-center'> <h3 className="truncate text-sm font-semibold leading-6 text-gray-800"> Seleccione un departamento </h3> </li>
                                    }
                                </>
                            }
                        </ul>
                        {/* end  folders categories */}
                    </div>

                    {/* Col list new file */}
                    <div className={"lg:overflow-y-auto lg:border-l"}>
                        {/* <header className="flex items-center justify-between border-b border-white/5 p-6">
                            <h2 className="text-sm font-semibold leading-7 text-white" style={{ height: '40px' }}>
                                {departments.length ? departments.find((item: any) => String(item.id) === String(fileSelect))?.name : 'Nombre no disponible' } / { folderSelect } 
                            </h2>
                        </header> */}
                        {/* start  files categories */}
                        <ul role="list" className="divide-y divide-white/5">
                            <li className={"p-2"}>
                                {
                                    fileSelect === '' || folderSelect === '' ? null :
                                        <>
                                            <div className={'grid grid-cols-5 gap-2'}>
                                                <div className={'col-span-4'}>
                                                    <input
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setSearchFile(e.target.value);
                                                        }}
                                                        id={"searchFiles"}
                                                        name={"searchFiles"}
                                                        placeholder={'Buscar'}
                                                        type={"text"}
                                                        className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            setShow(true)
                                                            setTypeFileSelect('file')
                                                        }}
                                                        disabled={fileSelect === ''}
                                                        className={`mt-5 mr-5 md:mt-0 h-9 flex items-center  rounded bg-parvalColor px-5 py-2 text-[14px] font-normal text-slate-800`}>
                                                        <CloudArrowUpIcon className={"mx-auto text-gray-700 h-7 w-7 "} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </>
                                }
                            </li>
                            {
                                reloadDelete ?
                                <>
                                     <li className="px-4 py-3 sm:px-6 lg:px-8">
                                        <div className={'flex items-center'}>
                                            <svg aria-hidden="true" className="inline w-8 h-8 px-1 animate-spin text-gray-800 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className='px-2 font-normal text-wrap text-gray-400'>Processing...</span>
                                        </div>
                                     </li>
                                </> :
                                <>
                                    {
                                        folderSelect.length || listDocumentsSelect.length ? (searchFile !== '' ? filterDataFile : listDocumentsSelect).map((item: any) => (
                                            <>
                                                <li className="px-4 py-3 sm:px-6 lg:px-8">
                                                    <div className="flex items-center gap-x-3">
                                                        { IconShow(item.url) }
                                                        <div className={'flex-auto truncate leading-4'}>
                                                            <h3 className="text-sm text-gray-800 truncate">{ item.name }</h3>
                                                            <span className="text-gray-700" style={{ fontSize: '8px' }}>{ !isEmpty(get(item, 'date', null)) ? `${GetFormatDateAndYear(get(item, 'date', ''))} por ${get(item, 'userName', '')}` : null } </span>
                                                        </div>
                                                        
                                                        <a 
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                window.open(item.url, '_blank');
                                                            }}
                                                            download={true}
                                                            >
                                                            <EyeIcon className={"mx-auto text-gray-400 h-5 w-5 flex-shrink-0 hover:text-green-500 rounded-full"} style={{ cursor: 'pointer' }} />
                                                        </a>
                                                        {
                                                            permissionsValue ?
                                                                <>
                                                                <span className="flex-none text-xs text-gray-600">
                                                                    <TrashIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-white rounded-full"} onClick={() => removeItem(item.name, false, item.url)} style={{ cursor: 'pointer' }} />
                                                                    </span>
                                                                </> : null
                                                        }

                                                        {/* <span className="flex-none text-xs text-gray-600">
                                                            <TrashIcon className={"mx-auto text-gray-400 h-5 w-5 hover:text-red-600 rounded-full"} onClick={() => removeItem(item.name, false, item.url)} style={{ cursor: 'pointer' }} />
                                                        </span> */}
                                                    </div>
                                                </li>
                                            </> 
                                        )) : <><li className='flex justify-center'> <h3 className="truncate text-sm font-semibold leading-6 text-gay-800"> Seleccione un directorios </h3> </li></>
                                    }
                                </>    
                                
                            }
                        </ul>
                         {/* end  files categories */}
                    </div>
            </div>
          </div>
         {/* </div> */}
        </>
      )}

      <ModalComponents
        isOpen={show}

        onClose={() => {
          setShow(false);
          setSelectedItems([]);
          setIsOpen(false);
        }}
      >
        <div className="isolate bg-white p-2" onClick={() =>isOpen === true ? setIsOpen(false) : null}>
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-medium text-gray-700">
                Agregar  {typeFileSelect === 'file' ? 'Archivo' : 'Carpeta'} a  <br/>(
                    {departments.length ? departments.find((item: any) => String(item.id) === String(fileSelect))?.name : 'Nombre no disponible' })
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Este panel es tanto para agregar archivos y carpetas.
              </p>
            </div>
            <hr className="p-4" />
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  onChange={(e) => setFileName(e.target.value)}
                  name="name"
                  value={fileName}
                  placeholder={
                    typeFileSelect === 'file' ? 'Nombre de archivo' : 'Nombre de carpeta'
                  }
                  id="name"
                  className="block w-full h-12 rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"
                />
              </div>
              
              {
                typeFileSelect === 'file' ?
                   <> 
                    <div>
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Asignar una archivos
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-14">
                            <div className="grid text-center">
                                <div className='text-sm flex gap-5 leading-6 text-indigo-500 cursor-pointer'>
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Subir Imagen</span>
                                    </label>
                                    <input
                                        onChange={handlePreloaderImage}
                                        id={"file-upload"}
                                        name={"file-upload"}
                                        type={"file"}
                                        accept={".png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, .xlsx"}
                                        className={"sr-only"} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs leading-5 text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                                        { file === null ? 'PNG, JPG , PDF, Word up to 10MB' : file.name }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <>
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
                                        style={{ height: '100px' }}
                                    >
                                        {options.filter((option: string) => !selectedItems.includes(option)).map((option) => (
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
                                <div className='max-h-40 overflow-y-auto'>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            selectedItems.map((item: any) => (
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
                </>
              }
              <hr className='py-1' />
            </div>
          </div>
          <div className="flex justify-end py-5">
            { preloading ?
                <>
                    <button type="button" className={`bg-parvalColor rounded  px-3 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500`} disabled>
                        <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className='px-2 font-normal text-wrap'>Processing...</span>
                    </button>
                </> : <>
                   {
                    typeFileSelect === 'file' ?
                    <Btn
                        label={"Guardar"}
                        disabled={fileName === '' || file === null}
                        onClick={addNewItem}
                        size="mt-5 md:mt-0 h-10"
                        color={`${fileName === '' || file === null ? 'bg-gray-300' : 'bg-[#f3bb33]' }`}
                    /> : <Btn
                        label={"Guardar"}
                        disabled={fileName === ''}
                        onClick={addNewItem}
                        size="mt-5 md:mt-0 h-10"
                        color={`${fileName === '' || file === null ? 'bg-gray-300' : 'bg-[#f3bb33]' }`}
                    />
                   } 
                </> }
          </div>
        </div>
      </ModalComponents>
      {/* <ModalFullComponent isOpen={modalPdf} onClose={() => setModalPdf(!modalPdf)}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={'https://intranet00.blob.core.windows.net/intranet/SistemaDeArchivos/8/Doc.%20Test%201/1727545000915.pdf?sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D'}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
      </ModalFullComponent> */}
    {/* Delete */}
      {/* <ModalComponents
        isOpen={showDelete}
        onClose={() => {
            setShowDelete(false);
            setNameRemove('');
        }}
      >
        <>
            <div className="isolate bg-white p-6">
                <div className="webkit-center px-4 pb-5 sm:px-0">
                    <div className="text-base text-center text-gray-600">
                        <p>Quieres eliminar el documento</p>
                        <p className='text-gray-900 font-medium'>{NameRemove}</p>
                    </div>
                    <div>
                        <TrashIcon className='h-12 mb-5 mt-5 text-red-600'/>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-end">
                            { reloadDelete ?
                                <>
                                    <button type="button" className={`bg-parvalColor rounded  px-3 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500`} disabled>
                                        <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className='px-2 font-normal text-wrap'>Processing...</span>
                                    </button>
                                </> : <>
                                    {
                                        <Btn
                                            label={"Eliminar"}
                                            disabled={NameRemove === ''}
                                            onClick={() => removeItem(NameRemove, true)}
                                            size="mt-5 md:mt-0 h-10"
                                            color={`${NameRemove === '' ? 'bg-gray-300' : 'bg-red-500 text-white' }`}
                                        />
                                    }
                                </> }
                        </div>
                </div>
            </div>

        </>
      </ModalComponents> */}

      <ModalComponents
        isOpen={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedItems([]);
        }}
      >
        <>
            <div className="isolate bg-white p-6">
                <div className="px-4 pb-5 sm:px-0">
                    <h3 className="text-base font-semibold text-gray-900">
                        Modificar Nombre para Carpeta: { folderSelect } 
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Este panel para carpetas.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <input
                            type="text"
                            onChange={(e) => setEditFolderName(e.target.value)}
                            name={"editFolderName"}
                            value={editFolderName}
                            placeholder={`${folderSelect}`}
                            className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                        <div className="flex justify-end py-5">
                            { preloading ?
                                <>
                                    <button type="button" className={`bg-parvalColor rounded  px-3 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500`} disabled>
                                        <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className='px-2 font-normal text-wrap'>Processing...</span>
                                    </button>
                                </> : <>
                                    {
                                        <Btn
                                            label={"Guardar"}
                                            disabled={editFolderName === ''}
                                            onClick={() => modifyNameFolder(folderSelect, editFolderName)}
                                            size="mt-5 md:mt-0 h-10"
                                            color={`${editFolderName === '' ? 'bg-gray-300' : 'bg-[#f3bb33]' }`}
                                        />
                                    } 
                                </> }
                        </div>
                </div>
            </div>
            
        </>
      </ModalComponents>
    </>
  );
}

export default function SistemaDeArchivos() {
  return (
    <>
      <IndexSistemaDeArchivos />
    </>
  );
}
