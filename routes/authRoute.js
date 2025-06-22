import express from "express";
import {registerController,loginController,testController, forgotPasswordController,updateProfileController,getOrdersController,
    getAllOrdersController,orderStatusController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();
// const cors = require('cors');

// const app = express();

// // Allow requests from localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true, // If you need to include credentials (cookies, authorization headers, etc.)
// }));
//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//Login || Post
router.post("/login", loginController);
router.get('/test',requireSignIn,isAdmin,testController);


//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;