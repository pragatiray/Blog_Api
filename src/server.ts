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
        console.log(`CORS Error: ${origin} is not allowed by CORS`)
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

app.get('/',(req,res) =>{
    res.json({
        message: 'Hello World'
    })
})

app.listen(config.PORT,() => {
    console.log(`Server running : http://localhost:${config.PORT}`);
})
