import { Router } from 'express'
import * as controllers from '../../controllers/users.controlles'
import verifyToken from '../../middleware/auth'

const route = Router()

route.post('/', controllers.Create) 
route.get('/', verifyToken, controllers.Index) 
route.get('/:user_id', verifyToken, controllers.Show) 
route.patch('/:user_id', verifyToken, controllers.Update) 
route.delete('/:user_id', verifyToken, controllers.Delete) 
route.post('/login', controllers.Authenticate) 
export default route
