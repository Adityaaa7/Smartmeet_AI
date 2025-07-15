import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.models.js'
import { ApiResponse } from "../utils/ApiResponce.js"; 
import jwt from "jsonwebtoken" 
import mongoose from "mongoose";


//we generate access and refresh token together so many times so better create a method and just call it
//steps
//1.find user
//2.find access adn refrsh token
//3.save
const generateAccessAndRefreshTokens = async(userId)=>{

    try{
        const user = User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})   

        return {accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500 , "Something went wrong while generating access and refresh token")
    }
}


//register
const registerUser = asyncHandler(async(req,res)=>{

    //steps 
    //1.get user details from frontend
    //2.validation,check corner cases, not empty
    //3.check if user already exists
    //4.create user object - entry in database
    //5.remove password and refreshtoken field 
    //6.check for user creation



    //1.user deatils
    const {name,username,email,password,role} = req.body

    //2.validation
    if(
        [name,email,username,password,role].some((field)=>{field?.trim() === "" })
    ){
        throw new ApiError(400,"All fields are required")
    }

    //3.check user already exist
    const existedUser = User.findOne({
        $or:[{username},{email}]
    }) 

    if(existedUser){
        throw new ApiError(409,"User with this name or email already exists")
    }

    //4.entry in database
    const user = await User.create({
        name,
        username,
        email,
        password,
        role
    })


    //5.check for user creation and remove password and refresh token feild
    const createdUser = User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }

    //6.Return responce
    return res
    .status(201)
    .json(new ApiResponse(200),createdUser,"User registered successfully!!")
})

//login
const loginUSer = asyncHandler(async(req,res)=>{
    //steps
    //1.bring data from req.body
    //2.username or email based login
    //3.find user
    //4.password check
    //5.generate access and refresh token
    //6.send token is form of cookies

    
    //1.bring data
    const {username,email,password} = req.body
    

    //2. username or email based login
    if(!username && !email){
        throw new ApiError(400, "Username or email is required")
    }

    //3.find user
    const user = User.findOne({
        $or:[username,email]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    //4.password check
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User credentials")
    }

    //5.generate refresh and access token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser =User.findById(_id).select("-password -refreshToken")
    
     //we need to select options for cookies
     const options = {
        httpOnly: true,  //only editable from server not from frontend
        secure:true
    }

    //6.send token is form of cookies
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User logged in successfully"
    ))
    



})