import express from  'express';
import { userSignUp , userLogin,verifyToken,logout,addReferral,getReferrals, addProducts } from '../controller/user-controller.js';
import { getProducts ,getProductById } from '../controller/product-controller.js';
const router = express.Router();

//login & signup
router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.post('/logout',logout);
router.post('/addReferral',verifyToken,addReferral);
router.get('/getReferrals',verifyToken,getReferrals);


router.get('/products', getProducts);
router.post('/addProducts',addProducts)
router.get('/product/:id', getProductById);

export default router;