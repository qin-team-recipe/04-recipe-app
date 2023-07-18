type Ok<T> = {
  success: true;
  value: T;
};

type Error<E> = {
  success: false;
  error: E;
};

export type Result<T, E> = Ok<T> | Error<E>;

export const Result = {
  ok<T>(value: T): Ok<T> {
    return { success: true, value };
  },
  error<E>(error: E): Error<E> {
    return { success: false, error };
  },
};
