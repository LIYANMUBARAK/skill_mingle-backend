import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'admin'})
export class admin extends Document{
   @Prop()
   name:String
   
   @Prop()
   userName:String

   @Prop()
   email:String

   @Prop()
   password:String

   @Prop()
   wallet:Number

}

export const adminSchema = SchemaFactory.createForClass(admin)


