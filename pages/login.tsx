import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import style from '../styles/login.module.scss';
import { SignInButton } from '@/utils/SignInButton';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from 'next/router';
import { GetInfoUserData } from './api/getInfoUserData';
import { useAuthLogin } from "../hooks/AuthLogin";
import Loading from '../components/molecules/loading';

export default function Login() {

    const router = useRouter();
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance, inProgress } = useMsal();
    const { postAuthLogin } : any = useAuthLogin();
    const [loginLoading, setLoginLoading] = useState(false);

    // const handleAuthentication = () => {
    //     const currentURL = router.pathname;
    //     if (isAuthenticated && global.window?.localStorage.AuthToken) {
    //         if (currentURL === '/login'
    //             || currentURL === '/auth'
    //             || currentURL === '/'
    //             || currentURL === '/_error') {
    //             router.push('/reportes');
    //         }
    //     } else {
    //         if(currentURL !== '/login' 
    //         && currentURL !== '/auth' 
    //         && !global.window?.localStorage.AuthToken 
    //         && !isAuthenticated) {
    //             router.push('/login');
    //         }
    //     }
    // };

     //useEffect(() => {
        //handleAuthentication();
    ///}, [isAuthenticated, global.window?.localStorage.AuthToken]);

    useEffect(() => {
        const fetchData = async () => {
            const currentURL = router.pathname;
    
            if (isAuthenticated && accounts.length) {
                setLoginLoading(true);
    
                try {
                    await GetInfoUserData(accounts[0], instance, postAuthLogin);

                    if (global.window?.localStorage.authtokenintranet && isAuthenticated) {
                        if (currentURL === '/login' || currentURL === '/auth' || currentURL === '/' || currentURL === '/_error') {
                            router.push('/reportes');
                        }
                    } else if(!global.window?.localStorage.authtokenintranet && isAuthenticated) {
                        await postAuthLogin(accounts[0]);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoginLoading(false);
                }
            } else {
                setLoginLoading(false);
    
                if (currentURL !== '/login' && currentURL !== '/auth' && !global.window?.localStorage.authtokenintranet && !isAuthenticated) {
                    router.push('/login');
                }
            }
        };
    
        fetchData();
    }, [isAuthenticated, accounts, instance, postAuthLogin, router, router.pathname]);

  return (

    <div className='grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-2'>
        {/* Col backgrouns  */}
        <div className={style.colBackground}>
        <Image
           priority
            src={'/logoIntranet.svg'}
            alt="Logo de Intranet"
            width={300}
            height={300}
            />
        </div>

        {/* Col form */}
        <div className='flex flex-col justify-center items-center h-screen'>
         { !loginLoading ? <><div className='mb-[45px]'>
             <Image
                priority
                  src={'/logoParval.svg'}
                  alt="Logo de parval"
                  width={130}
                  height={130}
                />
            </div>
            <p>
                Iniciar sesion con:
            </p>

            <SignInButton>
                <div className='border rounded-md px-12 py-3 hover:bg-gray-50 cursor-pointer'>
                    <Image
                        priority
                        src={'/logoMicrosoft.svg'}
                        width={110}
                        alt="Logo de microsoft"
                        height={110}
                    />
                </div>
            </SignInButton></> : <>
                <div className={'pt-20'}>
                    <div className={'flex justify-center'}>
                        <Loading name={'Cargando ...'} />
                    </div>
                </div>
            </> }
            {/* <div className='border rounded-md px-12 py-3 hover:bg-gray-50 cursor-pointer' onClick={() => {
                localStorage.setItem('AuthToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAb2RhdGEuY29udGV4dCI6Imh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wLyRtZXRhZGF0YSN1c2Vycy8kZW50aXR5IiwiYnVzaW5lc3NQaG9uZXMiOltdLCJkaXNwbGF5TmFtZSI6IlN0YXR1cyBQYXJ2YWwiLCJnaXZlbk5hbWUiOiJTdGF0dXMgUGFydmFsIiwiam9iVGl0bGUiOm51bGwsIm1haWwiOiJzdGF0dXNAcGFydmFsLmNvbS5kbyIsIm1vYmlsZVBob25lIjpudWxsLCJvZmZpY2VMb2NhdGlvbiI6bnVsbCwicHJlZmVycmVkTGFuZ3VhZ2UiOm51bGwsInN1cm5hbWUiOiJzZXJ2ZXJzIiwidXNlclByaW5jaXBhbE5hbWUiOiJzdGF0dXNAcGFydmFsLmNvbS5kbyIsImlkIjoiYWZkZjAxYTQtOGQ5Yi00YjdlLWJmNjItMWFiZDIzNmVhM2Q2IiwiY3JlYXRlZEF0IjoiMjAyMy0wOS0xMFQyMjo1NjowOC4yMzVaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0xMFQyMjo1NjowOC4yMzVaIiwiaWF0IjoxNjk0Mzg2NTY4fQ.Q9ZxzNI-wK_K08uSRF3T7Vkgq0Nkieh7axc7aaI_WqY');
                global.window.location.href = '/';
            }}>
                <Image
                    priority
                    src={'/logoMicrosoft.svg'}
                    width={110}
                    alt="Logo de microsoft"
                    height={110}
                />
            </div> */}
            <div className='absolute bottom-8'>
                <div className='shadow-md px-14 py-4 rounded-md cursor-pointer'>
                    <Image
                        priority
                        alt="Logo de jira"
                        src={'/jiraLogo.png'}
                        width={180}
                        height={180}
                    />
                </div>
                <p className='text-center text-sm mt-3 '>
                    Haz clic para acceder a meza de ayuda
                </p>
            </div>

        </div>
    </div>
  )
}