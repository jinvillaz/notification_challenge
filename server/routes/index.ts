import { Router } from 'express'
import categoriesRouter from './categories'
import notificationsRouter from './notifications'

const router = Router()
router.use('/categories', categoriesRouter)
router.use('/notifications', notificationsRouter)

export default router
