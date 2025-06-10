// import { Request, Response, Router } from "express";
// import { 
//   signUp, 
//   refreshTokenHandler, 
//   logoutHandler, 
//   validateUser, 
//   resetPasswordHandler, 
//   googleLoginSuccess, 
//   googleLoginFailure, 
//   adminLogoutHandler, 
//   adminLoginHandler, 
//   getUserDataController, 
//   validateAdmin,
//   loginHandler // Make sure this is exported from authController
// } from "../controllers/authController";
// import passport from "passport";
// import { googleLogin } from "../controllers/googleAuthLibrary";
// import { registerInstuctorHandler } from "../controllers/instructor/instructorController";
// import { authorizeRole, isAuthenticated } from "../middlewares/authMiddleware";
// import { 
//   changePasswordHandler, 
//   editProfileEmailController, 
//   editProfileHandler 
// } from "../controllers/student/profile/profileController";

// const router = Router();

// // Core authentication routes
// router.post('/signup', signUp);
// router.post('/login', loginHandler);
// router.post('/logout', logoutHandler);

// // Token validation routes
// router.post('/verify-user-token', validateUser);
// router.post('/verify-admin-token', validateAdmin);

// // Password management (without OTP)
// router.post('/reset-password', resetPasswordHandler);

// // Token refresh
// router.post('/refresh-token', refreshTokenHandler);

// // Social login
// router.post('/google', googleLogin);

// // Instructor registration
// router.post('/instructor-register', registerInstuctorHandler);

// // User profile routes (require authentication)
// router.use(isAuthenticated, authorizeRole(['student', 'instructor']))
//   .post('/profile/change-password', changePasswordHandler)
//   .post('/profile/edit', editProfileHandler)
//   .patch('/profile/edit/email', editProfileEmailController)
//   .get('/user-data/:userId', getUserDataController);

// export default router;

import { Request, Response, Router } from "express";
import { 
  signUp, 
  refreshTokenHandler, 
  logoutHandler, 
  validateUser, 
  resetPasswordHandler, 
  googleLoginSuccess, 
  googleLoginFailure, 
  adminLogoutHandler, 
  adminLoginHandler, 
  getUserDataController, 
  validateAdmin,
  loginHandler
} from "../controllers/authController";
import passport from "passport";
import { googleLogin } from "../controllers/googleAuthLibrary";
import { registerInstuctorHandler } from "../controllers/instructor/instructorController";
import { authorizeRole, isAuthenticated } from "../middlewares/authMiddleware";
import { 
  changePasswordHandler, 
  editProfileEmailController, 
  editProfileHandler 
} from "../controllers/student/profile/profileController";

const router = Router();

// Core authentication routes
router.post('/signup', signUp);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

// Token validation routes
router.post('/verify-user-token', validateUser);
router.post('/verify-admin-token', validateAdmin);

// Password management (without OTP)
router.post('/reset-password', resetPasswordHandler);

// Token refresh
router.post('/refresh-token', refreshTokenHandler);

// Social login
router.post('/google', googleLogin);

// Instructor registration
router.post('/instructor-register', registerInstuctorHandler);

// User profile routes (require authentication)
router.use(isAuthenticated, authorizeRole(['student', 'instructor']))
  .post('/profile/change-password', changePasswordHandler)
  .post('/profile/edit', editProfileHandler)
  .patch('/profile/edit/email', editProfileEmailController)
  .get('/user-data/:userId', getUserDataController);

export default router;