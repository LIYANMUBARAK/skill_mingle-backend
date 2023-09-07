import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from '../schemas/chat.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'chat',schema:ChatSchema}
  ])],
  providers: [ChatGateway]
})
export class ChatModule {}
