import { Server } from "socket.io";

let io
export const generateIo=(server)=>{
    io = new Server(server,{cors:'*'})
    return io
}

export const getIO=()=>{
    if(!io){
        throw new Error('Socket.io not initialized')
    }
    return io
}