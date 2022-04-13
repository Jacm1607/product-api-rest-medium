const Products = require('../models/products');

const index = async(req, res) => {
    // const products = await Products.findAll({
    //     order: [['id','ASC']]
    // });
    const products = await Products.findAll();
    try {
        res.status(200).json(products)
    } catch (error) {
        console.log(error);   
    }
}

const create = async (req, res) => {
    const { name , price, mrp, stock } = req.body;
    const data = {
        name, price, mrp, stock, isPublished: false
    }
   const product = new Products(data);
   await product.save();
   res.status(201).json(data)
}

const update = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Products.findByPk(id);
        const { mrp, stock, price } = product.dataValues;
        if (mrp >= price && stock > 0) {
            const result = await (product).update({"isPublished": true})
            console.log(result);
            res.status(204).send();
        } else {
            if (mrp < price && stock <= 0) {
                res.status(422).json({
                    mss: 'MRP should be less than equal to the Price y Stock count is 0'
                })
            } else if (mrp < price) {
                res.status(422).json({
                    mss:'MRP should be less than equal to the Price'
                })
            }
            else if (stock <= 0) {
                res.status(422).json({
                    mss: 'Stock count is 0'
                })
            }

        }

    } catch (error) {
        console.log(error);
    }
}

const destroy = (req, res) => {
    res.status(405).json({
        mss:'operacion no valida'
    })
}
module.exports = {
    index, create, update, destroy
}