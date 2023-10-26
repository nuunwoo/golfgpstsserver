import { Request, Response } from 'express';

const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;

exports.mapData = async (req: Request, res: Response) => {
  try {
    const result = await asyncPromise(sql.mapData({ ...req.query }));

    const mapData = {
      success: true,
      mapData: result[0],
      courseData: result[1],
    };

    for (let i = 0; i < result[1].length; i++) {
      const par_cnt: number[] = [];
      //   mapData.courseData.push(result[1][i]);
      for (let j = 0; j < Object.keys(result[1][i]).length; j++) {
        if (Object.keys(result[1][i])[j].includes('par_cnt_')) {
          par_cnt.push(Number(Object.values(result[1][i])[j]));
        }
      }
      mapData.courseData[i].par_cnt = par_cnt;
    }
    res.send(mapData);
  } catch (err) {
    console.log(err);
  }
};
