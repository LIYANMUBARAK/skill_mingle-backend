import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'subcategory'})
export class subcategory extends Document{
   @Prop()
   name:String
   
   @Prop({type:Types.ObjectId,ref:'category'})
   categoryId:ObjectId
}

export const subcategorySchema = SchemaFactory.createForClass(subcategory)
