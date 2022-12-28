import { Router } from "express";
import { activateAccount, loadProtected, loginUser, registerUser } from "../controllers/user";
import { isAdmin, isLoggedIn } from "../middleware/user";
import { runValidation } from "../validations/index";
import { loginValidator, registrationValidator } from "../validations/user";

const userRoute = Router();

// register api Routers 
userRoute.post("/register",registrationValidator,runValidation, registerUser);
userRoute.post("/account-activation",activateAccount);
userRoute.post("/login",loginValidator,runValidation, loginUser);
userRoute.get("/loginCheck", isLoggedIn, (req,res) => {
    return res.json({success:true})
})
userRoute.get("/adminCheck", isLoggedIn,isAdmin, (req,res) => {
    return res.json({success:true})
})
userRoute.get("/protected",isLoggedIn,isAdmin, loadProtected);


export default userRoute;