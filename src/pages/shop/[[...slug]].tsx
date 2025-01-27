import { useRouter } from 'next/router';
import React from 'react';

const ShopPage = () => {
  const { query } = useRouter();
  return <div>ShopPage : {query.slug ? query.slug : 'All Items'}</div>;
};

export default ShopPage;
