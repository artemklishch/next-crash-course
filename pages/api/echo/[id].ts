import { NextApiRequest, NextApiResponse } from "next";

interface GettingId extends NextApiRequest{
  query: {
    id: string
  }
}

export default function getById(req: GettingId, res: NextApiResponse) {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");
  // res.end(JSON.stringify(req.query.id));
  res.json({ yourId: req.query.id });
}
