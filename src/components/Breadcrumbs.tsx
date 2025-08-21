import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const segments = router.asPath.split("/").filter(Boolean);

  return (
    <nav className="mb-4 px-4 pt-16 text-sm text-gray-600 dark:text-gray-400">
      <ol className="flex list-reset space-x-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="font-semibold">
                  {segment.replace(/-/g, " ")}
                </span>
              ) : (
                <Link href={href} className="hover:underline">
                  {segment.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
