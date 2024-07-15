"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const token_utils_1 = require("../utils/token.utils");
const isLoggedIn = (req, res, next) => {
    const token = (0, token_utils_1.extractTokenFromRequest)(req);
    const decodedUser = (0, token_utils_1.verifyToken)(token);
    req.user = decodedUser.sub;
    next();
};
exports.isLoggedIn = isLoggedIn;
