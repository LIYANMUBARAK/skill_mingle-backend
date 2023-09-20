import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, ObjectId, Types } from 'mongoose';

@Schema({ collection: 'gig' })
export class gig extends Document {


    @Prop({type:Types.ObjectId,ref:'user'})
    freelancerId:ObjectId

    @Prop()
    title: string

    @Prop({type:Types.ObjectId,ref:'category'})
    category: string

    @Prop({type:Types.ObjectId,ref:'subcategory'})
    subcategory: String

    @Prop()
    basicPrice: String

    @Prop()
    basicDeliveryTime: []

    @Prop()
    basicRevisions: String

    @Prop()
    standardPrice: String

    @Prop()
    standardDeliveryTime: String

    @Prop()
    standardRevisions: String

    @Prop()
    premiumPrice: String

    @Prop()
    premiumDeliveryTime: String

    @Prop()
    premiumRevisions: String

    @Prop()
    description: String


    @Prop()
    video: String


    @Prop()
    images: String[]

    @Prop({})
    reviews:{
       rating:number
        message:string
        userId: {
            type: mongoose.Schema.Types.ObjectId, // This should be of type ObjectId
            ref: 'user', // This refers to the 'User' model
          },
        orderId:string
        date:Date
    }[]


}

export const gigSchema = SchemaFactory.createForClass(gig)
