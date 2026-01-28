import jwt from "jsonwebtoken";
import { promisify } from "util";

import auth from "../../config/auth.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);

    req.userId = decoded.id;

    console.log({ decoded });
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token Invalid." });
  }
  
  // console.log(("Auth Middleware Invoked"));
  //
  //
  // if (authHeader && authHeader === "secret") {
  //   return next();
  // }
  //
  //
  // return res.status(401).json({ error: "Unauthorized" });
  return next();
}
