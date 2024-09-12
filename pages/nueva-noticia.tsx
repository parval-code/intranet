import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import { useStoreCategoriesNews } from '@/hooks/CategoriesNews/StoreProvider';
import { useNews } from '@/hooks/News'; 
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import Btn from '@/components/atoms/btn';
import { useCategoriesNews } from '@/hooks/CategoriesNews'; 
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "video"],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "video",
    "background",
    "image",
    "align",
    "size",
    "font"
  ];

  // const handleUploadImage = () => {
//     console.log('hola');
//     const input: any = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();
    
//     const reader: any = new FileReader();
//     reader.readAsDataURL(input.files[0]);
    
//     return new Promise((resolve, reject) => {
//         reader.onloadend = async () => {
//             try {
//                 const base64Image = reader.result.split(',')[1];
//                 const infoImege = await axios.post(`/api/azureBlobStorage?type=${get(input.files[0], 'type', '')}`, {base64Image});
//                 console.log('Imagen cargada con éxito', infoImege);
//                 resolve(infoImege.data.urlImage); // Resuelve con la URL de la imagen
//             } catch (error: any) {
//                 console.error('Error al cargar la imagen:', error.message);
//                 reject(error);
//             }
//         };
//         reader.onerror = (error: any) => {
//             reject(error);
//         };
//     });
// }

function NewNewsComponents() {

    const { getAllCategoriesNews } = useCategoriesNews();
    const { getAuthLogin } = useAuthLogin();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [preloading, setPreloading] = useState(false);
    const [value, setValue] = useState('');
    const [frontPage, setFrontPage] = useState('');
    const [disable, setDisable] = useState(true);
    const { saveNews } = useNews();
    const [image, setImage] = useState(false);
    const [file, setFile]: any = useState(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [info, setInfo] = useState({
        title: '',
        description: '',
        category: 1,
    });

    useEffect(() => {
        const { title, description, category } = info;
        if(value === "" || title === "" || description === "" || category === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }

    }, [value, info])

    const { authLogin } = useStoreAuthLogin();
    const { categoriesNews } = useStoreCategoriesNews() || [];

    console.log(categoriesNews);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                getAllCategoriesNews(),
                getAuthLogin(),
            ]);
          }
          if(isEmpty(categoriesNews) || isEmpty(authLogin)) {
            fetchData();
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLogin]);

    const onHandleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value }: any = e.target;
        setInfo((info: any) => ({...info, [name]: value}));
    }

    const handlePreloaderImage = async (event: any) => {
        setFile(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
        setImage(true);
    };

    const onSaveNews = async (frontPageUrl?: string) => {
        setPreloading(true);
        const data: any = {
            ...info,
            content: value,
            frontPage: frontPageUrl ? frontPageUrl : frontPage,
            createdBy: authLogin.id,
            updatedBy: authLogin.id,
        };
        setLoading(true);
        await saveNews(data).then(() => {
            setFile(null);
            setPreviewURL(null);
            setLoading(false);
            setPreloading(false);
            router.push('/noticias');
        });
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
          let infoImege: any;
          reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];
            infoImege = await axios.post(`/api/azureBlobStorage?type=${get(file, 'type', '')}`, {base64Image});

            if(infoImege.data.urlImage) {  
              onSaveNews(infoImege.data.urlImage);
              setFrontPage(infoImege.data.urlImage);
            }
          };
    
          console.log('Imagen cargada con éxito');

          return {
            success: true,
            urlImage: infoImege.data.urlImage,
          }
        } catch (error: any) {
          console.error('Error al cargar la imagen:', error.message);
        }
    };

    const onClickSaveNews = async () => {
        if(!image) {
            onSaveNews();
        }

        try {
            await handleUpload();
        } catch(e: any) {
            console.log(e);
        }
    }

    return (
        <>
            <div className='p-10'>
                <div className="space-y-6">
                    <div className="border-b border-gray-900/10 pb-4">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Nueva noticia</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Completa el formulario para crear una nueva noticia
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Titulo de la noticia
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={info.title}
                                            onChange={onHandleChanges}
                                            name={"title"}
                                            maxLength={99}
                                            autoComplete="given-name"
                                            className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {
                                        categoriesNews && categoriesNews.length ?
                                            <>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Categoria</label>
                                                <select onChange={onHandleChanges} value={info.category} name="category" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    {
                                                        categoriesNews.map((item: any) => (
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
                        <div>
                            <div className={"grid grid-cols-2 gap-4"}>
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        Descripcion de la noticia
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            onChange={onHandleChanges}
                                            name={'description'}
                                            value={info.description}
                                            rows={6}
                                            className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div>
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Asignar una imagen
                                            </label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-14">
                                                <div className="text-center">
                                                    <div className='text-sm flex gap-5 leading-6 text-indigo-500 cursor-pointer'>
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span>Subir Imagen</span>
                                                        </label>
                                                        <input
                                                            onChange={handlePreloaderImage}
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                        />
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
                                    </div>
                            </div>
                                
                        </div>
                    </div>
             

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <div className="space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Seleccione un tipo de noticia</legend>
                            <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                                <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-parvalColor focus:ring-parvalColor"
                                />
                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                Noticas interna
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-parvalColor focus:ring-parvalColor"
                                />
                                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                Noticias publicas
                                </label>
                            </div>
                            </div>
                        </fieldset>
                        </div>
                    </div> */}
                    <div className="border-b  border-t border-gray-900/10 pb-12">
                        <ReactQuill
                            theme={"snow"}
                            bounds={'#rootReactQuill'}
                            modules={modules}
                            formats={formats}
                            value={value} 
                            placeholder={'Empezamos ...'}
                            onChange={setValue} />
                    </div>
                    <div>
                        {
                            loading ?
                                <>
                                <div className='flex justify-center'>
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                </> : <>    
                                <div className='my-10 mt-5 flex content-center justify-between'>               
                                <Link href={'/noticias'}>
                                    <span className="text-gray-600 text-[13px]  px-4 py-2 rounded-md">
                                        Cancelar
                                    </span>
                                </Link>
                                {
                                    preloading ?
                                    <>
                                            <button type="button" className={`bg-parvalColor rounded  px-3 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500`} disabled>
                                                <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className='px-2 font-normal text-wrap'>Processing...</span>
                                            </button>
                                    </> : <>
                                        <Btn 
                                            label={'Crear'} 
                                            onClick={onClickSaveNews}
                                            disabled={disable}
                                            size={'h-[40px] w-[100px]'} 
                                            color={disable ? 'bg-gray-100' :'bg-parvalColor'}/>
                                    </>
                                }
                                </div>    
                            </>
                        }
                    </div>
                </div>
            </div> 
        </>
    )
}

export default function NewNews() {
    return (
        <>
            <NewNewsComponents />
        </>
    )
}