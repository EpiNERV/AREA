import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const AuthVerification = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">OTP Verification</h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the verification code we just sent on your email address.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6 space-x-2">
            <InputOTP maxLength={6} pattern={/^[0-9]+$/}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" className="w-full bg-black text-white py-2">
            Verify
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn’t receive the code?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Resend
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthVerification;
