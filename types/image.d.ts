declare module "*.svg";

export interface Image {
  id: number;
  filename: string;
  path: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}
