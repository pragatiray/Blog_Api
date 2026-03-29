/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 *  Node modules
 */

import mongoose from 'mongoose';

/**
 * Custom modules
 */
import config from '@/config/index';
import {logger} from '@/lib/winston';

/**
 * Types
 */

import type { ConnectOptions } from 'mongoose';

/**
 * Client option
 */
const clientOptions : ConnectOptions = {
    dbName : 'blog-api',
    appName: 'Blog API',
    serverApi: {
        version :'1',
        strict: true,
        deprecationErrors : true
    }
}

/**
 * Establishes a connnection to the MongoDB database using Mongoose.
 * If the error occurs during the connection process, it throws an error 
 * with a descriptive message.
 * 
 * - Uses `MONGO_URI` as the connection string.
 * - `clientOptions` contains additional configuration for Mongoose.
 * - Errors are properly handled and rethrown for better debugging.
 */

export const connectToDatabase = async(): Promise<void> =>{
    if (!config.MONGO_URI){
        throw new Error('MongoDB is not defined in the configiration')
    }
    try{
        await mongoose.connect(config.MONGO_URI,clientOptions);
        logger.info('Connected to databse successfully',{
        uri: config.MONGO_URI,
        options: clientOptions
        });
    } catch(err){
        if (err instanceof Error){
            throw err;
        }
        logger.error('Error connectiong to the databse', err)
    }
}

/**
 * Disconnects from the MongoDB database using Mongoose.
 * 
 * This function attempts to disconnect from the database asyncronously,
 * If the disconnection is successful, a success manage is logged.
 * If an error occurs, it is either re-thrown as a new Error( if it's an instance
 * of Error or logged to the console)
 */

export const disconnectFromDatabase = async(): Promise<void> =>{
    try{
        await  mongoose.disconnect();
        logger.info('Disconnected from the datase successfully',{
            uri: config.MONGO_URI,
            options: clientOptions
        })
    } catch(err){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        logger.error('Error disconnecting from the database',err)
    }
};