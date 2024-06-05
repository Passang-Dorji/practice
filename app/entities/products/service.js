import knex from "@/database";

export async function getById(productId){
    const data = await knex('products')
        .join('categories','products.category_id','categories.id')
        .join('prices','prices.product_id','products.id')
        .where('products.id',productId)
        .select('products.*',
                'prices.price',
                'categories.name as category_name'
                )
        return data
}

export const getByName= async(productName)=>{
    const data = await knex('products')
        .join('categories','products.category_id','categories.id')
        .join('prices','prices.product_id','products.id')
        .where('products.name',productName)
        .select('products.*',
                'prices.price',
                'categories.name as category_name'
                )
    return data
}

export const getByCategoryName = async(categoryName) =>{
    const data = await knex('categories')
        .join('products','products.category_id','categories.id')
        .join('prices','prices.product_id','products.id')
        .where('categories.name',categoryName)
        .select('products.*',
                'prices.price',
                'categories.name as category_name'
                )
        return data
}