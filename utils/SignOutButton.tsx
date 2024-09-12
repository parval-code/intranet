import React from "react";
import { useMsal } from "@azure/msal-react";
import { offCloseSectionToken } from './offCloseSectionToken';
/**
 * Renders a sign out button
 */
export const SignOutButton = ({ children }: any) => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: any) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/login",
                mainWindowRedirectUri: "/login",
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/login",
            });
        }
    };

    return (
        <>
            <div onClick={() => {
                handleLogout("redirect");
                offCloseSectionToken();
            }}>
                {
                    children
                }
            </div>
        </>
    );
};
