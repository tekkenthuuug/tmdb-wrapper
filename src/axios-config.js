"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var config = {
    baseURL: 'https://api.themoviedb.org/3'
};
var axiosInstance = axios_1["default"].create(config);
exports["default"] = axiosInstance;
