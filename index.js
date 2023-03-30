const express = require('express')
const dotnet = require('dotenv')
const connectToDB = require('./connectDB')
const cors = require('cors')
const cloudinary = require('cloudinary')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const path = require('path')
const BASE_URL = process.env.BASE_URL
const app = express()
app.use(express.json())
dotnet.config()
connectToDB()


// app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cors({ origin: "*", credentials: true }))


// config
// dotnet.config({ path: 'backend/config/config.env' });
// app.get('*', (req,res)=>{
  //   app.use(express.static(path.resolve(__dirname, 'frontend','build')))
  //   res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html'))
  // })
  
  app.use(express.static(path.join(__dirname, './frontend','dist')))
if (process.env.NODE_ENV !== 'production') {
  app.get('/*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, './frontend','dist', 'index.html'))
})
}


// app.use(cors({ origin: "https://absolute-estore-zeta.vercel.app/", credentials: true }))




// to use req.body middleware must use
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(fileUpload())



// getting all the provided routes
// app.use('/api/productController',require ('./routes/productController'))
app.use('/api/product',productRoutes)
app.use('/api/auth',userRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/payment',paymentRoutes)
// app.use(errorMiddleware)

// if (process.env.NORD_ENV ==='production') {
//   app.use(express.static(path.join(__dirname, '../ecommerce/build')))
//   app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, '../ecommerce/build.index.html'))
//   })
// }


// app.use(express.static(path.join(__dirname, './frontend','build')))
// if (process.env.NODE_ENV !== 'production') {
//   app.get('/*', (req,res)=>{
//   res.sendFile(path.resolve(__dirname, './frontend','build', 'index.html'))
// })
// }

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
 
app.listen(BASE_URL, () => {
  console.log(`Example app listening at http://localhost:${BASE_URL} 🚀`)
})