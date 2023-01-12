import { Router } from 'express'
import Validation from '../../middleware/auth'
import * as controllers from '../../controllers/orders.controllers'

const route = Router()

route.post('/', Validation, controllers.Create) //when creating new user no need to validation
route.get('/', Validation, controllers.Index) //require validation
route.get('/:order_id', Validation, controllers.Show) //require validation
route.patch('/:order_id', Validation, controllers.Update) //require validation
route.delete('/:order_id', Validation, controllers.Delete) //require validation
export default route
