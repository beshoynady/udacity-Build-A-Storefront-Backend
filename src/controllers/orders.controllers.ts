import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.create(req.body);

    res.status(200).send('order success').json({
      data: { ...order },
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};

export const Index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.index(
      req.params.email as unknown as string
    );
    res.status(200).send('all order').json({
      data: order,
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
    const order = await orderModel.show(req.params.id as unknown as number);

    //
    res.status(200).send('your order').json({
      data: order,
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
    const order = await orderModel.update(req.body);
    res.status(200).send('order updated successfully').json({
      data: order,
    });
  }catch (error) {
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
    const order = await orderModel.delete(
      req.params.id as unknown as number
    );
    res.status(200).send('order deleted successfully').json({
      data: order,
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};
