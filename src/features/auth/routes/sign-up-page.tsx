import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { SplitPanel } from "@/app/layouts/split-panel";
import { Logo } from "@/shared/components/brand/logo";
import { Button } from "@/shared/components/ui/button";
import { TextField } from "@/shared/components/ui/text-field";
import underlineVector from "@/assets/vector.png";
import { HeroPanel } from "@/shared/components/marketing/hero-panel";
import { GoogleIcon } from "@/shared/components/icons/google-icon";
import { registerUser } from "@/features/auth/api/register";
import { signUpSchema } from "@/features/auth/routes/sign-up-schema";

type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
};

type ApiErrorResponse = {
  message?: string;
  code?: string;
  error?: string;
  success?: boolean;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
  });

  const handleGoogleSignIn = () => {
    console.info("Google sign-in clicked");
  };

  const handleFormSubmit = async (values: SignUpFormValues) => {
    try {
      const result = await mutateAsync(values);
      toast.success(result.message || "Registration successful");
      navigate({ to: "/sign-in" });
    } catch (error) {
      const defaultMessage = "Unable to register";
      if (isAxiosError(error)) {
        const responseData = error.response?.data as ApiErrorResponse | undefined;
        const responseMessage = responseData?.message?.trim();
        toast.error(responseMessage || error.message || defaultMessage);
        return;
      }

      toast.error(
        error instanceof Error ? error.message || defaultMessage : defaultMessage
      );
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full">
        <SplitPanel
      left={
        <div
          className="flex h-full flex-col overflow-hidden"
          aria-label="Maglo sign in panel"
        >
          <Logo />
          <div className="flex flex-1 flex-col justify-center space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-slate-900">
                Create a new account
              </h1>
              <p className="text-base text-slate-500">
                Welcome back! Please enter your details.
              </p>
            </div>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(handleFormSubmit)}
              aria-label="Sign up form"
              noValidate
            >
              <TextField
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Mahfuzul Nabil"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                hintId="fullName-error"
                {...register("fullName")}
                hint={errors.fullName?.message}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                hintId="email-error"
                {...register("email")}
                hint={errors.email?.message}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                hintId="password-error"
                {...register("password")}
                hint={errors.password?.message}
              />
              <Button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              <Button
                type="button"
                variant="outline"
                leftIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                className="text-[#78778B]"
              >
                Sign up with google
              </Button>
            </form>
            <div className="flex items-center justify-center text-sm text-slate-500">
              <span>Already have an account?</span>
              <div className="flex flex-col items-center mt-[8px]">
                <button
                  type="button"
                  className="font-semibold text-slate-900"
                  onClick={() => navigate({ to: "/sign-in" })}
                >
                  Sign in
                </button>
                <img
                  src={underlineVector}
                  alt=""
                  aria-hidden
                  className="h-2 w-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      }
          right={<HeroPanel />}
        />
      </div>
    </div>
  );
};

export { SignUpPage };
