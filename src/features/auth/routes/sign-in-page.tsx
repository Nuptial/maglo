import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { SplitPanel } from "@/app/layouts/split-panel";
import { GoogleIcon } from "@/shared/components/icons/google-icon";
import { HeroPanel } from "@/shared/components/marketing/hero-panel";
import { Logo } from "@/shared/components/brand/logo";
import { Button } from "@/shared/components/ui/button";
import { TextField } from "@/shared/components/ui/text-field";
import underlineVector from "@/assets/vector.png";
import { login } from "@/features/auth/api/login";
import { useAuth } from "@/features/auth/context/use-auth";

type SignInFormValues = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { setAuthData, fetchProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
  });

  const handleGoogleSignIn = () => {
    console.info("Google sign-in clicked");
  };

  const handleFormSubmit = async (values: SignInFormValues) => {
    try {
      const data = await mutateAsync(values);
      setAuthData(data);
      await fetchProfile(data.accessToken);
      toast.success("Login successful");
      navigate({ to: "/dashboard" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in";
      toast.error(message);
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
                    Sign In
                  </h1>
                  <p className="text-base text-slate-500">
                    Welcome back! Please enter your details.
                  </p>
                </div>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(handleFormSubmit)}
                  aria-label="Sign in form"
                  noValidate
                >
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
                    {isPending ? "Signing In..." : "Sign In"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    leftIcon={<GoogleIcon />}
                    onClick={handleGoogleSignIn}
                    className="text-[#78778B]"
                  >
                    Sign in with google
                  </Button>
                </form>
                <div className="flex items-center justify-center text-sm text-slate-500">
                  <span>Don&apos;t have an account?</span>
                  <div className="flex flex-col items-center mt-[8px]">
                    <button
                      type="button"
                      className="font-semibold text-slate-900"
                      onClick={() => navigate({ to: "/sign-up" })}
                    >
                      Sign up
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

export { SignInPage };
