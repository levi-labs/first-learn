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
    revalidated: boolean,
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.query.token !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({revalidated: false, message: 'Invalid token'});
    }
    if (req.query.data === 'product') {
        try {
            await res.revalidate('/product/static');
            return res.status(200).json({revalidated: true, message: 'Revalidated successfully'});
        } catch (error ) {
            const errorData = error instanceof Error ? error : new Error('Unknown error');
            return res.status(500).json({revalidated: false, message: errorData.message});
        }
    }
    return res.status(200).json({revalidated: false, message: 'No data provided'});
 
}

  


