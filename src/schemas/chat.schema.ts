import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document,Schema as MongooseSchema, ObjectId ,} from "mongoose";
import { Connection } from "./chat.connection";


export type ChatModel = Chat & Document


@Schema({collection :'chats'})
export class Chat{
    @Prop({type:mongoose.Types.ObjectId,ref:'Connection'})
    connection:Connection

    @Prop({type:MongooseSchema.ObjectId})
    sender:ObjectId

    @Prop({type:mongoose.Types.ObjectId})
    reciever:ObjectId

    @Prop()
    message : string

    @Prop ({default:Date.now})
    timestamp:Date

    @Prop({})
    seen:boolean


}

export const ChatSchema = SchemaFactory.createForClass(Chat)