export const validateField = (...validators: { (val: string): any }[]) => (
  value: string,
) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmail = (message: string | null) => (email: string) => {
  if (!emailRegex.test(email)) return message || "This email is not valid";
};

export const validateRequired = (message: string | null) => (value: string) => {
  if (!value) return message || "This field is required";
};
