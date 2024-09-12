import {
    Client,
    AuthenticationProvider
} from '@microsoft/microsoft-graph-client';

export const GetListUsers = async (accounts: any, instance: any) => {
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
        const departament: string[] = ['Negocios', 'Tecnologia', 'Tesoreria', 'Contabilidad', 'Recursos Humanos', 'Desarrollo de Talento Humano y Procesos', 'Seg. Cibernética y de la Informacion/Ciberseguridad'];
        let usersForDepartament: any[] = [];

        for (let x: number = 0; departament.length > x; x++) {
            // promise. all
            const me = await graphClient.api(`/users?$count=true&$filter=Department eq '${departament[x]}'`).get();
            if (me?.value?.length) {
                usersForDepartament.push(...me.value);
            }
        }

        return {
            value: usersForDepartament,
        };

    } catch (error) {
        console.error('Error al obtener el token de acceso o al realizar llamadas a Microsoft Graph API:', error);
    }
};
