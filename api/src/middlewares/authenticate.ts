import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/types";

export interface CustomRequest extends Request {
  user: User;
}

const checkAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
      if (err) return res.sendStatus(403);
      req.user = user as User;
      next();
    }
  );
};

export default checkAuthToken;
