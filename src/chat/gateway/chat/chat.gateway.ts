import { InjectModel } from '@nestjs/mongoose';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Model, Types } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { message } from 'src/helper/interfaces/message';
import { ChatModel } from 'src/schemas/chat.schema';

@WebSocketGateway({cors:{origin:['http://localhost:4200']}})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{
 

  constructor(  @InjectModel('chat')private readonly chatModel:Model<ChatModel>){}

  @WebSocketServer()
  server:Server

  handleConnection() {
    console.log('connection made')
  }

  handleDisconnect() {
    console.log('disconnected')
  }

  @SubscribeMessage('sendMessage')
 async handleMessage(socket:Socket,message:message){

  console.log(message)
    const {chat,senderId,recieverId}=message
    const recieverObjectId = new Types.ObjectId(recieverId)
    const senderObjectId = new Types.ObjectId(senderId)
    let chatData =await this.chatModel.find({sender:senderObjectId,reciever:recieverObjectId})
    const connection = chatData[0].connection

    const newChat = new this.chatModel({
    connection:connection,
    sender:senderObjectId,
    reciever:recieverObjectId,
    message:chat
})
await newChat.save()

    this.server.emit('newMessage',message)
  }
}
