import dbConnection from '../db/db-connection.js'
import errorHandler from './middlewares/error-handler.middleware.js'
import * as Routers from './modules/index.router.js'
import cors from'cors'
import { generateIo } from './utils/generateIO.js'


const initiateApp = (app, express)=>{
    const port = 5000

    dbConnection()

    app.use(express.json())
    app.use(cors())

    app.use('/user',Routers.userRouter)
    app.use('/chat',Routers.chatRouter)
    app.use(errorHandler)

    const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    const io = generateIo(server)
    io.on('connection')
}

export default initiateApp