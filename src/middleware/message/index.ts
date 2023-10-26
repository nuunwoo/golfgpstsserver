import { Request, Response } from 'express';

const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;

exports.send = async (req: Request, res: Response) => {
  try {
    const getSeq = await asyncPromise(sql.send_seq(req.body.co_div));

    try {
      const isert = await asyncPromise(sql.message_insert({ ...req.body, ...getSeq[0] }));

      if (isert.warningCount === 0) {
        // res.redirect(307, '/message/receive');
        res.send({ success: true });
      }
    } catch (err) {
      console.log(err);
      res.send({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

exports.receive = async (req: Request, res: Response) => {
  const { co_div } = req.body;

  try {
    const select = await asyncPromise(sql.message_select(co_div));

    res.send({ success: true, message: select });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};
