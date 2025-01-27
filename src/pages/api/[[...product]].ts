import { retrieveData, retrieveDataById } from '@/lib/firebasse/service';
import { get } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   status: boolean;
//   statusCode: number;
//   data: {
//     id: number;
//     name: string;
//     price: number;
//     size: string;
//   }[];
// };
type Data = {
  status: boolean;
  statusCode: number;
  data: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.product && req.query.product[1]) {
    const data = await retrieveDataById('products', req.query.product[1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  } else {
    const data = await retrieveData('products');
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     price: 100,
  //     size: 'S',
  //   },
  //   {
  //     id: 2,
  //     name: 'Product 2',
  //     price: 200,
  //     size: 'M',
  //   },
  //   {
  //     id: 3,
  //     name: 'Product 3',
  //     price: 300,
  //     size: 'L',
  //   },
  //   {
  //     id: 4,
  //     name: 'Product 4',
  //     price: 400,
  //     size: 'XL',
  //   },
  // ];



