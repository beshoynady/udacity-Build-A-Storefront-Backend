import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import Validation from '../../middleware/auth'

const route = Router()

route.post('/', Validation, controllers.Create) 
route.get('/', controllers.Index) 
route.get('/:product_id', controllers.Show) 
route.patch('/:product_id', Validation, controllers.Update) 
route.delete('/:product_id', Validation, controllers.Delete) 

export default route
