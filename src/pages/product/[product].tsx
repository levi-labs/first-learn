import React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr/fetcher';
import DetailProductPage from '@/views/product/detailProductPage';
import { productType } from '@/types/product';
const DetailProduct = ({ product }: { product: productType }) => {
  const { query } = useRouter();
  // const { data, error, isLoading } = useSWR(
  //   `/api/product/${query.product}`,
  //   fetcher
  // );

  return (
    <>
      {/* client-side */}
      {/* {<DetailProductPage product={isLoading ? [] : data.data} />} */}

      {/* server-side */}
      <DetailProductPage product={product} />
    </>
  );
};

export default DetailProduct;

/**
 * Fetches product data from the API based on the product parameter
 * provided in the URL. This function runs on the server side and
 * returns the product data as props to be used in the page.
 *
 * @param {Object} params - The parameters passed to the server-side function.
 * @param {string} params.product - The product identifier fetched from the URL.
 *
 * @returns {Object} An object containing the product data to be used as props.
 */

// export async function getServerSideProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();
//   console.log(response.data);

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/products');
  const response = await res.json();
  return {
    paths: response.data.map((product: productType) => ({
      params: { product: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );
  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
}
