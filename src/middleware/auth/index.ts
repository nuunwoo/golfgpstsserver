import { Request, Response } from 'express';
const url = require('url');
const timer = require('../../module/timer').timer;
const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;

const cookieOption = require('../../config/cookie').accessOption;
const jwt = require('../../util/jwt');

exports.login = async (req: Request, res: Response) => {
  try {
    const result = await asyncPromise(sql.login({ id: req.query.login_id, pwd: req.query.user_pw }));
    // const result = await asyncPromise(sql.login({ ...req.query }));

    if (result.length > 0) {
      const { co_div, name, user_div, login_id } = result[0];

      const cookie = jwt.sign(co_div, name, user_div, login_id);
      res.cookie('token', cookie, cookieOption);

      if (user_div === 'A') {
        res.send(result[0]);
      }
      if (user_div === 'U') {
        res.redirect(
          url.format({
            pathname: '/map/mapData',
            query: {
              co_div: co_div,
            },
          })
        );
      }
    } else
      res.send({
        success: false,
        message: '계정 정보가 다릅니다.',
      });
  } catch (err) {
    console.log(err);
  }
};

exports.autologin = (req: Request, res: Response) => {
  if (req.cookies.token) {
    const { co_div, name, user_div, login_id } = jwt.verify(req.cookies.token);

    try {
      const replace = jwt.sign(co_div, name, user_div, login_id);
      res.cookie('token', replace, cookieOption);

      if (user_div === 'A') {
        // res.send(result[0]);
      } else if (user_div === 'U') {
        res.redirect(
          url.format({
            pathname: '/map/mapData',
            query: {
              co_div: co_div,
            },
          })
        );
      } else res.send({ success: false });
    } catch (err) {
      console.log(err);
    }
  } else res.send({ success: false });
};

exports.logout = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.sendStatus(200);
};
