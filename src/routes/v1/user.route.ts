import { Router } from "express";
import { UserController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { loginUserValidator, postUserValidator, updateUserValidtor, verifyUserValidator } from "../../validators/user.validators";

const userRouter = Router();

userRouter.route('/')
                .get(wrapErrorMiddleware(UserController.findUsers))

userRouter.route('/login')
                .post(loginUserValidator, wrapErrorMiddleware(UserController.loginUser));

userRouter.route('/register')
                .post(postUserValidator, wrapErrorMiddleware(UserController.createUser));

userRouter.route('/verify-email')
                .get(verifyUserValidator, wrapErrorMiddleware(UserController.verifyUser));

userRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(UserController.findUser))
                .patch(updateUserValidtor, wrapErrorMiddleware(UserController.updateUser))
                .delete(idValidator, wrapErrorMiddleware(UserController.deleteUser));

export default userRouter;