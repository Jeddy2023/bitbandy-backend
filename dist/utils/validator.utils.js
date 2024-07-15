"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (dto, obj) => {
    const { error } = dto.validationSchema.validate(obj);
    if (error) {
        return error.details.map((detail) => detail.message);
    }
    return null;
};
exports.validator = validator;
