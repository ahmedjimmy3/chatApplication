import { Router } from "express";
import * as userController from './user.controller.js'
import asyncWrapper from '../../utils/asyncWrapper.js'
import authMiddleware from '../../middlewares/auth.middleware.js'

const router  = Router()

router.post('/',
    asyncWrapper(userController.createUser)
)

router.post('/login',
    asyncWrapper(userController.login)
)

router.get('/',
    asyncWrapper(authMiddleware()),
    asyncWrapper(userController.getAllUsers)
)

export default router