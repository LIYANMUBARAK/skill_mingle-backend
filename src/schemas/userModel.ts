import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document,ObjectId,Types} from 'mongoose';

@Schema({collection:'user'})
export class user extends Document{
   @Prop()
   name:String
   
   @Prop()
   userName:String

   @Prop()
   email:String

   @Prop()
   password:String

   @Prop()
   mobileNumber:Number

    @Prop()
   gender:String

   @Prop({default:0})
   wallet:Number

   @Prop()
   bio:String

   @Prop()
   country:String

   @Prop()
   city:String

   @Prop({type:Types.ObjectId})
   freelancerId:ObjectId

   @Prop()
   isFreelancer:boolean


   @Prop()
   isBlocked:boolean

   @Prop()
   profilePic:string

   @Prop({default:Date.now})
   dateOfJoin:Date

}

export const userSchema = SchemaFactory.createForClass(user)


