import { verifyToken } from "../middleware/auth.js"
import {confirmOrder, createOrder, getOrders, getOrderById, updateOrderStatus} from "../controllers/order/order.js"


export const orderRoutes = async (fastify, options) => {
    fastify.addHook('preHandler', async(request, reply) => {
        const isAuthenticated = await verifyToken(Request, reply)
        if(!isAuthenticated){
            reply.status(401).send({message:"Unauthorized"})
        }
    })
    fastify.post('/order', createOrder)
    fastify.get('/order', getOrders)
    fastify.patch('/order/:orderId/status', updateOrderStatus)
    fastify.post('/order/:orderId/confirm', confirmOrder);
    fastify.post('order/:orderId', getOrderById);
}