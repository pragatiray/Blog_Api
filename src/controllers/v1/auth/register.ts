/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config/index';
import { genUsername } from '@/utils/index';
/**
 * Models
 */
import User from '@/models/v1/user'
/**
 * Types
 */
import type { Request, Response } from 'express';   
import type {IUser} from '@/models/v1/user'

type UserData = Pick<IUser , 'email' | 'password' | 'role'>


const register = async ( req: Request, res: Response): Promise<void> =>{
    
    const {email, password, role} =  req.body as UserData;
    console.log(email,password,role)
    try{
        const username = genUsername();
        const newUser = await User.create({
            username,
            email,
            password,
            role
        })
        res.status(201).json({
            user:{
                username: newUser.username,
                email: newUser.email,
                role: newUser.role

            },
            message: 'New user created'
        });
    } catch(err){
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
            error: err
        });
        logger.error('Error during user registration')
    }
}
export default register;