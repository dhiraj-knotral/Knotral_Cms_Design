import EditWebinarClient from "./EditWebinarClient";

export default async function Page({ params }) {
  // Unwrap params if it's a promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return <EditWebinarClient slug={slug} />;
}