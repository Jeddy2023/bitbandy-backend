import { CustomRequest } from "../middleware/isLoggedIn.middleware";

export interface CustomRequestWithFile extends CustomRequest {
  file: Express.Multer.File;
}