import { user } from "./userModel"
import { freelancer } from "./freelancerModel"
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"
import mongoose, { ObjectId } from "mongoose" 


export type ConnectionModel = Connection & Document

@Schema({collection :'connection'})
export class Connection{

    @Prop({
        type:{
            user:{type:mongoose.Types.ObjectId,ref:'user'},
            freelancer:{type:mongoose.Types.ObjectId,ref:'freelancer'}
        }
    })
    connections:{
        user:ObjectId
        freelancer:ObjectId
    }
    @Prop({default: Date.now})
    timestamp:Date
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection)