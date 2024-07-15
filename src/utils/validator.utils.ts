export const validator = (dto: any, obj: any) => {
  const { error } = dto.validationSchema.validate(obj);

  if (error) {
    return error.details.map((detail: any) => detail.message);
  }

  return null;
}