export type UserFormValues = {
  full_name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  is_active: "true" | "false";
};

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

export const emptyUserForm: UserFormValues = {
  full_name: "",
  email: "",
  password: "",
  role: "user",
  is_active: "true",
};

export function validateUser(values: UserFormValues, mode: "create" | "edit") {
  const errors: UserFormErrors = {};
  if (!values.full_name.trim() || values.full_name.trim().length < 2) errors.full_name = "Họ tên phải có ít nhất 2 ký tự.";
  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Vui lòng nhập đúng định dạng email.";
  if (mode === "create" && (!values.password || values.password.length < 8)) errors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
  if (!values.role) errors.role = "Vai trò là bắt buộc.";
  if (!values.is_active) errors.is_active = "Trạng thái là bắt buộc.";
  return errors;
}
