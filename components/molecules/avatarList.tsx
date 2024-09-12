import React from 'react';
import Image from 'next/image';
import { get } from 'lodash';

interface IAvatrList {
  people: any[];
} 

export default function AvatrList(props: IAvatrList) {
  return (
        <>
          <div>
            <div className="mx-auto">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-[20px] font-bold tracking-tight text-gray-800">Bienvenidos a parval</h2>
              </div>
              <ul
                role="list"
                className="mx-auto mt-[35px] grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {
                    props.people && props.people.length ? props.people.map((person: any) => (
                    <li key={get(person, 'name', '')}>
                      <Image
                        src={person && person.urlImage ? person.urlImage : '/perfil-de-usuario.webp'}
                        className={"mx-auto h-20 w-20 rounded-full"}
                        alt={"logo de parval"}
                        width={1024}
                        height={1024}
                        priority
                      />
                      <h3 className="mt-3 text-[15px] font-semibold leading-7 tracking-tight text-gray-900">{get(person, 'name', '')}</h3>
                      <p className="text-[12px] leading-6 text-gray-600">{get(person, 'jobTitle', '')}</p>
                    </li>
                  )) : null
                }
              </ul>
            </div>
          </div>
        </>
  )
}
