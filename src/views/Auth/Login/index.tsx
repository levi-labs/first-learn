import React, { useState } from 'react';
import style from './Login.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RxEyeNone, RxEyeOpen } from 'react-icons/rx';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const LoginView = () => {
  const { push, query } = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const callbackUrl: any = query.callbackUrl || '/';
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setLoading(false);
        push(callbackUrl);
      } else {
        setLoading(false);
        setError(res.error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl, redirect: false });
    } catch (error: any) {
      setError(error.message);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={style.login}>
      <div className={style.card}>
        <h1>Login Page</h1>
        {error && <p className={style.error}>{error}</p>}
        <form onSubmit={handleLogin} className={style.form}>
          <div className={style['form-group']}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' name='email' />
          </div>
          <div className={style['form-group']}>
            <label htmlFor='password'>Password</label>
            <div className={style.password}>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Password'
                name='password'
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
          <button type='submit' className={style.button}>
            Login
          </button>
        </form>

        <p>
          Dont have an account ? <Link href={'/auth/register'}>Register</Link>
        </p>
        <div className={style['social-media']}>
          <button className={style.google} onClick={handleGoogleLogin}>
            <FcGoogle /> <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
