import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/organisms/layout';
import { useRouter } from "next/router";
import Login from "./login";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { setAuthorizationToken } from '@/utils/setAuthorizationToken';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '@/utils/Oauth';
import { PublicClientApplication } from '@azure/msal-browser';
import StoreProviderAuthLogin from '@/hooks/AuthLogin/StoreProvider';
import GlobalProviders from '@/hooks/globalProviders';

const msalInstance = new PublicClientApplication(msalConfig);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if ((router.pathname === '/login' || router.pathname === '/auth' || router.pathname === '/_error')
          && global.window.localStorage.authtokenintranet !== null && global.window.localStorage.authtokenintranet !== undefined) {
          setLoading(true);
          router.push('/');
      }

      if (global.window.localStorage.authtokenintranet) {
          setLoading(true);
          setAuthorizationToken(global.window.localStorage.authtokenintranet);
      } else {
          setLoading(false)
      }

  }, [router]);

  return (
         <>
             <MsalProvider instance={msalInstance}>
                <StoreProviderAuthLogin>
                    {
                            loading ?
                                (<>
                                    <GlobalProviders>
                                            <Layout>
                                                <div className='overflow-y h-screen xl:h-screen 2xl:h-screen'>
                                                    <Component {...pageProps} />
                                                </div>
                                            </Layout>
                                        </GlobalProviders>
                                </>) : <Login />
                    }
                </StoreProviderAuthLogin>  
             </MsalProvider>
         </>
  )
}

