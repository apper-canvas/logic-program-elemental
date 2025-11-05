import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" size={48} className="text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <ApperIcon name="Home" size={16} className="mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/contacts">
                <ApperIcon name="Users" size={16} className="mr-2" />
                Contacts
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/companies">
                <ApperIcon name="Building2" size={16} className="mr-2" />
                Companies
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact support or check our documentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;