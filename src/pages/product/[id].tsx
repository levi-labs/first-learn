import React from 'react';
import { useRouter } from 'next/router';
const DetailProductPage = () => {
  const { query } = useRouter();
  console.log(query);

  return <div>DetailProductPage : {query.id} </div>;
};

export default DetailProductPage;
