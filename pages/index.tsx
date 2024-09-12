import React, { useEffect, useState } from 'react';
import Banner from '@/components/molecules/banner';
import CardNews from '@/components/molecules/cardnews';
import ListBirthdayComponent from '@/components/molecules/listBirthday';
import AvatarList from '@/components/molecules/avatarList';
import { usePerson } from '@/hooks/Person';
import { useNews } from '@/hooks/News'; 
import Link from 'next/link';
import { useStorePerson } from "@/hooks/Person/StoreProvider";
import { useStoreNews } from "@/hooks/News/StoreProvider";  
import Loading from '@/components/molecules/loading';      
// import { useMsal } from "@azure/msal-react";    
import { isEmpty } from 'lodash';    
// import { GetListUsers } from '@/utils/getListUsers';

function IndexComponents() {
  const { getAllPersons } = usePerson();
  const { getAllNews } = useNews();
  const [dateBirthday, setDateBirthday] = useState([]);
  const [listAdmissions, setListAdmissions]: any = useState([]);
  const [ loading, setLoading ] = useState(false);
  // const [dateAdmissions, setDateAdmissions] = useState([]);
  // const { accounts, instance } = useMsal();
  // const [listUsers, setListUsers] = useState([]);

  // useEffect(() => {
  //   if (accounts.length) {
  //     GetListUsers(accounts[0], instance).then((res: any) => {
  //       if (!isEmpty(res.value)) {
  //         setListUsers(res.value);
  //       }
  //     });
  //   }
  // }, [accounts[0]]);

  const { person } = useStorePerson() || [];
  const { news } = useStoreNews() || [];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        getAllPersons(),
        getAllNews(),
      ]);
      setLoading(false);
    }
    if(isEmpty(person) || isEmpty(news)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBirthdaysThisMonth = (people: any) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate() - 1;

    return people
      .filter((p: any) => new Date(p.birthdate).getMonth() + 1 === currentMonth && new Date(p.birthdate).getDate() >= currentDay)
      .sort((a: any, b: any) => new Date(a.birthdate).getDate() - new Date(b.birthdate).getDate());
  };

  const getAdmissionDate = (people: any[]) => {
    const currentDate = new Date();
    const targetDifference = 60 * 24 * 60 * 60 * 1000; 

    return (people.filter((user: any) => {
      const admissionDate = new Date(user.admissionDate);
    
      const difference = currentDate.getTime() - admissionDate.getTime();
      return difference <= targetDifference && difference < targetDifference + 86400000;
    })).slice(0, 8);
  };

  useEffect(() => {
    if (person && person.length > 0) {
      setDateBirthday(getBirthdaysThisMonth(person));
      setListAdmissions(getAdmissionDate(person));
    }
  }, [person]);

  // useEffect(() => {
  //   if (!isEmpty(dateBirthday) && !isEmpty(listUsers)) {
  //     setDateBirthday((dates: any) =>
  //       dates.map((date: any) => {
  //         const user: any = listUsers.find((u: any) => String(u.id) === String(date.userId));
  //         return user ? { ...date, name: user.displayName, jobTitle: user.jobTitle } : date;
  //       })
  //     );
  //   }
  // }, [listUsers, person]);

  return (
    <>
        {
          loading ?
            <>
              <div className={'pt-20'}>
                            <div className={'flex justify-center'}>
                                <Loading name={'Cargando ...'} />
                            </div>
                        </div>
            </> :
            <div className='h-screen grid md:grid-cols-12  grid-cols-1 xl:grid-cols-12'>
              {/* Col home description */}
              <div className='col-span-9 mt-[10px] border-r-[1px] border-[#E0E2E5] p-[25px] xl:p-[40px]'>
                <Banner/>
                <div className='flex justify-between mt-6 mb-5'>
                  <p className='font-bold'>¡Enhorabuena!</p>
                  <Link href={'/noticias'}><p className='font-light cursor-pointer text-[15px]'>Ver todos</p></Link>
                </div>
                {/* Content News colums */}
              <div className='grid justify-between grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 gap-4 mb-10'>
                  {
                    news.length && (news.slice(0, 4)).map((item: any) => (
                      <>
                        <Link href={`/leer-noticia/${item.id}`}>
                          <CardNews 
                            url={item.frontPage ? item.frontPage : "/bg-ground.svg"}
                            title={`${item.title.slice(0,32)}...`} 
                            description={`${item.description.slice(0,45)} ...`}/>
                        </Link>
                      </>
                    ))
                  }          
        
              </div>
              {/* content list welcome to new user */}
              <AvatarList people={listAdmissions} />
              </div>

              {/* Col birthday list */}
              <div className='col-span-3 p-[20px]'>
                  <ListBirthdayComponent listDateBirthday={dateBirthday} />
              </div>
             </div>
        } 
    </>
  )
}

export default function Index() {
  return (
    <>
      <IndexComponents />
    </>
  )
};


