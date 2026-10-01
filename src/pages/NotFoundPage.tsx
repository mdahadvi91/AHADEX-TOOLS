import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-6">
      <p className="font-display font-black text-[120px] sm:text-[180px] leading-none text-silk-gradient dark:text-silk-gradient-dark">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-light-text dark:text-dark-text">
        Page not found
      </h1>
      <p className="mt-3 text-light-textSecondary dark:text-dark-textSecondary max-w-md">
        The page you're looking for doesn't exist, or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium shadow-silk-medium hover-lift"
      >
        Go Home
      </Link>
    </div>
  );
}
