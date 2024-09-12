import React from 'react';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';


interface person {
    email:string;
    imageUrl:string;
    title:string;
    skills:string;
    othersSkills:string;
    telephone:string;
    name:string;
}


export default function profileCard(props:person) {
  return (
    <>
         <ul role="list">
        <li
          key={props.email}
          className="col-span-1 h-[500px] flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
              <Image
                priority
                src={props.imageUrl}
                width={1080}
                height={1080}
                alt={"logo de parval"}
                className={"mx-auto h-32 w-32 flex-shrink-0 rounded-full"}
              />
            <h3 className="mt-6 text-base	font-medium text-gray-900">{props.name}</h3>
            <div className="text-sm mt-1 text-gray-500">{props.title}</div>

            <dl className="mt-10 flex flex-grow flex-col">
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-[13px] font-medium text-orange-700 ring-1 ring-inset ring-green-600/20">
                  {props.skills}
                </span>
              </dd>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-[13px] font-medium text-orange-700 ring-1 ring-inset ring-green-600/20">
                  {props.othersSkills}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${props.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <EnvelopeIcon className='className="w-5 h-5 mr-1'/>
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${props.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                 <PhoneIcon className='className="w-5 h-5 mr-1'/>
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>
    </ul>
    </>
  )
}
