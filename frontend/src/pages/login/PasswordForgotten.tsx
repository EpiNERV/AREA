import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordForgotten() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-gray-600 mb-6">
          Don’t worry! It occurs. Please enter the email address linked with your account.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Enter your email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2 w-full"
          />
        </div>

        {/* Send Code Button */}
        <Button className="w-full bg-black text-white py-2">Send Code</Button>

        {/* Back to login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remember Password?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordForgotten;
