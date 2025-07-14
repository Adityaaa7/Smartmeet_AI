//stpes:
//1.access the token from cookie or header
//2.docode the token
//3.find the user based on decoded token
//4.update user in req.body
//5.next() 

import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookie?.accessToken || req.header("Autherizarion")?.replace("Bearer","")

    if(!token){
        throw new ApiError(401,"UnAuthorized request")
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = User.findById(decodedToken._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Invalid access token")
    }

    req.user = user;
    next(); // when we write .post(verifyJWT,logoutUser) in routes   then it will execute jwt first and then it should go to logout therefore we write next

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})