import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'category'})
export class category extends Document{
   @Prop()
   name:String
   
}

export const categorySchema = SchemaFactory.createForClass(category)
