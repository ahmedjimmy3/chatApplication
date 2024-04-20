import { Router } from "express";
import * as chatController from './chat.controller.js'
import asyncWrapper from '../../utils/asyncWrapper.js'
import authMiddleware from '../../middlewares/auth.middleware.js'

const router  = Router()

router.post('/',
    asyncWrapper(authMiddleware()),
    asyncWrapper(chatController.createChat)
)

router.get('/:destId',
    asyncWrapper(authMiddleware()),
    asyncWrapper(chatController.getChat)
)

export default router