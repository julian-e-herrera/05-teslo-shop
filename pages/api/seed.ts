import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDataBase } from '../../database'
import { Product,User } from '../../models'


type Data = {
    message: string
}

export default  async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({ message: 'no tiene acceso a este API' })
    }

    await db.connect()
    await User.deleteMany()
    await User.insertMany(seedDataBase.initialData.users)
    await Product.deleteMany()
    await Product.insertMany(seedDataBase.initialData.products)
    res.status(200).json({ message: 'proceso exitoso' })
}