import React, { useState } from 'react';
import style from './Login.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RxEyeNone, RxEyeOpen } from 'react-icons/rx';

const LoginView = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    router.push('/product');
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={style.login}>
      <div className={style.card}>
        <h1>Login Page</h1>
        <form action='' className={style.form}>
          <div className={style['form-group']}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' />
          </div>
          <div className={style['form-group']}>
            <label htmlFor='password'>Password</label>
            <div className={style.password}>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Password'
              />
              <button type='button' onClick={handleTogglePassword}>
                {showPassword ? (
                  <RxEyeNone color='#000' />
                ) : (
                  <RxEyeOpen color='#000' />
                )}
              </button>
            </div>
          </div>
          <button type='button' className={style.button} onClick={handleLogin}>
            Login
          </button>
        </form>

        <p>
          Dont have an account ? <Link href={'/auth/register'}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
