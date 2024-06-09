import knex from "@/database";

export async function POST(req,{params}){
    const productID = params.id 
    const {quantity,description} = await req.json()
    const data = await knex.transaction(async(trx)=>{
        await trx('stock_update').insert({
            product_id:productID,
            quantity,
            description,
            updated_at:new Date().toISOString()
        })
        await trx('inventory')
            .increment('quantity',quantity)
            .where('product_id',productID)
    })
    return Response.json({data})
}