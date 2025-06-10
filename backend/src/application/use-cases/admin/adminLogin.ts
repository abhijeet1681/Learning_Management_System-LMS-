// // import User from "../../../domain/models/User";
// // import { comparePassword } from "../../../infrastructure/services/hashService";
// // import { CustomError } from "../../../interfaces/middlewares/errorMiddleWare";
// // import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtHelper";
// // import { IUserRepository } from "../../repositories/IUserRepository";

// // export class AdminLoginUseCase{
// //     constructor(private userRepository: IUserRepository){}

// //     async execute ( email: string, password: string) {
// //         const user = await this.userRepository.getUserByEmail(email)

// //         if (!user) {
// //             throw new CustomError("User not found, Please register", 404);
// //           } else if (user.isVerified === false) {
// //             throw new CustomError("User not verified", 400);
// //           }
// //           if(user.googleId){
// //             throw new CustomError('User registered with social login', 400)
// //         }
// //         //check role of user for login page based
// //         if(user.role !== 'admin'){
// //             throw new CustomError('You are not authorized, only admin can login', 400)
// //         }

// //         if(!user.password){
// //             console.error('password not found in user collection')
// //             return ;
// //         }

// //         const isPasswordValid = await comparePassword(password, user.password)
// //         if(!isPasswordValid) throw new CustomError('Invalid credentials', 400);
    

// //         const accessToken = generateAccessToken({id:user._id, role:user.role})
// //         const refreshToken = generateRefreshToken({id : user._id})
        
// //         return {accessToken, refreshToken, user:{ _id: user._id, firstName : user.firstName, lastName: user.lastName, email: user.email, role: user.role, phone: user.phone , createdAt: user.createdAt}}
// //     }
// // }

// import User from "../../../domain/models/User";
// import { comparePassword } from "../../../infrastructure/services/hashService";
// import { CustomError } from "../../../interfaces/middlewares/errorMiddleWare";
// import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtHelper";
// import { IUserRepository } from "../../repositories/IUserRepository";

// export class AdminLoginUseCase{
//     constructor(private userRepository: IUserRepository){}

//     async execute ( email: string, password: string) {
//         const user = await this.userRepository.getUserByEmail(email)

//         if (!user) {
//             throw new CustomError("User not found, Please register", 404);
//         }
        
//         // Removed verification check
        
//         if(user.googleId){
//             throw new CustomError('User registered with social login', 400)
//         }
        
//         //check role of user for login page based
//         if(user.role !== 'admin'){
//             throw new CustomError('You are not authorized, only admin can login', 400)
//         }

//         if(!user.password){
//             console.error('password not found in user collection')
//             throw new CustomError('Invalid account configuration', 400);
//         }

//         const isPasswordValid = await comparePassword(password, user.password)
//         if(!isPasswordValid) throw new CustomError('Invalid credentials', 400);
    
//         const accessToken = generateAccessToken({id:user._id, role:user.role})
//         const refreshToken = generateRefreshToken({id : user._id})
        
//         return {
//             accessToken, 
//             refreshToken, 
//             user:{ 
//                 _id: user._id, 
//                 firstName: user.firstName, 
//                 lastName: user.lastName, 
//                 email: user.email, 
//                 role: user.role, 
//                 phone: user.phone, 
//                 createdAt: user.createdAt
//             }
//         }
//     }
// }

import { CustomError } from "../../../interfaces/middlewares/errorMiddleWare";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtHelper";
import { comparePassword } from "../../../infrastructure/services/hashService";
import { IUserRepository } from "../../repositories/IUserRepository";

export class AdminLoginUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string) {
        try {
            // For debugging
            console.log(`Attempting admin login for: ${email}`);
            
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                throw new CustomError("User not found", 404);
            }
            
            console.log(`Found user with role: ${user.role}`);
            
            // Check if user is admin
            if (user.role !== 'admin') {
                throw new CustomError('You are not authorized, only admin can login', 403);
            }

            if (!user.password) {
                throw new CustomError('Invalid account configuration', 400);
            }

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new CustomError('Invalid credentials', 400);
            }
        
            const accessToken = generateAccessToken({id: user._id, role: user.role});
            const refreshToken = generateRefreshToken({id: user._id});
            
            console.log('Admin login successful');
            
            return {
                accessToken, 
                refreshToken, 
                user: { 
                    _id: user._id, 
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    email: user.email, 
                    role: user.role, 
                    phone: user.phone, 
                    createdAt: user.createdAt
                }
            };
        } catch (error) {
            console.error("Admin login error:", error);
            throw error;
        }
    }
}