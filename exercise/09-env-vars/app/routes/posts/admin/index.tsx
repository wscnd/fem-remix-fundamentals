import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <section>
      <p>
        <Link to="new" className="text-blue-600 underline">
          Create a New Post
        </Link>
      </p>

      <p>Admin Email: {ENV.ADMIN_EMAIL}</p>
    </section>
  );
}
