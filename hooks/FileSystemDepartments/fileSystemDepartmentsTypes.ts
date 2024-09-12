const TypesFileSystemDepartments = {
    POST_FILE_SYSTEM_DEPARTMENTS: 'POST_FILE_SYSTEM_DEPARTMENTS',
    GET_FILE_SYSTEM_DEPARTMENTS: 'GET_FILE_SYSTEM_DEPARTMENTS',
}

function FileSystemDepartmentsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesFileSystemDepartments.POST_FILE_SYSTEM_DEPARTMENTS:
        case TypesFileSystemDepartments.GET_FILE_SYSTEM_DEPARTMENTS:    
            return {
                ...state, fileSystemDepartments: payload.fileSystemDepartments
            };
        default:
            return state;
    }
}
export { TypesFileSystemDepartments };
export default FileSystemDepartmentsTypes;