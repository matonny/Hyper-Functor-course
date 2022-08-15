import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { tmpdir } from "os";
import { MarkdownOutput } from "../helpers";

export const ZaisteReactMarkdown = ({
  children,
}: {
  children: MarkdownOutput;
}) => {
  const isExternalLink = (address: string) => {
    if (typeof window !== "undefined") {
      const tempLink = document.createElement("a");
      tempLink.href = address;
      return tempLink.host !== window.location.host;
    }
  };

  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href || isExternalLink(href)) {
            return <a rel="noopener noreferrer" {...props}></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};
