import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    const user = await userModel.create(req.body);
    res.status(200).json({
      data: { ...user },
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.index();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Show = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.show(req.params.id as unknown as string);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.update(req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // call from userModel deleteOne function
    const user = await userModel.delete(req.params.id as unknown as string);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.authenticate(email, password);

    const token = jwt.sign({ user }, config.token as unknown as string);

    if (!user) {
      return res.status(401).json({
        status: 'unauthorize user',
        message: 'please check your email or password and try again',
      });
    }

    return res.status(200).json({
      data: { ...user, token },
    });
  } catch (error) {
    res.status(400).json(error);
    return next(error);
  }
};
