

const VerificatePermissions = (permissions: string[], verifyPermissions: string[]) => {
    return permissions.some((role: any) => verifyPermissions.includes(role));
}

export default VerificatePermissions;