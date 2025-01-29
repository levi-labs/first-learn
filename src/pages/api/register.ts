// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from '@/lib/firebasse/service';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean;
  message: string
  validationError?: {
    field: string;
    rules: string
  } []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        await signUp(req.body, ({status, message, validationError} : {status:boolean, message:string, validationError?:{field:string,rules:string}[]}) => {
            // console.log('validationError',validationError);
            
            if (status === false && validationError) {
                res.status(400).json({ status: false, message, validationError });
            }
            if (status) {
                res.status(200).json({ status: true, message });
            }else{
            res.status(400).json({ status: false, message });
        }
        })
    }else{
        res.status(405).json({ status: false, message: 'Method not allowed' });
    }
}
