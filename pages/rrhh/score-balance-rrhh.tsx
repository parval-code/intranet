import SearchInput from '@/components/atoms/searchInput';
import CardDeparment from '@/components/molecules/cardDeparment';
import React from 'react';

export default function ScoreBalanceRrhh() {

  // Cards deparment
  const departments = [
    {
      department: 'Dirección de Riesgos',
      direction: 'Recursos Humanos',
      imageUrls: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ],
      progressValue: 20,
    },
    {
      department: 'Finanzas',
      direction: 'Administración',
      imageUrls: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ],
      progressValue: 90,
    },
    // Agrega más departamentos aquí
  ];

  return (
    <div className="p-10">
      <p className="relative top-1 font-normal text-xl mb-3">Lista de departamentos</p>
      <SearchInput placeholder={'Buscar departamento'} />

      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
          {departments.map((dept, index) => (
            <CardDeparment
              key={index}
              department={dept.department}
              direction={dept.direction}
              imageUrls={dept.imageUrls}
              progressValue={dept.progressValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
