import knex from "@/database";

export async function GET(){
    const data = await knex('inventory')
        .join('products','inventory.product_id','products.id')
        .join('prices','prices.product_id',"products.id")
        .select('products.id as product_id','products.name','prices.price','inventory.quantity')
    return Response.json({data})
}