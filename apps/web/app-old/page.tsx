import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-100 p-4">
            <Wrench className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          TUTALLER
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          The platform for mechanics to manage their business.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Mechanic Login
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Register <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
