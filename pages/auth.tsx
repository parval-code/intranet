import { useIsAuthenticated, AccountIdentifiers, MsalProvider, useMsal } from '@azure/msal-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loading from '../components/molecules/loading';


const LazyComponent = dynamic(() => import('../components/molecules/loading'), {
    loading: () => <Loading />,
});

export default function Auth() {
    const isAuthenticated: boolean = useIsAuthenticated();

    return (
        <>
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LazyComponent />
                </div>
        </>
    )
}
