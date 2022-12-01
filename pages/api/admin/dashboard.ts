import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Order, User, Product } from '../../../models'

type Data = {
    numberOfOrders: number,
    paidOrders: number,
    numberOfClients: number,
    numberOfProducts: number,
    numberWithNoInventory: number,
    lowInventory: number,
    notPaidOrders: number,
      
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect()
 
    const [
            numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            numberWithNoInventory,
            lowInventory
        ] =   await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({inStock:{$lte:10}}).count()
])
    await db.disconnect()
    
    res.status(200).json({
            numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            numberWithNoInventory,
            lowInventory,
            notPaidOrders: numberOfOrders - paidOrders,
      })
}