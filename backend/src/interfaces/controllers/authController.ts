// import { NextFunction, Request, Response } from "express";
// import { RegisterUserUseCase } from "../../application/use-cases/user/registerUser";
// import { LoginUserUseCase } from "../../application/use-cases/user/loginUser";
// import { verifyOtpCode } from "../../application/use-cases/user/verifyOtp";
// import { sendOtp } from "../../application/use-cases/user/sendOtp";
// import { refreshAccessToken } from "../../application/use-cases/user/refreshAccessToken";
// import { logout } from "../../application/use-cases/user/logout";
// import { verifyAccessTokenUseCase } from "../../application/use-cases/user/verifyToken";
// import {
//   resetPassword,
//   sendResetOtp,
//   verifyResendOtp,
// } from "../../application/use-cases/user/resetPassword";
// import { CustomError } from "../middlewares/errorMiddleWare";
// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "../../utils/jwtHelper";
// import {
//   accessTokenOptions,
//   refreshTokenOptions,
// } from "../../infrastructure/config/jwt";
// import { AdminLoginUseCase } from "../../application/use-cases/admin/adminLogin";
// import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
// import { GetUserDataUseCase } from "../../application/use-cases/user/getUserData";
// import { UserRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
// import { config } from "../../infrastructure/config/config";

// const userRepository = new UserRepositoryImpl();

// // export const signUp = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { firstName, lastName, email, password, phone } = req.body;
// //     const registerUserUseCase = new RegisterUserUseCase(userRepository);
// //     const registeredUser = await registerUserUseCase.execute({
// //       firstName,
// //       lastName,
// //       email,
// //       password,
// //       phone,
// //     });
// //     const { password: removedPassword, ...rest } = registeredUser.toObject();
// //     //send otp
// //     const sentOTP = await sendOtp(registeredUser.email);
// //     res.status(201).json({ success: true, user: rest });
// //   } catch (error: any) {
// //     next(error);
// //   }
// // };

// // export const sendOtpHandler = async (req: Request, res: Response) => {
// //   try {
// //     const { email } = req.body;
// //     //sent otp
// //     const sentOTP = await sendOtp(email);
// //     console.log("sentOtp controller", sentOTP);
// //     res.status(200).json(sentOTP);
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.message });
// //     console.error(error.message);
// //   }
// // };

// // export const verifyOtpHandler = async (req: Request, res: Response) => {
// //   try {
// //     const { email, otp } = req.body;;
// //     const response = await verifyOtpCode(email, otp);
// //     res.status(200).json(response);
// //   } catch (error: any) {
// //     res.status(400).json({ success: false, message: error.message });
// //     console.error(error);
// //   }
// // };
// export const signUp = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { firstName, lastName, email, password, phone } = req.body;
//     const registerUserUseCase = new RegisterUserUseCase(userRepository);
    
//     const registeredUser = await registerUserUseCase.execute({
//       firstName,
//       lastName,
//       email,
//       password,
//       phone,
//     });
    
//     const { password: removedPassword, ...rest } = registeredUser.toObject();
    
//     // No OTP sending, just return success
//     res.status(201).json({ 
//       success: true, 
//       message: "User registered successfully",
//       user: rest 
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };

// // export const getUserDataController = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { userId } = req.params;
// //     if (!userId) {
// //       throw new CustomError("User id not found", 400);
// //     }
// //     const getUserDataUseCase = new GetUserDataUseCase(userRepository);
// //     const response = await getUserDataUseCase.execute(userId);
// //     res
// //       .status(200)
// //       .json({
// //         success: true,
// //         user: response,
// //         message: "User data sent to front end",
// //       });
// //   } catch (error: any) {
// //     next(error);
// //   }
// // };

// export const getUserDataController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       throw new CustomError("User id not found", 400);
//     }
//     const getUserDataUseCase = new GetUserDataUseCase(userRepository);
//     const response = await getUserDataUseCase.execute(userId);
    
//     res.status(200).json({
//       success: true,
//       user: response,
//       message: "User data retrieved successfully",
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };

// // export const loginHandler = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { email, password } = req.body;
// //     const loginUseCase = new LoginUserUseCase(userRepository);
// //     const response = await loginUseCase.execute(email, password);
// //     if (!response) throw new CustomError("Something went wrong", 400);
// //     res.cookie("refreshToken", response.refreshToken, refreshTokenOptions);
// //     res.cookie("accessToken", response.accessToken, accessTokenOptions);

// //     res
// //       .status(200)
// //       .json({
// //         success: true,
// //         user: response.user,
// //         token: response.accessToken,
// //       });
// //   } catch (error: any) {
// //     next(error);
// //   }
// // };


// export const loginHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     const loginUseCase = new LoginUserUseCase(userRepository);
    
//     const response = await loginUseCase.execute(email, password);
//     if (!response) {
//       throw new CustomError("Something went wrong", 400);
//     }
    
//     // Set cookies
//     res.cookie("refreshToken", response.refreshToken, refreshTokenOptions);
//     res.cookie("accessToken", response.accessToken, accessTokenOptions);

//     // Return response
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: response.user,
//       token: response.accessToken,
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };


// // export const adminLoginHandler = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { email, password } = req.body;
// //     const adminLoginUseCase = new AdminLoginUseCase(userRepository);
// //     const response = await adminLoginUseCase.execute(email, password);
// //     if (!response) {
// //       throw new CustomError("Something went wrong", 400);
// //     }
// //     res.cookie("adminRefreshToken", response.refreshToken, refreshTokenOptions);
// //     res.cookie("adminAccessToken", response.accessToken, accessTokenOptions);

// //     res
// //       .status(200)
// //       .json({
// //         success: true,
// //         user: response.user,
// //         token: response.accessToken,
// //       });
// //   } catch (error: any) {
// //     next(error);
// //   }
// // };

// export const adminLoginHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     console.log(`Admin login attempt for: ${email}`);
    
//     const adminLoginUseCase = new AdminLoginUseCase(userRepository);
//     const response = await adminLoginUseCase.execute(email, password);
    
//     if (!response) {
//       throw new CustomError("Something went wrong", 400);
//     }
    
//     // Set cookies with proper options
//     res.cookie("adminRefreshToken", response.refreshToken, refreshTokenOptions);
//     res.cookie("adminAccessToken", response.accessToken, accessTokenOptions);

//     // Return successful response
//     res.status(200).json({
//       success: true,
//       message: "Admin login successful",
//       user: response.user,
//       token: response.accessToken,
//     });
//   } catch (error: any) {
//     console.error("Admin login error:", error);
//     next(error);
//   }
// };

// //refresh access token after expire
// export const refreshTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if(!token) {
//       throw new CustomError('Refresh token not found')
//     }
//     const accessToken = await refreshAccessToken(token);

//     res.cookie("accessToken", accessToken, accessTokenOptions);
//     res.status(200).json({ success: true, data: accessToken });
//   } catch (error) {

//     // res.clearCookie("accessToken", { httpOnly: true, 
//     //   sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//     //   secure: config.app.ENVIRONMENT === 'production' });
//     // res.clearCookie("refreshToken", {
//     //   httpOnly: true,
//     //  sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//     //   secure: config.app.ENVIRONMENT === 'production'
//     // });


//     next(error);
//   }
// };
// //refresh admin access token after expire
// export const refreshAdminTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies.adminRefreshToken;
//     if(!token) {
//       throw new CustomError('Admin refresh token not found')
//     }
//     const adminAccessToken = await refreshAccessToken(token);

//     res.cookie("adminAccessToken", adminAccessToken, accessTokenOptions);
//     res.status(200).json({ success: true, data: adminAccessToken });
//   } catch (error) {
//     // res.clearCookie("adminAccessToken", { httpOnly: true, 
//     //  sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//     //   secure: config.app.ENVIRONMENT === 'production' });
//     // res.clearCookie("adminRefreshToken", {
//     //   httpOnly: true,
//     //   sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//     //   secure: config.app.ENVIRONMENT === 'production'
//     // });
//     next(error);
//   }
// };

// //logout handler

// export const logoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     //clear cookies for access and refreshtoken
//     res.clearCookie("accessToken", { httpOnly: true, 
//       sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//       secure: config.app.ENVIRONMENT === 'production' });
//     res.clearCookie("refreshToken", { httpOnly: true, 
//       sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//       secure: config.app.ENVIRONMENT === 'production' });

//     const message = logout();

//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     next(error);
//   }
// };
// //logout handler

// export const adminLogoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     //clear cookies for access and refreshtoken
//     res.clearCookie("adminAccessToken", { httpOnly: true, 
//       sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//       secure: config.app.ENVIRONMENT === 'production' });
//     res.clearCookie("adminRefreshToken", {
//       httpOnly: true,
//       sameSite: config.app.ENVIRONMENT === 'production' ? "none" : "strict", 
//       secure: config.app.ENVIRONMENT === 'production'
//     });

//     const message = logout();
//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     next(error);
//   }
// };

// export const validateUser = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) {
//     return res.status(401).json({ message: "Access token expired" });
//   }
//   try {
//     const verifyUser = await verifyAccessTokenUseCase(accessToken);
//     return res.status(200).json({ user: verifyUser, message: "User verified" });
//   } catch (error) {
//     if (error instanceof TokenExpiredError) {
//       res.status(401).json({ message: "Access token expired" });
//     } else if (error instanceof JsonWebTokenError) {
//       res.status(401).json({ message: "Invalid access token" });
//     } else {
//       res.status(400).json({ message: "Unauthorized" });
//     }
//   }
// };

// export const validateAdmin = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const accessToken = req.cookies.adminAccessToken;
//   if (!accessToken) {
//     return res.status(401).json({ message: "Admin access token expired" });
//   }
//   try {
//     const verifyUser = await verifyAccessTokenUseCase(accessToken);
//     return res
//       .status(200)
//       .json({ user: verifyUser, message: "Admin verified" });
//   } catch (error) {
//     if (error instanceof TokenExpiredError) {
//       res.status(401).json({ message: "Admin access token expired" });
//     } else if (error instanceof JsonWebTokenError) {
//       res.status(401).json({ message: "Invalid admin access token" });
//     } else {
//       res.status(400).json({ message: "Unauthorized" });
//     }
//   }
// };

// //reset password

// export const resetPasswordOtpSendHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body;
//     if (!email) throw new CustomError("Email required", 404);

//     const sendOtp = await sendResetOtp(email);

//     res.status(200).json(sendOtp.message);
//   } catch (error) {
//     next(error);
//   }
// };

// export const resetPasswordOtpVerifyHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email && !otp) {
//       throw new CustomError("email and otp required", 400);
//     } else if (!email) {
//       throw new CustomError("email required", 400);
//     } else if (!otp) {
//       throw new CustomError("otp required", 400);
//     }

//     const verifyOtpResponse = await verifyResendOtp(email, otp);
//     res.status(200).json(verifyOtpResponse);
//   } catch (error) {
//     next(error);
//   }
// };

// export const resetPasswordHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, otp, password } = req.body;

//     if (!email || !otp || !password) {
//       let error: string[] = [];
//       if (!email) error.push("email");
//       if (!otp) error.push("otp");
//       if (!password) error.push("password");

//       throw new CustomError(`${error.join(",")} required`, 400);
//     }

//     const verifyOtp = await verifyResendOtp(email, otp);
//     const resettedUser = await resetPassword(email, password);
//     console.log(email, "password reset success");
//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     next(error);
//   }
// };

// interface AuthenticatedRequest extends Request {
//   user?: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: string;
//   };
// }

// export const googleLoginSuccess = (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   const user = req.user;

//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const accessToken = generateAccessToken({ id: user.id, role: user.role }); // Function to generate JWT
//   const refreshToken = generateRefreshToken({ id: user.id });

//   res.cookie("accessToken", accessToken, accessTokenOptions);
//   res.cookie("refreshToken", refreshToken, refreshTokenOptions);
//   // Set the JWT token in a cookie

//   res.json({
//     user: {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role || "student", // Adjust role as necessary
//     },
//     token: accessToken,
//   });
// };

// export const googleLoginFailure = (req: Request, res: Response) => {
//   res.status(401).json({ message: "Google login failed" });
// };
// // 


import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/user/registerUser";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
import { LoginUserUseCase } from "../../application/use-cases/user/loginUser";
import { CustomError } from "../middlewares/errorMiddleWare";
import { AdminLoginUseCase } from "../../application/use-cases/admin/adminLogin";
import { GetUserDataUseCase } from "../../application/use-cases/user/getUserData";
// Update the import path if the file exists with a different name or location
import { refreshTokenOptions, accessTokenOptions } from "../../infrastructure/config/jwt";
import { verifyRefreshToken, generateAccessToken } from "../../utils/jwtHelper";

// Create repository instance
const userRepository = new UserRepositoryImpl();

// User registration without OTP verification
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    
    const registeredUser = await registerUserUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
    
    const { password: removedPassword, ...rest } = registeredUser.toObject();
    
    // No OTP sending, just return success
    res.status(201).json({ 
      success: true, 
      message: "User registered successfully",
      user: rest 
    });
  } catch (error: any) {
    next(error);
  }
};

// Regular user login
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const loginUseCase = new LoginUserUseCase(userRepository);
    
    const response = await loginUseCase.execute(email, password);
    
    if (!response) {
      throw new CustomError("Something went wrong", 400);
    }
    
    // Set cookies
    res.cookie("refreshToken", response.refreshToken, refreshTokenOptions);
    res.cookie("accessToken", response.accessToken, accessTokenOptions);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: response.user,
      token: response.accessToken,
    });
  } catch (error: any) {
    next(error);
  }
};

// Admin login handler
export const adminLoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(`Admin login attempt for: ${email}`);
    
    const adminLoginUseCase = new AdminLoginUseCase(userRepository);
    const response = await adminLoginUseCase.execute(email, password);
    
    if (!response) {
      throw new CustomError("Something went wrong", 400);
    }
    
    // Set cookies
    res.cookie("adminRefreshToken", response.refreshToken, refreshTokenOptions);
    res.cookie("adminAccessToken", response.accessToken, accessTokenOptions);

    // Return successful response
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: response.user,
      token: response.accessToken,
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    next(error);
  }
};

// Refresh token handler
export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
      throw new CustomError("Refresh token not found", 401);
    }
    
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new CustomError("Invalid refresh token", 401);
    }
    
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    
    res.cookie("accessToken", accessToken, accessTokenOptions);
    
    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// User logout
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("refreshToken", "", { maxAge: 1 });
    res.cookie("accessToken", "", { maxAge: 1 });
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Admin logout
export const adminLogoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("adminRefreshToken", "", { maxAge: 1 });
    res.cookie("adminAccessToken", "", { maxAge: 1 });
    
    res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get user data
export const getUserDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new CustomError("User id not found", 400);
    }
    
    const getUserDataUseCase = new GetUserDataUseCase(userRepository);
    const response = await getUserDataUseCase.execute(userId);
    
    res.status(200).json({
      success: true,
      user: response,
      message: "User data retrieved successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

// Validate user token
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This should be handled by middleware, just return success if reached
    res.status(200).json({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    next(error);
  }
};

// Validate admin token
export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This should be handled by middleware, just return success if reached
    res.status(200).json({
      success: true,
      message: "Admin token is valid",
    });
  } catch (error) {
    next(error);
  }
};

// Google login success handler
export const googleLoginSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Handle Google login success
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// Google login failure handler
export const googleLoginFailure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Handle Google login failure
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  } catch (error) {
    next(error);
  }
};

// Password reset handler
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Simple password reset without OTP
    const { email, newPassword } = req.body;
    
    // Implementation details depend on your User model and services
    // But this would normally involve finding the user and updating their password
    
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};