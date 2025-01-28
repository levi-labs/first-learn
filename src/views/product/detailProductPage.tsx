import Image from 'next/image';
import style from './Product.module.scss';
import { productType } from '@/types/product';

const DetailProductPage = ({ product }: { product: productType }) => {
  return (
    <div key={product.id} className={style['product__card-item']}>
      <div className={style['product__card-item-image']}>
        <Image
          width={400}
          height={400}
          src={product!.images}
          alt={product.name}
          // priority={true} // Gambar diprioritaskan
          // loading={isSkeletonLoaded ? 'lazy' : 'eager'}
          // placeholder='blur'
          blurDataURL={product.images}
        />
      </div>
      <h4 className={style['product__card-item-name']}>{product.name}</h4>
      <p className={style['product__card-item-category']}>{product.category}</p>
      <p className={style['product__card-item-price']}>
        {product.price &&
          product.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
      </p>
    </div>
  );
};

export default DetailProductPage;
