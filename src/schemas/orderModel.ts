import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'order'})
export class order extends Document{
   @Prop({type:Types.ObjectId})
   orderToken:ObjectId
   
   @Prop({type:Types.ObjectId,ref:'gig'})
   gigId:ObjectId

   @Prop({type:Types.ObjectId,ref:'freelancer'})
   freelancer:ObjectId

   @Prop({type:Types.ObjectId,ref:'user'})
   user:ObjectId

   @Prop({default:Date.now})
   date:Date

}

export const orderSchema = SchemaFactory.createForClass(order)

