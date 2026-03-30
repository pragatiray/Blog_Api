/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config/index';
import { genUsername } from '@/utils/index';
/**
 * Models
 */
import User from '@/models/v1/user';
import Token from '@/models/v1/token'
/**
 * Types
 */
import type { Request, Response } from 'express';   
import type {IUser} from '@/models/v1/user'

type UserData = Pick<IUser , 'email' | 'password' | 'role'>


const register = async ( req: Request, res: Response): Promise<void> =>{
    
    const {email, password, role} =  req.body as UserData;

    if(role === 'admin' && !config.WHITELIST_ADMIN_MAILS.includes(email)){
        res.status(403).json({
            code: 'Authorization',
            message: 'You cannot register as an admin'
        })
    logger.warn(
        `User with email ${email} tried to register as an admin but is not in the whitelist`
    );
     return;
    }  

    try{
        const username = genUsername();
        const newUser = await User.create({
            username,
            email,
            password,
            role
        });
        //Generate access token and refresh token for new user
        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        await Token.create({token: refreshToken, userId: newUser._id});
        logger.info('Refresh token created for user',{
            userId: newUser._id,
            token: refreshToken
        })
        // Store refresh token in db
        res.cookie('refreshToken',refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'PRODUCTION',
            sameSite: 'strict'
        });
        res.status(201).json({
            user:{
                username: newUser.username,
                email: newUser.email,
                role: newUser.role

            },
            accessToken
        });

        logger.info('User registered successfully',{
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        })
    } catch(err){
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
            error: err
        });
        logger.error('Error during user registration',err)
    }
}
export default register;