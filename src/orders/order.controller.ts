import { Utls } from "./orders.util";
import { IOrder } from "./order.interface";
import { Response, NextFunction } from "express";

class OrderController {
  constructor() {}
  async show(req: any, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        success: false,
        message: "hello",
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req: any, res: Response, next: NextFunction) {
    const originalname = req.file.originalname;
    const csv = req.file.buffer.toString("utf8");
    const orders = Utls.mapingOrders(csv);
    const firstFile = Utls.mappingFirstFile(orders);
    const secondFile = Utls.mappingSecondFile(orders);

    //create first file
    Utls.writeFileToDesk(firstFile, `0_${originalname}`);
    Utls.writeFileToDesk(secondFile, `1_${originalname}`);

    return res.status(200).json({
      success: true,
      data: { firstFile, secondFile },
    });
  }
}

export default new OrderController();
