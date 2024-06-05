import { getById,getByName,getByCategoryName } from "@/app/entities/products/service";
import knex from "@/database";

export async function GET(req){
    const productID = req.nextUrl.searchParams.get('product_id')
    const productName = req.nextUrl.searchParams.get('product_name')
    const categoryName = req.nextUrl.searchParams.get('category_name')
    let data;
    if(productID)  data = await getById(productID)
    else if(productName) data = await getByName(productName) 
    else if(categoryName) data = await getByCategoryName(categoryName)
    return Response.json({data})
}