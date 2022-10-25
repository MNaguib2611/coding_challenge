import { IOrder } from "./order.interface";
import fs from "fs";

export class Utls {
  static mapingOrders(csv: string) {
    return csv.split("\n").map((order: string) => {
      const singleOrder = order.split(",");
      return {
        id: singleOrder[0],
        location: singleOrder[1],
        product: singleOrder[2],
        quantity: parseInt(singleOrder[3]),
        brand: singleOrder[4],
      };
    });
  }

  static mappingFirstFile(orders: IOrder[]) {
    const ordersCount = orders.length;
    const firstFile: { [key: string]: number } = {};
    const result: string[] = [];
    orders.forEach((order: IOrder) => {
      if (firstFile.hasOwnProperty(order.product)) {
        firstFile[order.product] =
          firstFile[order.product] + order.quantity / ordersCount;
      } else {
        firstFile[order.product] = order.quantity / ordersCount;
      }
    });
    for (const product in firstFile) {
      result.push(`${product}, ${firstFile[product].toFixed(1)}`);
    }
    return result;
  }

  static mappingSecondFile(orders: IOrder[]) {
    const mappedordersBrands: any = {};
    const result: string[] = [];
    orders.forEach((order: IOrder, index: number) => {
      if (
        mappedordersBrands.hasOwnProperty(order.product) &&
        mappedordersBrands[order.product].hasOwnProperty(order.brand)
      ) {
        mappedordersBrands[order.product][order.brand] += 1;
      } else {
        mappedordersBrands[order.product] = {
          ...mappedordersBrands[order.product],
          [order.brand]: 1,
        };
      }
    });
    for (const product in mappedordersBrands) {
      let max = 0;
      let max_attr = "";
      for (const brand in mappedordersBrands[product]) {
        if (mappedordersBrands[product][brand] >= max) {
          max = mappedordersBrands[product][brand];
          max_attr = brand;
        }
      }
      result.push(`${product}, ${max_attr}`);
    }
    return result;
  }

  static writeFileToDesk(result: string[], fileName: string) {
    const content = result.reduce(
      (previousValue, currentValue) => previousValue + `${currentValue}\n`,
      ""
    );
    try {
      fs.writeFileSync(`./output_files/${fileName} `, content);
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  }
}
