import React, { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

interface InfoAutoComplit {
  people: any[],
  setSelectedPerson?: any;
  selectedPerson?: any;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
  
export default function InputAutoComplit(props: InfoAutoComplit) {
    const [queryInfo, setQueryInfo] = useState('')
  
    const filteredPeople =
      queryInfo === ''
        ? props.people
        : props.people.filter((person: any) => person.displayName.toLowerCase().includes(queryInfo.toLowerCase()))

  return (
      <>
         <Combobox as="div" value={props.selectedPerson} onChange={props.setSelectedPerson}>
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Asignar usuario</Combobox.Label>
          <div className="relative mt-2">
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"
              onChange={(event) => setQueryInfo(event.target.value)}
              displayValue={(person: any) => person?.displayName}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>

            {filteredPeople.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.map((person: any) => (
                  <Combobox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-parvalColor text-white' : 'text-gray-900'
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <div className="flex">
                          <span className={classNames('truncate', selected && 'font-semibold')}>
                            { person.displayName }
                          </span>
                          <span
                            className={classNames(
                              'ml-2 truncate text-gray-500',
                              active ? 'text-indigo-800' : 'text-gray-500'
                            )}
                          >
                            {person.displayName}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
    </>
  )
}
