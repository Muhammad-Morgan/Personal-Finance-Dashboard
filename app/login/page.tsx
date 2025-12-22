import LoginPage from "@/components/pages/LoginPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  // bg-muted/50 backdrop-blur-md supports-backdrop-filter:bg-muted/30
  return (
    <div className="space-bg flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-end">
          <Button asChild variant="ghost" className="text-white">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <LoginPage />
      </div>
    </div>
  );
};

export default Login;
