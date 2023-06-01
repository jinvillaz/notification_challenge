import { Router } from 'express'
import { getHandler } from './handler'

const router = Router()
router.route('/').get(getHandler)

export default router
