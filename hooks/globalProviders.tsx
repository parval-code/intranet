import React from "react";
import StoreProviderBinnacleSIMV from "./BinnacleSIMV/StoreProvider";
import StoreProviderCategoriesNews from "./CategoriesNews/StoreProvider";
import StoreProviderDepartments from "./Departments/StoreProvider";
import StoreProviderListUsersAzure from "./ListUsersAzure/StoreProvider";
import StoreProviderLocation from "./Location/StoreProvider";
import StoreProviderNews from "./News/StoreProvider";
import StoreProviderPerson from "./Person/StoreProvider";
import StoreProviderReasonAbsence from "./ReasonAbsence/StoreProvider";
import StoreProviderVacations from "./Vacations/StoreProvider";
import StoreProviderPermissions from "./permissions/StoreProvider";
import { NotificationProvider } from './Notifications';
import StoreProviderUsersPermissions from './usersPermissions/StoreProvider';
import StoreProviderHappinnessDays from './HappinnessDays/StoreProvider';
import StoreProviderFileSystemDepartments from './FileSystemDepartments/StoreProvider';
import StoreProviderAssignedUserGroups from "./assignedUserGroups/StoreProvider";


export default function GlobalProviders({ children } : any) {
    return (
        <>
            <NotificationProvider>
                <StoreProviderDepartments>
                    <StoreProviderPerson>
                        <StoreProviderCategoriesNews>
                            <StoreProviderNews>
                                <StoreProviderLocation>
                                    <StoreProviderVacations>
                                        <StoreProviderBinnacleSIMV>
                                            <StoreProviderReasonAbsence>
                                                <StoreProviderPermissions>
                                                    <StoreProviderListUsersAzure>
                                                        <StoreProviderUsersPermissions>
                                                            <StoreProviderHappinnessDays>
                                                                <StoreProviderFileSystemDepartments>
                                                                    <StoreProviderAssignedUserGroups>
                                                                        {
                                                                            children
                                                                        }
                                                                    </StoreProviderAssignedUserGroups>
                                                                </StoreProviderFileSystemDepartments>
                                                            </StoreProviderHappinnessDays>
                                                        </StoreProviderUsersPermissions>
                                                    </StoreProviderListUsersAzure>
                                                </StoreProviderPermissions>
                                            </StoreProviderReasonAbsence>
                                        </StoreProviderBinnacleSIMV>
                                    </StoreProviderVacations>
                                </StoreProviderLocation>
                            </StoreProviderNews>
                        </StoreProviderCategoriesNews>
                    </StoreProviderPerson>
                </StoreProviderDepartments>
            </NotificationProvider>
        </>
    )
}
