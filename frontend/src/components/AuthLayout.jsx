import { Link } from 'react-router-dom';

function AuthLayout({ children, title, showBack = false }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-12">
          <img src="/images/logo.png" alt="Neo Logo" className="h-12 mx-auto" />
        </div>
        {showBack && (
          <Link to="/" className="text-brand-blue text-body mb-6 inline-block hover:underline">
            &lt; Back to login
          </Link>
        )}
        <h2 className="text-h2 font-bold text-black mb-8 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;