import React from 'react'
import { GetFormatDate } from '@/utils/getMonthForDate';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';
import Image from 'next/image';

interface IListBirthdayProps {
  listDateBirthday: any[];
}

export default function ListBirthdayComponent(props: IListBirthdayProps) {

  return (
    <>
    {
      !isEmpty(props.listDateBirthday) && (
        <div className='mb-10'>
          <h2 className="text-base font-semibold leading-6 text-gray-900">Cumpleaños parval</h2>
          <div>
            <ol className="mt-3 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
              {props.listDateBirthday.map((data: any) => (
                <li key={data.id} className="relative flex items-center space-x-6 py-4 xl:static">
                  <Image
                      src={data.urlImage ? data.urlImage : '/perfil-de-usuario.webp'}
                      className={"rounded-full flex-none h-[50px] w-[50px]"}
                      alt={"logo de parval"}
                      width={1024}
                      height={1024}
                      priority
                    />
                    <div className="flex-auto">
                      <h3 className="pr-10 mb-1 font-semibold text-gray-900 xl:pr-0">{data.name}</h3>
                      <p style={{
                        fontSize: '12px'
                      }} className="pr-10 mb-1 text-gray-400 xl:pr-0">{data.jobTitle}</p>
                      <dl className="flex flex-col text-gray-500 xl:flex-row">
                        <div className="flex items-start space-x-3">
                          <dt className="mt-1">
                            <CalendarIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                          </dt>
                          <dd>
                            <time dateTime={GetFormatDate(data.birthdate)}>
                              {GetFormatDate(data.birthdate)}
                            </time>
                          </dd>
                        </div>
                      </dl>
                    </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  )
}
