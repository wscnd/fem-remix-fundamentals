import { useLoaderData, Link } from "@remix-run/react";

function AdminIndexRoute() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}

export default AdminIndexRoute;
