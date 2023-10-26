"use strict";
const accessOption = { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true, secure: false };
const refreshOption = (remember) => ({
    expires: new Date(Date.now() + (remember ? 24 * 60 * 60 * 1000 : 0)),
    httpOnly: true,
    secure: false,
});
exports.accessOption = accessOption;
exports.refreshOption = refreshOption;
