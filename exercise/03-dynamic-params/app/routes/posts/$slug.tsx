import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "../../models/post.server";
import invariant from "tiny-invariant";
import { marked } from "marked";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  invariant(slug, "This should be impossible");

  const post = await getPost(slug);
  invariant(post, "This should be impossible");

  const html = marked(post.markdown);
  return json({ title: post.title, html });
}

function SlugPage() {
  const { title, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

export default SlugPage;
