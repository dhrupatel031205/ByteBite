import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controllers.js";
import { updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);

Router.put("/updateProfile", protectRoute, updateProfile);

Router.get("/check",protectRoute,checkAuth)

export default Router;
