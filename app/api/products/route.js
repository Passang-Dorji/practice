import knex from "@/database";

export async function GET(){
    const data = await knex('products')
        .join('categories','products.category_id','categories.id')
        .join('prices','prices.product_id','products.id')
        .select('products.*','categories.name as category_name','categories.description as cate_description','prices.price')
        return Response.json({data})
}

export async function POST(req){
    const {name,description,category_id,price}= await req.json()
       const data = await knex.transaction(async(trx)=>{
        const [createdProducts] = await trx('products').insert({
            name,
            description,
            category_id
        }).returning('*')
   
        await trx('prices').insert({
            price,
            product_id:createdProducts.id
        })
        await trx('inventory').insert({
            quantity:0,
            product_id:createdProducts.id,
            created_at:new Date().toISOString()
        })
        return createdProducts
    })
    return Response.json({data})
}

