import { useRouter } from "next/router";
import Link from "next/link";

interface ActiveLinkProps {
  label: string;
  href: string;
}
export const ActiveLink = ({ label, href }: ActiveLinkProps) => {
  const baseClasses = "";
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`p-2 text-lg ${
          router.route === href
            ? "text-gray-300 underline underline-offset-2"
            : ""
        }`}
      >
        {label}
      </a>
    </Link>
  );
};
