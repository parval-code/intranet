import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useNews } from '@/hooks/News';
import Link from 'next/link';
import Btn from '@/components/atoms/btn';
import { useNotification } from '@/hooks/Notifications';
import { useStoreNews } from '@/hooks/News/StoreProvider';
import Image from 'next/image';
import Loading from '@/components/molecules/loading';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import VerificatePermissions from  '@/utils/verificatePermissions';
import Permissions from '@/utils/permissions';
import { isEmpty, get } from 'lodash';

function LeerNoticiasComponets() {

    const { id }: any = useRouter().query;
    const { getAllNews, deleteNews } = useNews();
    const { getAuthLogin } = useAuthLogin();
    const { showNotification } = useNotification();
    const [ loading, setLoading ] = useState(false);
    const [ newspaper, setNewspaper ]: any[] = useState([]);
    const [ permissionsValue, setPermissionsValue ] = useState(false);
    const router = useRouter();
    const { authLogin } = useStoreAuthLogin();

    const { news } = useStoreNews() || [];

    useEffect(() => {
        if(!isEmpty(authLogin.permissions)) {
          setPermissionsValue(VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.NOTICIAS, Permissions.SUPER_ADMINISTRADOR]))
        }
      }, [authLogin])

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await Promise.all([
              getAuthLogin(),
              getAllNews(),
            ]);
            setLoading(false);
          }  
        if(isEmpty(news)) {
            fetchData();
        }

        if(!!id && !isEmpty(news)) {
            setNewspaper(news.filter((item: any) => +item.id === +id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const removerNews = async () => {
        if(id) {
            await deleteNews(id).then(() => {
                showNotification('Se Removio la noticia con exito.', "success");
                router.push('/noticias');
            })
        }
    }

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
                <>
                {
                    newspaper && newspaper.length ?
                        <>
                            <div className="bg-white px-6 py-32 lg:px-8">
                                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                                        <div className={'grid grid-cols-2 gap-4'}>
                                            <div>
                                                <p className="text-base font-semibold leading-7 text-indigo-600">
                                                    {
                                                        newspaper[0].category && newspaper[0].category.name
                                                    }
                                                </p>
                                            </div>
                                            <div className={'flex justify-end'}>
                                                {
                                                    permissionsValue ?
                                                        <>
                                                            <Link href={`/editar-noticias/${id}`}>
                                                                <Btn 
                                                                    label={'Editar'}
                                                                    classAdditional={'mx-2 hover:bg-indigo-700 bg-indigo-600 text-white'}
                                                                    size={''} 
                                                                    color={''}/>
                                                            </Link>
                                                            <Btn 
                                                                label={'Eliminar'}
                                                                classAdditional={'mx-2'}
                                                                onClick={removerNews} size={''} 
                                                                color={'bg-parvalColor'}/>  
                                                        </> : null
                                                                
                                                }
                                                  
                                            </div>
                                        </div>
                                        <br />
                                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-10">
                                            {
                                            newspaper[0].title 
                                            }
                                        </h1>
                                        <p className="mt-6 text-xl leading-8">
                                            {
                                            newspaper[0].description 
                                            }
                                        </p>
                                        
                                        <figure className="mt-16">
                                            {
                                                newspaper[0].frontPage ?
                                                    <>
                                                        <Image
                                                            priority
                                                            src={newspaper[0].frontPage}
                                                            alt={"logo de parval"}
                                                            className={'aspect-video rounded-xl bg-gray-50 object-contain'}
                                                            width={1080}
                                                            height={1080}
                                                        />
                                                    </> : null
                                            }
                                        </figure>
                                        <div className={"mt-16 font-sans"}>
                                            <div className={'mt-6 text-gray-700'} dangerouslySetInnerHTML={{__html: newspaper[0].content}} />
                                        </div>
                                </div>
                            </div>
                        </>
                    : <><div></div></> 
                }
            </>
            }
        </>
    );
}

export default function LeerNoticia() {
    return (
        <>
            <LeerNoticiasComponets />
        </>
    )
}