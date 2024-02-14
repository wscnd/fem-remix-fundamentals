import { json, redirect, type ActionArgs } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "../../../models/post.server";

// 🐨 implement the action function here.
//

export async function action({ request }: ActionArgs) {
  // 1. accept the request object
  // 2. get the formData from the request
  const data = await request.formData();

  // 3. get the title, slug, and markdown from the formData
  const title = data.get("title");
  const slug = data.get("slug");
  const markdown = data.get("markdown");

  // 6. make typescript happy with invariant and the fields
  invariant(typeof title === "string", "title should be a string");
  invariant(typeof slug === "string", "slug should be a string");
  invariant(typeof markdown === "string", "markdown should be a string");

  // 5. add errors to each of the fields if it has errors return them to the client
  const errors = {
    title: title ? "" : "title shouldn't be empty",
    slug: slug ? "" : "slug shouldn't be empty",
    markdown: markdown ? "" : "markdown shouldn't be empty",
  };

  const hasErrors = Object.values(errors).some(Boolean);
  if (hasErrors) {
    return json(errors);
  }

  // 4. call the createPost function from your post.model.ts
  await createPost({ markdown, slug, title });

  // 5. redirect to "/posts/admin".
  return redirect('/posts/admin')
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData<typeof action>();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:
          <input type="text" name="title" className={inputClassName} />
        </label>

        {errors?.title ? (
          <em className="text-red-600">{errors.title}</em>
        ) : null}
      </p>
      <p>
        <label>
          Post Slug:
          <input type="text" name="slug" className={inputClassName} />
        </label>

        {errors?.slug ? <em className="text-red-600">{errors.slug}</em> : null}
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />

        {errors?.markdown ? (
          <em className="text-red-600">{errors.markdown}</em>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
