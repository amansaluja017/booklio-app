const asyncHandler =
  (handler: Function) => async (req: any, res: any, next: any) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { asyncHandler };
