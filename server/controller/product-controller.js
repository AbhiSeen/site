import { client } from '../database/db.js';
import Product from '../model/product-schema.js';


export const getProducts = async (request, response) => {
    try {
        client.get("products",async(err,products)=>{
            if(products){
                console.log("Cache hit")
                return response.status(200).json(JSON.parse(products));
            }
            else{
                console.log("Cache Miss")
                const products = await Product.find({}); 
                client.setex("products",1400,JSON.stringify(products))
                return response.status(200).json(products);
            }
        })     
    }catch (error) { 
        return response.status(500).json({message: error.message})
    }
}


export const getProductById = async (request, response) => {
    try {
        // console.log('Hie')
        const id=request.params.id;
        if(id){
            client.get(`${id}`,async(err,product)=>{
                if(product){
                    console.log("Cache hit")
                    return response.status(200).json(JSON.parse(product));
                }
                else{
                    console.log("Cache Miss")
                    const products = await Product.findOne({ 'id': id });
                    client.setex(`${id}`,1400,JSON.stringify(products))
                    return response.status(200).json(products);
                }
            })
        }else{
            return response.status(404).json({message:"No product found"});
        }
    }catch (error) {
        response.status(500).json({message: error.message})
    }
}