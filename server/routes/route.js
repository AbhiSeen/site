import express from  'express';
import { userSignUp , userLogin,verifyToken,logout,addReferral,getReferrals, addProductsfromUser, getEarnings, addReferralLink} from '../controller/user-controller.js';
import { getProducts ,getProductById } from '../controller/product-controller.js';
import { getUserInfofromId, getUsers,getOrders, addProduct} from '../controller/admin-controller.js';
const router = express.Router();

//login & signup
router.post('/signup',userSignUp);
router.post('/login',userLogin); 
router.post('/logout',verifyToken,logout);
router.post('/addReferral',verifyToken,addReferral);
router.post('/addReferralLink',verifyToken,addReferralLink);
router.get('/getReferrals',verifyToken,getReferrals);
router.get('/getEarnings',verifyToken,getEarnings)
router.get('/getUsers',verifyToken,getUsers);
router.get('/getUserInfo/:id',verifyToken,getUserInfofromId);
router.get('/getOrders/:id',verifyToken,getOrders);


router.get('/products', getProducts);
router.post('/addProducts',verifyToken,addProductsfromUser);
router.post('/addProduct',verifyToken,addProduct)
router.get('/product/:id', getProductById);

export default router;