import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsersApi } from "../../../shared/hooks";
import UserForm from "../components/UserForm";
import { emptyUserForm, validateUser } from "../components/userFormSchema";
import type { UserFormErrors, UserFormValues } from "../components/userFormSchema";

export default function UserCreatePage() {
  const usersApi = useUsersApi();
  const navigate = useNavigate();
  const [values, setValues] = useState<UserFormValues>(emptyUserForm);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateUser(values, "create");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    setServerError("");
    try {
      await usersApi.create({ ...values, is_active: values.is_active === "true" });
      navigate("/admin/users");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Tạo mới thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><h1 className="text-2xl font-bold text-slate-900">Tạo người dùng</h1><Link to="/admin/users" className="text-sm text-teal-700">Quay lại danh sách</Link></div>
      {serverError ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{serverError}</div> : null}
      <UserForm mode="create" values={values} errors={errors} submitting={submitting} onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))} onSubmit={onSubmit} onCancel={() => navigate("/admin/users")} />
    </section>
  );
}










