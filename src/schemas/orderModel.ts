import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'order'})
export class order extends Document{
   @Prop({type:Types.ObjectId})
   orderToken:ObjectId
   
   @Prop({type:Types.ObjectId,ref:'gig'})
   gigId:ObjectId

   @Prop({type:Types.ObjectId,ref:'user'})
   freelancer:ObjectId

   @Prop({type:Types.ObjectId,ref:'user'})
   user:ObjectId

   @Prop({default:Date.now})
   date:Date

   @Prop({default:false})
   completed:boolean

   @Prop({default:0})
   revisionCount:number

   

   @Prop()

   plan:string
   @Prop()
   
   price:string
   @Prop()

   deliveryTime:string

   @Prop()

   revision:number

   @Prop({})
  revisionData:{
      revisionFiles:Array<string>
      revisionDescription:string
      userNote:string
      date:Date
  }[]

   
}

export const orderSchema = SchemaFactory.createForClass(order)

