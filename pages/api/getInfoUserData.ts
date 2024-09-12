import {
    Client,
    AuthenticationProvider
} from '@microsoft/microsoft-graph-client';

export const GetInfoUserData = async (accounts: any, instance: any, postAuthLogin: any) => {
    try {
        const authProvider: AuthenticationProvider = {
            getAccessToken: async (request: any) => {
                const response = await instance.acquireTokenSilent({
                    scopes: ['https://graph.microsoft.com/.default'],
                    account: accounts,
                });

                if (response.accessToken) {
                    return response.accessToken;
                } else {
                    throw new Error('No se pudo obtener un token de acceso.');
                }
            },
        };
        const graphClient = Client.initWithMiddleware({
            authProvider,
        });

        const me = await graphClient.api('/me').get();
        await postAuthLogin(me);

    } catch (error) {
        console.error('Error al obtener el token de acceso o al realizar llamadas a Microsoft Graph API:', error);
    }
};
