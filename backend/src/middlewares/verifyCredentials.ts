import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const User = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const verifyCredentials = (req: Request, res: Response, next: NextFunction) => {
  const user = User.safeParse(req.body);

  if (!user.success) {
    res.status(404).json({ msg: "provide better inputs" });
  } else {
    next();
  }
};

export default verifyCredentials;
