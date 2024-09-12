import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from './Oauth';


export const SignInButton = ({ children }: any) => {
    const { instance } = useMsal();

    const handleLogin = (loginType: any) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch((e) => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
            });
        }
    };
    return (
        <>
            <button onClick={() => handleLogin("redirect")}>
                { children }
            </button>
        </>
    );
};
