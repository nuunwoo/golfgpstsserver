const { promisify } = require('util');
const jwtUtil = require('jsonwebtoken');
const SERCRETKEY = process.env.SERCRETKEY;

module.exports = {
  sign: (co_div: string, name: string, user_div: string, login_id: string) => {
    const payload = {
      co_div: co_div,
      name: name,
      user_div: user_div,
      login_id: login_id,
    };
    return jwtUtil.sign(payload, SERCRETKEY, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
  },
  verify: (token: string) => {
    let decoded = null;
    try {
      decoded = jwtUtil.verify(token, SERCRETKEY);
      return {
        type: true,
        co_div: decoded.co_div,
        name: decoded.name,
        user_div: decoded.user_div,
        login_id: decoded.login_id,
      };
    } catch (err) {
      return {
        type: false,
        message: err,
      };
    }
  },
  decode: (token: string) => {
    let decoded = null;

    try {
      decoded = jwtUtil.decode(token, SERCRETKEY);

      return {
        type: true,
        key: decoded.key,
      };
    } catch (err) {
      return {
        type: false,
        message: err,
      };
    }
  },
  refresh: () => {
    return jwtUtil.sign({}, SERCRETKEY, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  },
  refreshVerify: async (token: string, key: string) => {
    try {
      console.log(await jwtUtil.verify(token, SERCRETKEY));
      try {
        jwtUtil.verify(token, SERCRETKEY);
        return true;
      } catch (err) {
        return err;
      }
    } catch (err) {
      return false;
    }
  },
};
