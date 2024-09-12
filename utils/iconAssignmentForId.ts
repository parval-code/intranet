

export const IconAssignmentForId  = (id: number) => {

    let icons = '';

    switch(id) {
        case 2:
            icons = '/icons_rrhh/travel.svg';
            break;
        case 3:
            icons = '/icons_rrhh/mother-with-baby.svg';
            break;
        case 4:
            icons = '/icons_rrhh/time-lock.svg';
            break;
        case 5:
            icons = '/icons_rrhh/cash-money-.svg';
            break;
        case 6:
            icons = '/icons_rrhh/key.svg';
            break;
        case 7:
            icons = '/icons_rrhh/permis-boy.svg';
            break;
        case 8:
            icons = '/icons_rrhh/cross.svg';
            break;
        case 9:
            icons = '/icons_rrhh/student.svg';
            break;
        case 10:
            icons = '/icons_rrhh/medicine-hear.svg';
            break;
    }

    return icons;
}