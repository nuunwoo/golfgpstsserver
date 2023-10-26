import { Request, Response } from 'express';

const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;

exports.getScore = async (req: Request, res: Response) => {
  try {
    const score = await asyncPromise(sql.score_select(req.query));
    res.send({ success: true, score: score });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};
