import ProductView from '@/views/product';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr/fetcher';

const ProductPage = () => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  }, []);
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  if (error) {
    console.log(error);
  }

  return (
    <div className='container'>
      <h1>Product Page</h1>
      <br />
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
};

export default ProductPage;
