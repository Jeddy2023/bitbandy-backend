"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const customError_utils_1 = require("../utils/customError.utils");
const jwt_decode_1 = require("jwt-decode");
const asyncHandler_middleware_1 = require("./asyncHandler.middleware");
const token_utils_1 = require("../utils/token.utils");
exports.isAdmin = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res, next) => {
    const token = (0, token_utils_1.extractTokenFromRequest)(req);
    let decodedToken;
    try {
        decodedToken = (0, jwt_decode_1.jwtDecode)(token);
    }
    catch (error) {
        throw new customError_utils_1.CustomError(403, "Invalid token provided");
    }
    if (!decodedToken.isAdmin) {
        throw new customError_utils_1.CustomError(403, "Resource restricted to admins");
    }
    next();
});
