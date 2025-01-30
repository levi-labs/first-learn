import React from 'react';
import style from './Navbar.module.css';
import { signIn, useSession, signOut } from 'next-auth/react';
const Navbar = () => {
  const { data }: any = useSession();
  // console.log('session', data);

  return (
    <div className={style.navbar}>
      <h1>Navbar</h1>
      {data ? (
        <div className={style.user}>
          {data.user?.image && (
            <img className={style.avatar} src={data.user?.image} />
          )}
          <p>{data.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
};

export default Navbar;
