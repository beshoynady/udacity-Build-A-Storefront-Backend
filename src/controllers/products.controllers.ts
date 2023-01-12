import { Request, Response, NextFunction} from 'express';

import productModel from '../models/product.model';

const ProductModel = new productModel();

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.create(req.body);
    res.send('product created successfully').status(200).json({
      data: { product },
    });
  }catch (error) {
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
    const products = await ProductModel.index();
    res.send('all products').status(200).json({
      data: {...products},
    });
  }catch (error) {
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
    const product = await ProductModel.show(
      req.params.id as unknown as string
    );
    res.send('found product successfully').status(200).json({
      data: {product},
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
    const product = await ProductModel.update(req.body);
    res.send('updated product successfully').status(200).json({
      data: {product},
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
    const product = await ProductModel.delete(
      req.params.id as unknown as string
    );
    res.send('deleted product successfully').status(200).json({
      data: {product},
    });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
};
