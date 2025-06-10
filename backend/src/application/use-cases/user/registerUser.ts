// import bcrypt from 'bcryptjs'
// import User, {IUser} from '../../../domain/models/User'
// import { CustomError } from '../../../interfaces/middlewares/errorMiddleWare';
// import { IUserRepository } from '../../repositories/IUserRepository';
// import { hashPassword } from '../../../infrastructure/services/hashService';



// // export class RegisterUserUseCase{
// //     constructor(private userRepository: IUserRepository){}

// //     async execute(userData: {firstName: string, lastName: string, email: string, phone: string, password: string}) {
// //         const {firstName , lastName, email, password, phone} = userData;
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //         if(!emailRegex.test(email)){
// //             throw new CustomError('Enter a valid email', 400)
// //         }
// //          //check user already exists or not 
// //     const userExist = await this.userRepository.getUserByEmail(email)
// //     if(userExist && userExist.isVerified === false){
// //         throw new CustomError('Please verify your account',400)
// //     }
// //     if(userExist){
// //         throw new CustomError('User already exists', 400)
// //     }
// //     if(!password){
// //         throw new CustomError('password required', 400)
// //     }

// //     const hashedPassword = await hashPassword(password)
// //     const registeredUser = await this.userRepository.createUser({firstName, lastName, email, role : 'student', password: hashedPassword, phone})
// //      return registeredUser
// //     }
// // }

// export class RegisterUserUseCase {
//   constructor(private userRepository: IUserRepository) {}

//   async execute(userData: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone: string;
//     isVerified?: boolean; // Add this parameter
//   }) {
//     // Validation code...
    
//     // Create user
//     const hashedPassword = await hashPassword(userData.password);
    
//     const userToCreate = {
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email.toLowerCase(),
//       password: hashedPassword,
//       role: 'student',
//       phone: userData.phone,
//       isVerified: userData.isVerified || false, // Use the parameter if provided
//     };
    
//     // Save user
//     const user = await this.userRepository.createUser(userToCreate);
    
//     return user;
//   }
// }

import bcrypt from 'bcryptjs'
import User, {IUser} from '../../../domain/models/User'
import { CustomError } from '../../../interfaces/middlewares/errorMiddleWare';
import { IUserRepository } from '../../repositories/IUserRepository';
import { hashPassword } from '../../../infrastructure/services/hashService';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const { firstName, lastName, email, password, phone } = userData;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError('Enter a valid email', 400);
    }
    
    // Check if user already exists
    const userExist = await this.userRepository.getUserByEmail(email);
    if (userExist) {
      throw new CustomError('User already exists', 400);
    }
    
    // Validate password
    if (!password) {
      throw new CustomError('Password required', 400);
    }
    
    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    
    const registeredUser = await this.userRepository.createUser({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student',
      phone,
      isVerified: true, // Auto verify all users
    });
    
    return registeredUser;
  }
}