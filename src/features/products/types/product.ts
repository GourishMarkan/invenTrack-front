export type Product = {
  id: number;
  name: string;
  sku: string;
  supplier: Supplier;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;

};

export type Supplier={
  name:string;
  id:number,
  mobileNumber:string
}
