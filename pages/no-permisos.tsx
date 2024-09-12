import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from 'next/link';


export default function NotFountPermissions() {
    const router = useRouter();


    return (
        <>
            <div className='p-10 bg-gray-50 flex justify-center items-center w-full h-full'>
                No se encuentan los permisos para ver esta session.
            </div>
        </>
    )
}