import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SplitPanel } from "@/components/layout/split-panel";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { HeroPanel } from "@/components/hero-panel";
import { GoogleIcon } from "@/components/google-icon";
import underlineVector from "@/assets/vector.png";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder: integrate with mutation once backend ready
    console.info("Submitting credentials", formValues);
  };

  const handleGoogleSignIn = () => {
    console.info("Google sign-in clicked");
  };

  return (
    <SplitPanel
      left={
        <div className="flex h-full flex-col" aria-label="Maglo sign in panel">
          <Logo />
          <div className="flex flex-1 flex-col justify-center space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-slate-900">Sign In</h1>
              <p className="text-base text-slate-500">
                Welcome back! Please enter your details.
              </p>
            </div>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              aria-label="Sign in form"
            >
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={formValues.password}
                onChange={handleInputChange}
              />
              <Button type="submit">Sign In</Button>
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
  );
};

export { SignInPage };
