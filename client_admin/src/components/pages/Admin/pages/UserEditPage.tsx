import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsersApi } from "../../../../hooks";
import UserForm from "../ui/UserForm";
import { validateUser } from "../ui/userFormSchema";
import type { UserFormErrors, UserFormValues } from "../ui/userFormSchema";
import type { ApiResponse } from "../ui/users";

export default function UserEditPage() {
  const { id = "" } = useParams();
  const usersApi = useUsersApi();
  const navigate = useNavigate();

  const [values, setValues] = useState<UserFormValues>({ full_name: "", email: "", password: "", role: "user", is_active: "true" });
  const [initialValues, setInitialValues] = useState<UserFormValues | null>(null);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await usersApi.findById(id);
        const data = (res as ApiResponse<Record<string, unknown>>).data;
        if (!data) throw new Error("Không tìm thấy người dùng");
        const mapped: UserFormValues = {
          full_name: String(data.full_name ?? ""),
          email: String(data.email ?? ""),
          password: "",
          role: data.role === "admin" ? "admin" : "user",
          is_active: data.is_active ? "true" : "false",
        };
        setValues(mapped);
        setInitialValues(mapped);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : "Tải dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, usersApi]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!initialValues) return;
      if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [values, initialValues]);

  const hasChanged = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateUser(values, "edit");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !hasChanged) return;

    setSubmitting(true);
    setServerError("");
    try {
      await usersApi.update(id, {
        full_name: values.full_name,
        email: values.email,
        role: values.role,
        is_active: values.is_active === "true",
      });
      navigate(`/admin/users/${id}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Lưu thay đổi thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-4">Đang tải người dùng...</div>;

  return (
    <section className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><h1 className="text-2xl font-bold text-slate-900">Chỉnh sửa người dùng</h1></div>
      {serverError ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{serverError}</div> : null}
      <UserForm mode="edit" values={values} errors={errors} submitting={submitting} onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))} onSubmit={onSubmit} onCancel={() => navigate(`/admin/users/${id}`)} />
      {!hasChanged ? <p className="text-sm text-slate-500">Bạn chưa thay đổi dữ liệu nào.</p> : null}
    </section>
  );
}




