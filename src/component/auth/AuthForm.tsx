/*"use client";
import { useState } from "react";
import Image from "next/image";
import AjetLogoBlue from "../../../public/ajet-blue.svg";
import Bg from "../../../public/bg-plane.jpg"; // Uçak arka planı (soft opacity ile)
import { useRouter } from "next/navigation";

export default function AuthForm() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(mode === "login" ? "Login:" : "Register:", form);
    };
    const route = useRouter();

    return (
        <div className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 -z-10">
                <Image
                    src={Bg}
                    alt="Airplane Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-10"
                />
            </div>

            <div onClick={()=>(route.push('/'))} className="flex justify-center  absolute top-10 left-10 cursor-pointer">
                <Image src={AjetLogoBlue} alt="Ajet" height={40} />
            </div>
            
            <div className="min-w-96">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome to Ajet</h1>
                    <p className="text-sm text-gray-500">Book flights fast & easy.</p>
                </div>

                <div className="flex justify-center items-start opacity-75">
                    <div className="w-full max-w-sm bg-white border border-gray-200 shadow-xl rounded-2xl px-6 py-8">
                        <div className="flex justify-center mb-6 space-x-1 bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setMode("login")}
                                className={`w-1/2 py-1.5 text-sm font-medium rounded-full transition ${mode === "login"
                                        ? "bg-[#0090FF] text-white shadow"
                                        : "text-gray-500"
                                    }`}
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => setMode("register")}
                                className={`w-1/2 py-1.5 text-sm font-medium rounded-full transition ${mode === "register"
                                        ? "bg-[#0090FF] text-white shadow"
                                        : "text-gray-500"
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === "register" && (
                                <div>
                                    <label className="text-sm text-gray-600">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0090FF]"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                    className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0090FF]"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    onChange={handleChange}
                                    className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0090FF]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#0090FF] hover:bg-[#007ad6] transition text-white rounded-lg py-2 text-sm font-semibold"
                            >
                                {mode === "login" ? "Log in" : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs text-gray-400">
                            By continuing, you agree to our Terms & Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}*/
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
