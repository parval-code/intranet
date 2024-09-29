

const VerificatePermissions = (permissions: string[], verifyPermissions: string[]) => {
    return permissions.some((role: any) => verifyPermissions.includes(role));
}

export const VerificateEnabledGroup = (listGroup: string[], verifyGroup: string[]) => {
    return listGroup.some((role: any) => verifyGroup.includes(role));
}

export default VerificatePermissions;
