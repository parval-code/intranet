import React, { useState } from 'react';
import SearchInput from '@/components/atoms/searchInput';
import CardDeparment from '@/components/molecules/cardDeparment';

export default function ScoreBalanceRrhh() {
  // Estado para almacenar el valor de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data Cards deparment
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
      src: '/perfil-departamento', // Enlace de ejemplo
    },
    {
      department: 'Finanzas',
      direction: 'Recursos Humanos',
      imageUrls: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ],
      progressValue: 20,
      src: '#', // Enlace de ejemplo
    },
    {
      department: 'Dirección General',
      direction: 'Recursos Humanos',
      imageUrls: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ],
      progressValue: 10,
      src: '#', // Enlace de ejemplo
    },
    {
      department: 'Dirección Operacional',
      direction: 'Administración',
      imageUrls: [
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ],
      progressValue: 90,
      src: '#', // Enlace de ejemplo
    },
    // Agrega más departamentos aquí
  ];

  // Filtra los departamentos según el término de búsqueda
  const filteredDepartments = departments.filter(dept =>
    dept.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10">
      <p className="relative top-1 font-normal text-xl mb-3">Lista de departamentos</p>

      {/* SearchInput onChange actualiza el valor de búsqueda */}
      <SearchInput
        placeholder={'Buscar departamento'}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
      />

      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept, index) => (
              <CardDeparment
                key={index}
                department={dept.department}
                direction={dept.direction}
                imageUrls={dept.imageUrls}
                progressValue={dept.progressValue}
                src={dept.src} 
              />
            ))
          ) : (
            <p className='mt-10'>No se encontraron departamentos</p>
          )}
        </div>
      </div>
    </div>
  );
}
