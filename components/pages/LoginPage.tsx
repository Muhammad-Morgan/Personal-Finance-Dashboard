import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import type { ReactNode } from "react";
import Link from "next/link";
import { Card, CardAction, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FieldDescription } from "../ui/field";
import LoginForm from "../organisms/LoginForm";
import { cn } from "@/lib/utils";
type LoginPageProps = {
  title?: string;
  description?: string;
  switchLabel?: string;
  switchHref?: string;
  switchCta?: string;
  termsText?: ReactNode;
  className?: string;
};
const defaultTerms = (
  <>
    By clicking continue, you agree to our{" "}
    <a href="#" className="underline">
      Terms of Service
    </a>{" "}
    and{" "}
    <a href="#" className="underline">
      Privacy Policy
    </a>
    .
  </>
);

const LoginPage = async ({
  title = "Login to your account",
  switchLabel = "Sign Up",
  switchHref = "/register",
  switchCta = "Create an account",
  termsText = defaultTerms,
  className,
}: LoginPageProps) => {
  const session = await getSession();

  // If there's an active session, redirect on the server
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Card className={cn("mx-auto w-full max-w-100", className)}>
        <CardTitle className=" ml-6 text-lg">{title} </CardTitle>

        <CardContent>
          <LoginForm />
        </CardContent>
        <CardAction className="text-sm text-muted-foreground ml-6">
          {switchCta}{" "}
          <Button asChild variant="link" className="px-1">
            <Link href={switchHref}>{switchLabel}</Link>
          </Button>
        </CardAction>
      </Card>
      <FieldDescription className="mx-auto max-w-100 px-6 text-center text-muted-foreground">
        {termsText}
      </FieldDescription>
      {/* Client-side script to handle back navigation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (window.history && window.history.pushState) {
              window.history.pushState(null, "", window.location.href);
              window.onpopstate = function () {
                // If they go back, push them forward again
                window.history.pushState(null, "", window.location.href);
                window.location.href = '/dashboard';
              };
            }
          `,
        }}
      />
    </>
  );
};

export default LoginPage;
