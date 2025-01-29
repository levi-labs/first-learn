import { useEffect, useState } from 'react';
import style from './Register.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ValidationErrors = {
  field: string;
  rules: string;
};
const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState<ValidationErrors[]>(
    []
  );
  const { push } = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    setValidationError([]);
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await res.json();

    if (res.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      console.log('ini response', response.validationError);

      setIsLoading(false);
      setError(response.message);
      setValidationError(response.validationError);
    }
  };
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      {error && (
        <div className={style.register__error}>
          <p>{error}</p>
          <ul>
            {validationError &&
              validationError.map((error, index) => (
                <li key={index}>
                  {error.field}: {error.rules}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className={style.register__content}>
        <form
          onSubmit={handleSubmit}
          className={style['register__content-form']}
        >
          <div className={style['register__form-group']}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your name' />
          </div>
          <div className={style['register__form-group']}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
            />
          </div>
          <div className={style['register__form-group']}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Your password'
            />
          </div>
          <button
            className={style.register__button}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={style.register__haveAccount}>
        Have an account ? <Link href={'/auth/login'}>Login</Link>
      </p>
    </div>
  );
};

export default RegisterView;
