import RUOTES_API from "@/routes_apis";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "9c421577-90eb-4fc1-8105-475081afb72f",
        authority: "https://login.microsoftonline.com/2c197370-b3df-4800-a659-623e5f83a3b8",
        redirectUri: `${RUOTES_API.ROUTES_PUBLIC}/auth`,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }

                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

export const loginRequest = {
    scopes: ["api://9c421577-90eb-4fc1-8105-475081afb72f/weather.read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/users",
};
