import productModel, {Product} from '../product.model'
import db from '../../database/index'

const ProductModel = new productModel()

describe('Products Model Unit Testing', () => {
  describe('Testing the existince of the methods first', () => {
    it('should have Create one product methode', () => {
      expect(ProductModel.create).toBeDefined()
    })

    it('should have Get all products methode', () => {
      expect(ProductModel.index).toBeDefined()
    })

    it('should have Get one product methode', () => {
      expect(ProductModel.show).toBeDefined()
    })

    it('should have update one product methode', () => {
      expect(ProductModel.update).toBeDefined()
    })

    it('should have delete product methode', () => {
      expect(ProductModel.delete).toBeDefined()
    })
  })
  describe('Testing the loginc of the Products Model', () => {
    const product = {
      name: 'Big Bottle Water',
      price: '5LE'
    } as Product

    beforeAll(async () => {
      const creatProduct = await ProductModel.create(product)
      product.id = creatProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM products`
      await connection.query(sql)
      connection.release()
    })

    it('get all  products should  return all products in db ', async () => {
      const products = await ProductModel.index()
      expect(products.length).toBe(1)
    })

    it('Create new  product should  return the new product in db ', async () => {
      const product = {
        name: 'Small Bottle Water',
        price: '3LE'
      } as Product
      const creatProduct = await ProductModel.create(product)
      product.id = creatProduct.id
      expect(creatProduct.name).toBe(product.name)
      expect(creatProduct.price).toBe(product.price)
    })

    it('get one  product should  return specific in db ', async () => {
      const oneProduct = await ProductModel.show(product.id)
      expect(oneProduct.name).toBe(product.name)
      expect(oneProduct.price).toBe(product.price)
    })
    it('update one  product should  return the updated product in db ', async () => {
      const updatedProduct = await ProductModel.update({
        ...product,
        name: 'Can Pepsi',
        price: '6LE'
      })
      expect(updatedProduct.name).toBe('Can Pepsi')
      expect(updatedProduct.price).toBe('6LE')
    })

    it('delete one  product should  return the deleted one  in db ', async () => {
      const deleteProduct = await ProductModel.delete(
        product.id
      )
      expect(deleteProduct.id).toBe(product.id)
      const Products = await ProductModel.index()
      expect(Products.length).toBe(1)
    })
  })
})
