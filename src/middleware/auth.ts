import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';


const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];

      // check bearer
      if (token && bearer === 'bearer') {
        // decode token
        const decode = jwt.verify(
          token,
          config.token as unknown as string
        );
        if (decode) {
          next();
        }
        else {
          return res.status(401).send("Invalid Token").json({
            status: "error",
          })
        }
      } else {

        return res.status(401).send("Login Error").json({
          status: "error",
        })
      }
    }
    else {
      return res.status(401).send("Login Error").json({
        status: "error",
      })
    }
  } catch (error) {
    throw new Error(`Login Error ${error}`);

  }
};
export default auth;
