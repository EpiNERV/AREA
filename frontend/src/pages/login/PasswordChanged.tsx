import { Button } from '@/components/ui/button';
import { CheckIcon } from '@radix-ui/react-icons'; // Using Radix UI icon

const PasswordChanged = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckIcon className="text-green-500 h-10 w-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Password Changed!</h1>
        <p className="text-gray-600 mb-6">
          Your password has been changed successfully.
        </p>

        {/* Back to Login Button */}
        <Button
          className="w-full bg-black text-white py-2"
          onClick={() => (window.location.href = '/login')}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default PasswordChanged;
