import {
    signUp,
    signIn,
    updateProfile,
    getProfile,
    getPrivateProfile
} from "../controllers/users.js";
import { authorization } from "../utils/authorization.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/users prefix as defined in index.js

// POST /users/register

router.post("/register", signUp);

// POST /users/signin

router.post("/signin", signIn);

// PUT /users/edit

router.put("/edit", authorization, updateProfile);

// GET /users/:id/public

router.get("/:id/public", getProfile);

// GET /users/:id/private

router.get("/:id/private", authorization, getPrivateProfile);

// export the router
export default router;
