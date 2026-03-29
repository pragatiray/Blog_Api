/**
 *  Node modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
/**
 * Custom modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import { connectToDatabase ,disconnectFromDatabase} from './lib/mongoose';

/**
 * Router
 */
import v1Routes from '@/route/v1';

/**
 * Types
 */
import type { CorsOptions } from 'cors';
/**
 * Express app initial
 */
const app = express();


//Configure CORS options
const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (config.NODE_ENV === 'development' || !origin || config.WHITELIST_ORIGINS.includes(origin)){
            callback(null, true)
        }
        else{
          callback(new Error(`CORS Error: ${origin} is not allowed by CORS`),
            false
           )
        }
    },
}
//Apply CORS middleware
app.use(cors(corsOptions));

//Enable JSON request body parsing
app.use(express.json());

//Enable URL-encoded request body parsing with extended mode
// `extended: true` allows rich objects and arrays via querystring library

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
    compression({
        threshold: 1024, //Only compress responses larger than 1KB
    }),
)

//Use helmet to enhance security by setting various HTTP headers
app.use(helmet())

//Apply rate limiting middleware to prevent excessive requests and enchance security 
app.use(limiter);



(async () => {
    try {
        await connectToDatabase();
        app.use('/api/v1', v1Routes);

        console.log('PORT IS ', config.PORT);

        app.listen(config.PORT, () => {
            console.log(`Server running : http://localhost:${config.PORT}`);
        });
    } catch (err) {
        console.log('Failed to start the server', err);
    }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database
 * 
 * - Attemot to disconnect from the database before shutting doiwn the server
 * 
 * - Logs a success message if the disconnection is successful
 * - If an error occurs during disconnection, it is logged to the console.
 * - Exists the process with status code
 */

const handleServerShutdown = async() => {
    try{
        await disconnectFromDatabase();
        console.log('Server SHUTDOWN')
        process.exit(0);
    } catch (err){
        console.log('Error during server shutdown',err);
    }
}
/**
 * Listens for termination signals(`SIGTERM` and `SIGINT`)
 * 
 * - `SIGTERM` is typically sent when stopping a process (e.g., `kill' 
 * command or container shutdown).
 * - `SIGINT` is triggered when the user interrupts the process( e.g., 
 * processing `Ctrl + C`).
 * - When either signal is received, `handleServerShutdown` IS executed 
 * to ensure proper cleanup
 */
process. on('SIGTERM',handleServerShutdown);
process.on ('SIGINT',handleServerShutdown);
