import {
    Client,
    AuthenticationProvider
} from '@microsoft/microsoft-graph-client';

export const GetUserForEmail = async (accounts: any, instance: any, email: string) => {
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

        const user = await graphClient.api(`/users/${email}`).get();

        return {
            value: user,
        };

    } catch (error) {
        console.error('Error al obtener el token de acceso o al realizar llamadas a Microsoft Graph API:', error);
    }
};
