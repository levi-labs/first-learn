import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <p>
        Already have an account ? <Link href={'/auth/login'}>Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
