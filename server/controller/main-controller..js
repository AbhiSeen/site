import express from  'express';
import { verifyToken,logout,addReferral,getReferrals, addOrder, getEarnings, addReferralLink, signUp, login, clearBlackList, refreshTokens} from './user-controller.js';
import { getProducts , deleteProduct } from './product-controller.js';
import { getUserInfo, getUsers,getOrders, addProduct} from './admin-controller.js';
const router = express.Router();
import cron from 'node-cron';
import { uploadFile } from '../MulterConfig.js';

cron.schedule('*/10 * * * *', async() => {
    console.log("in cron");
    await clearBlackList();
});


router.post('/signup',signUp);
router.post('/login',login); 
router.post('/logout',logout);
router.post('/addReferral',verifyToken,addReferral);
router.post('/addReferralLink',verifyToken,addReferralLink);
router.get('/getReferrals',verifyToken,getReferrals);
router.get('/getEarnings',verifyToken,getEarnings)
router.get('/getUsers',verifyToken,getUsers);
router.get('/getUserInfo/:id',verifyToken,getUserInfo);
router.get('/getOrders',verifyToken,getOrders);
router.post("/refresh",verifyToken,refreshTokens);

router.get('/getProducts',getProducts);
router.post('/addOrder',verifyToken,addOrder);
router.post('/addProduct',verifyToken,uploadFile,addProduct)
router.delete('/deleteProduct/:productId',verifyToken,deleteProduct);

export default router;