import { ConsoleLogger, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/dto/userDto';
import { loginFormDto } from 'src/dto/loginFormDto';
import { user } from 'src/schemas/userModel';
import { JwtService } from '@nestjs/jwt';
import { category } from 'src/schemas/categoryModel';
import { subcategory } from 'src/schemas/subcategoryModel';
import { freelancer } from 'src/schemas/freelancerModel';
import { ConnectionModel } from 'src/schemas/chat.connection';
import { ChatModel } from 'src/schemas/chat.schema';
import { order } from 'src/schemas/orderModel';
import { gig } from 'src/schemas/gigModel';
import { MailerModule, MailerService } from '@nestjs-modules/mailer'
import { join } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { workDto } from 'src/dto/workDto';
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt')

@Injectable()
export class UserService {

    constructor(
        @InjectModel('user') private readonly userModel: Model<user>,
        @InjectModel('category') private readonly categoryModel: Model<category>,
        @InjectModel('subcategory') private readonly subcategoryModel: Model<subcategory>,
        @InjectModel('freelancer') private readonly freelancerModel: Model<freelancer>,
        @InjectModel('gig') private readonly gigModel: Model<gig>,
        @InjectModel('connection')private readonly connectionModel:Model<ConnectionModel>,
        @InjectModel('chat')private readonly chatModel:Model<ChatModel>,
        @InjectModel('order')private readonly orderModel:Model<order>,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) { }

    async registerUser(registerForm: CreateUserDto): Promise<any> {
        try {
            const { name, userName, email, password, mobileNumber, gender, country, city } = registerForm
            const hashPassword = await bcrypt.hash(password, 10)
            const emailExist = await this.userModel.findOne({ email })
            const userNameExist = await this.userModel.findOne({ userName })
            const mobileNumberExist = await this.userModel.findOne({ mobileNumber })
            if (emailExist) {
                return { emailMatch: "Email is already used" }
            }
            else {

                if (mobileNumberExist) {
                    return { mobileNumberMatch: "User Name is already taken" }
                }
                else {
                    if (userNameExist) {
                        return { userNameExist: "User Name is already used" }
                    }
                    else {

                        const user = new this.userModel({
                            name: name,
                            userName: userName,
                            email: email,
                            password: hashPassword,
                            mobileNumber: mobileNumber,
                            gender: gender,
                            country: country,
                            city: city,
                            isBlocked: false,
                            dateOfJoin: Date.now()
                        })
                        await user.save();
                        return { userSave: true }

                    }
                }
            }

        } catch (error) {
            console.log(error.message)
        }

    }

    async loginUser(loginForm: loginFormDto) {
        try {
            const { email, password } = loginForm
            const user = await this.userModel.findOne({ email })
            if (user) {
                if (user.isBlocked === false) {
                    const hashPassword = await bcrypt.hash(password, 10)
                    const passwordCheck = await bcrypt.compare(password, user.password)

                    if (passwordCheck) {
                        const payload = { sub: user._id, email: email }
                        const token = await this.jwtService.signAsync(payload)
                        return { token: token, id: user._id, userData: user }
                    }
                    else {
                        return { passwordError: "Password is Incorrect" }
                    }
                }
                else {
                    return { isBlockedError: "User is blocked by the Admin" }
                }
            }
            else {
                return { emailError: "Email not found" }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getUser(phoneNumber: any) {
        try {

            const number = parseInt(phoneNumber)
            const phoneNumberWithCountryCode = `91${number}`

            const userExist = await this.userModel.findOne({ mobileNumber: number })

            if (userExist) {
                const payload = { sub: userExist._id, email: userExist.email }
                const token = await this.jwtService.signAsync(payload)
                return { token: token, user: userExist, id: userExist._id }
            }
            else {
                return { userExistError: "User not found" }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getUserUsingId(id: any) {
        try {

            const userId = new Types.ObjectId(id)

            const user = await this.userModel.findOne({ _id: userId })

            if (user) {
                return { user: user }
            }
            else {
                return { userExistError: "User not found" }
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    async loadCategoriesAndSubCategories() {
        try {
            const categories = await this.categoryModel.find({})
            const subcategories = await this.subcategoryModel.find({})
            return { categories: categories, subcategories: subcategories }
        } catch (error) {
            console.log(error.message)
        }
    }


    async freelancerApply(freelancerApplyForm) {
        try {
            let personalWebsite = ''
            let instagram = ''
            let facebook = ''
            let twitter = ''
            const { userId, skills, languages, occupation, education, certification, description } = freelancerApplyForm
            if (freelancerApplyForm.personalWebsite) {
                personalWebsite = freelancerApplyForm.personalWebsite
            }
            if (freelancerApplyForm.instagram) {
                const instagram = freelancerApplyForm.instagram
            }
            if (freelancerApplyForm.facebook) {
                const facebook = freelancerApplyForm.facebook
            }
            if (freelancerApplyForm.twitter) {
                const twitter = freelancerApplyForm.twitter
            }
            const userObjectId = new Types.ObjectId(userId)
            const freelancer = await new this.freelancerModel({
                userId: userObjectId,
                skills: skills,
                languages: languages,
                occupation: occupation,
                education: education,
                certification: certification,
                description: description,
                personalWebsite: personalWebsite,
                instagram: instagram,
                facebook: facebook,
                twitter: twitter
            }).save();

            const freelancerId = freelancer._id

            await this.userModel.updateOne({ _id: userId }, { $set: { freelancerId: freelancerId, isFreelancer: false } })
            return { freelancerApply: true }
        } catch (error) {
            console.log(error.message)
        }
    }


    async addGig(gigData) {
        const userObjectId = new Types.ObjectId(gigData.userId)

        const gig = await new this.gigModel({
            freelancerId: userObjectId,
            title: gigData.title,
            category: gigData.categorySelect,
            subcategory: gigData.subCategorySelect,
            basicPrice: gigData.basicPrice,
            basicDeliveryTime: gigData.basicDeliveryTime,
            basicRevisions: gigData.basicRevisions,
            standardPrice: gigData.standardPrice,
            standardDeliveryTime: gigData.standardDeliveryTime,
            standardRevisions: gigData.standardRevisions,
            premiumPrice: gigData.premiumPrice,
            premiumRevisions: gigData.premiumDeliveryTime,
            premiumDeliveryTime: gigData.premiumRevisions,
            description: gigData.description,
            video: gigData.video,
            images: gigData.images,

        }).save();
        return { gigSave: true }
    }

    async getAllGigs(freelancerId) {

        const freelancerObjectId = new Types.ObjectId(freelancerId)

        const gigData = await this.gigModel.find({ freelancerId: freelancerObjectId }) .populate({
            path: 'category',
            model: 'category',
                     })
          .populate({
            path: 'subcategory',
            model: 'subcategory',
            
          })
        console.log(gigData)
        return { gigData: gigData }
    }

    async getAllCategories() {
        try {
            const categoryData = await this.categoryModel.find()
            return { categoryData: categoryData }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getSubcategoriesOfCategory(categoryId: string) {
        try {
            const categoryObjectId = new Types.ObjectId(categoryId)
            const subcategoryData = await this.subcategoryModel.find({ categoryId: categoryObjectId })

            return { subcategoryData: subcategoryData }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getGigs() {
        try {
            const gigsData = await this.gigModel.find().populate('freelancerId')
            return { gigsData: gigsData }
        } catch (error) {
            console.log(error.message)
        }
    }

    async    getGigOfCategory(categoryName) {
        try {
            const categoryData=await this.categoryModel.findOne({name:categoryName})
            const categoryId=categoryData._id.toString()
            
            const gigsData = await this.gigModel.find({category:categoryId}).populate('freelancerId').populate('category').populate('subcategory')
           
            return { gigsData: gigsData }
        } catch (error) {
            console.log(error.message)
        }
    }


 

    async deleteGig(id) {
        try {

            const gigId = new Types.ObjectId(id)

            await this.gigModel.deleteOne({ _id: gigId })

            return { deleteGig: true }

        } catch (error) {
            console.log(error.message)
        }

    }

    async getGig(id: string) {
        const gigId = new Types.ObjectId(id)

        const gigData = await this.gigModel.findOne({ _id: gigId }).populate('freelancerId')
        return { gigData: gigData }
    }


    async emailExist(email: string) {

        const userData = await this.userModel.findOne({ email: email })

        if (userData) {
            return { emailExist: true }
        }
        else {
            return { emailExist: false }
        }
    }

    async editUser(formData) {
        console.log(formData)
        const nameExist = await this.userModel.findOne({ name: formData.name })
        const userNameExist = await this.userModel.findOne({ userName: formData.userName })


        const name = formData.name
        const userName = formData.userName
        const city = formData.city
        await this.userModel.findOneAndUpdate({ name: name }, { $set: { name: name, userName: userName, city: city ,profilePic:formData.profilePic} })
        return { userEdit: true }
    }

    async sendPasswordResetEmail(email: string) {
        console.log(email)
        const filePath = join(__dirname, '../emails/passwordReset.html');
        const htmlTemplate = readFileSync(filePath, 'utf8');

        const compiledTemplate = handlebars.compile(htmlTemplate);
        const token = await this.jwtService.signAsync({ userEmail: email });
        const userData = await this.userModel.findOne({ email: email })
        console.log(email)
        const dynamicData = {
            name: userData.name,
            resetLink: `${process.env.FRONTEND_URL}/resetPassword/${token}`
        };
        const htmlContent = compiledTemplate(dynamicData);
        this.mailerService.sendMail({
            to: email,
            from: 'skillmingle69@gmail.com',
            subject: 'Password Reset',
            text: 'welcome',
            html: htmlContent
        })
    }

    async chatConnect(ids){
        const {freelancerId,userId}=ids
        const freelancerObjectId=new Types.ObjectId(freelancerId)
        const userObjectId=new Types.ObjectId(userId)
            const details = await this.connectionModel.findOne({
                'connections.user':userObjectId,
                'connections.freelancer':freelancerObjectId
            })
        
            if(!details){
                const newConnection = new this.connectionModel({
                    connections:{
                        user:userObjectId,
                        freelancer:freelancerObjectId
                    }
                })
                await newConnection.save()
                const connectionId = newConnection._id
                console.log("connection id"+connectionId)
                const userChat = {
                    connection : connectionId,
                    sender:userObjectId,
                    reciever:freelancerObjectId
                }
                this.intialUser(userChat)
                const freelancerChat = {
                    connection:connectionId,
                    sender:freelancerObjectId,
                    reciever:userObjectId
                }
                this.intialFreelancer(freelancerChat)
                
            }
            return {chatConnect:true}
    }

    async intialUser(userChat){

        const newChat = new this.chatModel({
            connection:userChat.connection,
            sender:userChat.sender,
            reciever:userChat.reciever,
           
        })
        await newChat.save()
       
    }

    async intialFreelancer(freelancerChat){
        const newChat = new this.chatModel({
            connection:freelancerChat.connection,
            sender:freelancerChat.sender,
            reciever:freelancerChat.reciever,
          
        })
        await newChat.save()
    }

    async getChatforUser(freelancerAndUserId){
        const {freelancerId,userId}=freelancerAndUserId
        const freelancerObjectId = new Types.ObjectId(freelancerId)
        const userObjectId = new Types.ObjectId(userId)
        let chat =await this.chatModel.find({sender:userObjectId,reciever:freelancerObjectId})
        const connection = chat[0].connection
         chat = await this.chatModel.find({connection:connection})
         

        return {chat:chat}
    }

    async chatSend(chat)
    {  
        console.log(chat)
        const {freelancerId,userId,chatMessage}=chat
        const freelancerObjectId = new Types.ObjectId(freelancerId)
        const userObjectId = new Types.ObjectId(userId)
        let chatData =await this.chatModel.find({sender:userObjectId,reciever:freelancerObjectId})
        const connection = chatData[0].connection
   
        const newChat = new this.chatModel({
        connection:connection,
        sender:userObjectId,
        reciever:freelancerObjectId,
        message:chatMessage
    })
    await newChat.save()
        
        return {chatSend:true}
    }

    async getConnections(userId){
        const userObjectId = new Types.ObjectId(userId)
        
        const allConnections=await this.connectionModel.find({'connections.user':userObjectId}).populate('connections.freelancer')
     
        return {connections:allConnections}
    }

    async getConnectionsForFreelancer(freelancerId){
        const freelancerObjectId = new Types.ObjectId(freelancerId)
        const allConnections = await this.connectionModel.find({'connections.freelancer':freelancerObjectId}).populate('connections.user')
        console.log(allConnections)
        return {connections:allConnections}
    }

    async orderSave(orderData){
        const {orderToken,gigId,freelancerId,userId,plan,price,deliveryTime,revision}=orderData
        const freelancerObjectId = new Types.ObjectId(freelancerId)
        const userObjectId = new Types.ObjectId(userId)
        const orderSave = new this.orderModel({
            orderToken:orderToken,
            gigId:gigId,
            freelancer:freelancerObjectId,
            user:userObjectId,
            plan:plan,
            price:price,
            deliveryTime:deliveryTime,
            revision:revision
        })
      
        await orderSave.save()
        return {orderSave:true}
    }

   async getSubcategories(categoryName){
    {
        try {
           const category=await this.categoryModel.findOne({name:categoryName})

            const subcategoryData = await this.subcategoryModel.find({categoryId:category._id})
            
           
            return { subcategoryData: subcategoryData }
        } catch (error) {
            console.log(error.message)
        }
    }
    }



    async getAllOrdersForUser(userId){
        try{
            console.log(userId)
            const userObjectId = new Types.ObjectId(userId)
            const orderData = await this.orderModel.find({user:userObjectId}).populate('freelancer').populate('gigId').populate('user')
            return orderData
        }
        catch(error){
            console.log(error.message)
        }
    }


    async  getAllOrdersForFreelancer(freelancerId){
        try{
            console.log(freelancerId)
            const freelancerObjectId = new Types.ObjectId(freelancerId)
            const orderData = await this.orderModel.find({freelancer:freelancerObjectId}).populate('freelancer').populate('gigId').populate('user')
            return orderData
        }
        catch(error){
            console.log(error.message)
        }
    }


    async  getOrderById(orderId){
        try{
            console.log(orderId)
            const orderObjectId = new Types.ObjectId(orderId)
            const orderData = await this.orderModel.findOne({_id:orderObjectId}).populate('freelancer').populate('gigId').populate('user')
            return orderData
        }
        catch(error){
            console.log(error.message)
        }
    }

    
   async sendWork(workData:workDto){
    try {
         const {files,description,gigId}=workData
         console.log(workData.files)
         const gigObjectId= new Types.ObjectId(gigId)
         const uniqueId = uuidv4(); // generating new id

         // Set the generated ID to the document
   
         await this.orderModel.updateOne({_id:gigObjectId},
            {$push:{
                revisionData:{
                    _id:uniqueId,
                    revisionFiles:files,
                    revisionDescription:description,
                    date:Date.now()
                }
            }},
          )
          await this.orderModel.updateOne({_id:gigId},  {
            $inc:{
                revisionCount:1
            }
        })
    } catch (error) {
        console.log(error.message)
    }
   }


  async sendRevision(workDetails){
    try {
        console.log(workDetails)
        const {orderId,revisionId,userRecommendations}=workDetails
      const orderObjectId=new Types.ObjectId(orderId)
      
        await this.orderModel.updateOne({_id:orderObjectId , "revisionData._id":revisionId},{$set:{"revisionData.$.userNote":userRecommendations}})
       
        const orderData= await this.orderModel.findOne({_id:orderId})
        
    } catch (error) {
        console.log(error.message)
    }
   }

   async completeOrder(orderId){
    try {
        const orderObjectId = new Types.ObjectId(orderId.orderId)
        await this.orderModel.updateOne({_id:orderObjectId},{$set:{completed:true}})
    } catch (error) {
        console.log(error.message)
    }
   }

   async addReview(reviewDetails){
    try {
        console.log(reviewDetails)
    const gigObjectId = new Types.ObjectId(reviewDetails.gigId._id)
    const orderObjectId = new Types.ObjectId(reviewDetails.orderId)
    const userObjectId = new Types.ObjectId(reviewDetails.userId)
      
    await this.gigModel.updateOne({_id:gigObjectId},
        {$push:{
            reviews:{
                rating:reviewDetails.rating,
                message:reviewDetails.reviewMesssage,
                gigId:gigObjectId,
                userId:userObjectId,
                orderId:orderObjectId,
                date:Date.now()
            }
        }})
      
    } catch (error) {
        console.log(error.message)
    }
   }
   
}

