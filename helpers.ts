import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownOutput = MDXRemoteSerializeResult<Record<string, unknown>>;
