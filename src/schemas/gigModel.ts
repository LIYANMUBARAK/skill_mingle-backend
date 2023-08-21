import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, Types } from 'mongoose';

@Schema({ collection: 'gig' })
export class gig extends Document {


    @Prop({type:Types.ObjectId,ref:'user'})
    freelancerId:ObjectId

    @Prop()
    title: string

    @Prop()
    category: string

    @Prop()
    subcategory: String

    @Prop()
    basicPrice: String[]

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




}

export const gigSchema = SchemaFactory.createForClass(gig)
