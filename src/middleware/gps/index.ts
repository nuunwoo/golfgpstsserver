import { Request, Response } from 'express';

const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;
const jwt = require('../../util/jwt');

type CartData = {
  co_div: string;
  cart_no: number;
  game_sid: number;
  game_dt: string;
  game_ti: string;
  caddy_name: string;
  players_name: string;
  coursep: string;
  coursen: string;
  ingcoursep: string;
  ingcoursen: string;
  starttip: string;
  endtip: string;
  starttin: string;
  endtin: string;
  currentLat: number;
  currentLon: number;
  currentcourse: string;
  currenthole: number;
  currentpar: number;
  currentgameno: number;
  tcpstate: number;
  boardidx: number;
  gamestop_state: number;
  cartidx: number;
  starttia: string;
  endtia: string;
  coursea: string;
  ingcoursea: string;
  game_stop_date: null;
  tcpstate_date: string;
  map_move_date: string;
  block_move_date: string;
  use_yn: string;
  hole_in_time: string;
  trial061: null;
};

let cartData: CartData[] = [];
let intervalCartGpsData: ReturnType<typeof setInterval>;
let _isInterval = false;

const getCartGpsData = async () => {
  try {
    const result = await asyncPromise(sql.cartData);

    cartData = result;
    if (result.length === 0) {
      clearInterval(intervalCartGpsData);
      _isInterval = false;
    }
  } catch (err) {
    console.log(err);
  }
};

const filterData = (arr: CartData[], co_div: string) => {
  return arr.filter(el => el.co_div === co_div);
};

exports.cartGps = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    const co_div = jwt.verify(req.cookies.token).co_div;

    if (!_isInterval) {
      const result = await asyncPromise(sql.cartData);

      if (result) {
        if (!_isInterval && result.length > 0) {
          intervalCartGpsData = setInterval(getCartGpsData, 1000);
          _isInterval = true;
        }

        res.send({
          success: true,
          cartData: filterData(result, co_div),
        });
      }
    } else {
      // console.log(filterData(cartData, co_div)[1].currentLat, filterData(cartData, co_div)[1].currentLon);
      res.send({
        success: true,
        cartData: filterData(cartData, co_div),
      });
    }
  } else
    res.send({
      success: false,
    });
};
