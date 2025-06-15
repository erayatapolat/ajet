"use client"

import React, { useEffect, useState } from "react";
import {
  initializeStorage,
  getUsers,
  saveUser,
  setActiveUser,
  getActiveUser,
} from "../../utils/storage"
import { useRouter } from "next/navigation";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    initializeStorage();

    const user = getActiveUser();
    if (user) {
      router.push("/");
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users = getUsers();

    if (isLogin) {
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (!user) {
        setError("Geçersiz e-posta veya şifre.");
        return;
      }
      setActiveUser(user);
      router.push("/");
    } else {
      if (!formData.name || formData.name.trim() === "") {
        setError("İsim alanı zorunludur.");
        return;
      }
      const exists = users.find((u) => u.email === formData.email);
      if (exists) {
        setError("Bu e-posta ile kayıtlı kullanıcı zaten var.");
        return;
      }
      saveUser(formData as any);
      setActiveUser({
        ...formData,
        name: formData.name ?? "",
      })
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isLogin ? "Giriş Yap" : "Kayıt Ol"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="İsim"
            value={formData.name || ""}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleInput}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleInput}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isLogin ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
        </button>
      </div>
    </div>
  );
}
