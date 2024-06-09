import { getBySearch,getById } from "@/app/entities/products/service";

export async function GET(req){
    const search = req.nextUrl.searchParams.get('search')
    const productID = req.nextUrl.searchParams.get('product_id')
    let data;
    if(productID)  data = await getById(productID)
    else if(search) data = await getBySearch(search) 
    return Response.json({data})
}
