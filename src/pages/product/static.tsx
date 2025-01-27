import ProductView from '@/views/product';
import Head from 'next/head';
import React from 'react';

type productType = {
  id: number;
  name: string;
  price: number;
  category: string;
  size: string;
  images: string;
};
const ProductPage = ({ products }: { products: productType[] }) => {
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/products');
  const response = await res.json();

  // Pass data to the page via props
  return { props: { products: response.data } };
}
