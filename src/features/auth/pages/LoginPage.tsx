import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-toastify";
type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onTouched" });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {mutate,isPending} = useLogin();
  const onSubmit = async (data: FormValues) => {
    // Simulate network delay. Do NOT connect to any backend here.
        mutate(data,{
          onSuccess:(res)=>{
            navigate("/")
          },
          onError:(err)=>{
            console.error("Login failed:", err);
           toast.error("Login failed. Please check your credentials and try again.");
          }

        })
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     // eslint-disable-next-line no-console
    //     console.log("Login attempt", data);
    //     resolve();
    //   }, 900);
    // });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md mx-auto p-8 shadow-lg rounded-2xl">
        <header className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold text-xl mb-3">
            IT
          </div>
          <h1 className="text-2xl font-semibold">InvenTrack</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to access your inventory dashboard.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              aria-invalid={errors.email ? "true" : "false"}
              className="mt-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-2 inline-flex items-center p-1 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link to="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <footer className="mt-6 text-center text-sm text-slate-400">
          © 2026 InvenTrack. All rights reserved.
        </footer>
      </Card>
    </main>
  );
}
