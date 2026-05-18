import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../../../shared/hooks";
import LoginFormCard from "../ui/LoginFormCard";
import LoginIntro from "../ui/LoginIntro";
import type { LoginResponse } from "../ui/LoginIntro";

export default function LoginPageView() {
  const authApi = useAuthApi();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = (await authApi.login({ email, password })) as LoginResponse;
      const token = res?.data?.access_token;

      if (!token) {
        throw new Error("Không lấy được phiên đăng nhập");
      }

      localStorage.setItem("admin_access_token", token);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
      <LoginIntro
        title="Chào mừng trở lại"
        description="Vui lòng đăng nhập để truy cập khu vực điều hành, quản lý người dùng và theo dõi các hành trình."
      />
      <LoginFormCard
        email={email}
        password={password}
        loading={loading}
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </section>
  );
}






