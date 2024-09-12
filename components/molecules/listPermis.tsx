import React, { useState } from 'react';


interface IListPermis {
  permissions?: any[];
  setSelectedPermissions: any;
  selectedPermissions: string[];
}

export default function ListPermis(props: IListPermis) {

  const handlePermissionToggle = (label: string) => {
    const isSelected = props.selectedPermissions.includes(label);
    if (isSelected) {
      props.setSelectedPermissions(props.selectedPermissions.filter(permission => permission !== label));
    } else {
      props.setSelectedPermissions([...props.selectedPermissions, label]);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Lista de permisos</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Asigne los permisos que necesite para el usuario</p>
      </div>
      <div className="mt-6 border-t  border-gray-100">
        <dl className="divide-y divide-gray-100">
          {
            props.permissions && props.permissions.map((permission: any, index) => (
              <>
                <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex gap-5 items-center text-sm font-medium leading-6 text-gray-900"> 
                    <input
                      name={"comments"}
                      type={"checkbox"}
                      onClick={() => handlePermissionToggle(permission.codePermission)}
                      checked={props.selectedPermissions.includes(permission.codePermission)}
                      className={"h-4 w-4 rounded border-gray-300 text-parvalColor focus:ring-parvalColor"}
                    />
                    {permission.description}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{permission.codePermission}</dd>
                </div>
              </>
            ))
          }
        </dl>
      </div>
      {/* <div>
                  <h4>Permisos seleccionados:</h4>
                  <ul>
                    {selectedPermissions.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                </div> */}
    </>
  );
}
