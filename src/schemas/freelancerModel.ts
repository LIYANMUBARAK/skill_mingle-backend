import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, Types } from 'mongoose';

@Schema({ collection: 'freelancer' })
export class freelancer extends Document {

    @Prop({type:Types.ObjectId})
    userId:ObjectId

    @Prop()
    skills: []

    @Prop()
    languages: []

    @Prop()
    occupation: String

    @Prop()
    education: String[]

    @Prop()
    certification: []

    @Prop()
    description: String

    @Prop()
    personalWebsite: String

    @Prop()
    instagram: String

    @Prop()
    facebook: String

    @Prop()
    twitter: String


}

export const freelancerSchema = SchemaFactory.createForClass(freelancer)

