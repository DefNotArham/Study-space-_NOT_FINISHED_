import { useSearchParams } from "react-router-dom";
import Logo from "../../components/icons/logo";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  return (
    <div className="min-h-screen bg-[#120C09] px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-10">
          <Logo />
        </div>

        {/* Verification Card */}
        <div className="w-full rounded-2xl border border-[#3A2C22] bg-[#1D1611] px-7 py-9 text-center shadow-[0_0_40px_-12px_rgba(227,165,103,0.2)]">
          {/* Heading */}
          <h1
            className="text-2xl italic text-[#F3E9DC]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Verify your email
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#B8A99A]">
            We&apos;re verifying your Study Space account.
          </p>

          {/* Loading */}
          <div className="mt-7 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#4A3626] border-t-[#E3A567]" />
          </div>

          {/* Token missing */}
          {!token && (
            <p className="mt-5 text-xs text-red-400">
              No verification token was provided.
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#6B5D50]">
          A quiet corner for late-night focus.
        </p>
      </div>
    </div>
  );
}
