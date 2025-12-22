import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import RegisterForm from "@/components/organisms/RegisterForm";
type RegisterProps = {
  title?: string;
  desc?: string;
  termsText?: React.ReactNode;
  switchLabel?: string;
  switchHref?: string;
  switchCta?: string;
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
const Register = async ({
  title = "Join Us",
  desc = "Enter your info to create a new account, or log in",
  switchLabel = "Log In",
  switchHref = "/login",
  switchCta = "Already have an account?",
  className,
  termsText = defaultTerms,
}: RegisterProps) => {
  const session = await getSession();

  // If there's an active session, redirect on the server
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Card className={cn("mx-auto w-full max-w-115.5", className)}>
        <CardTitle className=" ml-6 text-lg">{title} </CardTitle>
        {desc ? (
          <CardDescription className="ml-6">{desc}</CardDescription>
        ) : null}
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardAction className="text-sm text-muted-foreground ml-6">
          {switchCta}
          <Button asChild variant="link" className="px-1">
            <Link href={switchHref}>{switchLabel}</Link>
          </Button>
        </CardAction>
      </Card>
      <FieldDescription className="mx-auto max-w-112.5 px-6 text-center text-muted-foreground">
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

export default Register;
