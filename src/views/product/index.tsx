import Image from 'next/image';
import style from './Product.module.scss';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DetailProductPage from './detailProductPage';
import { productType } from '@/types/product';

// type productType = {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   size: string;
//   images: string;
// };

const ProductView = ({ products }: { products: productType[] }) => {
  // Mengatur state untuk skeleton
  //   const [isSkeletonLoaded, setSkeletonLoaded] = useState(true);

  // Menunda pemuatan gambar dan skeleton
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setSkeletonLoaded(false); // Setelah waktu yang ditentukan, set skeleton ke false
  //     }, 500); // Anda bisa menyesuaikan waktu sesuai kebutuhan

  //     return () => clearTimeout(timer); // Membersihkan timer saat komponen dibongkar
  //   }, []);

  return (
    <div className={style.product}>
      <div className={style.product__card}>
        {products.length === 0
          ? Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className={style['product__card-skeleton']}>
                <div className={style['product__card-skeleton-image']} />
                <div className={style['product__card-skeleton-name']} />
                <div className={style['product__card-skeleton-category']} />
                <div className={style['product__card-skeleton-price']} />
              </div>
            ))
          : products.map((product: productType) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className={style['product__card-item']}
              >
                <div className={style['product__card-item-image']}>
                  <Image
                    width={400}
                    height={400}
                    src={product.images}
                    alt={product.name}
                    // priority={true} // Gambar diprioritaskan
                    // loading={isSkeletonLoaded ? 'lazy' : 'eager'}
                    // placeholder='blur'
                    blurDataURL={product.images}
                  />
                </div>
                <h4 className={style['product__card-item-name']}>
                  {product.name}
                </h4>
                <p className={style['product__card-item-category']}>
                  {product.category}
                </p>
                <p className={style['product__card-item-price']}>
                  {product.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProductView;
