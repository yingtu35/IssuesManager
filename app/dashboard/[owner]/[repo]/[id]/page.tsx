import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/issues/breadcrumbs";
import Issue from "@/app/components/ui/issues/issue";

// TODO: try dynamic title
export const metadata: Metadata = {
  title: "Issue",
  description: "Display issue for the authenticated user",
};

export default async function Page({ 
  params 
}: { 
  params: { 
    owner: string,
    repo: string,
    id: string
  }
}) {
  const { owner, repo, id } = params;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issues', href: '/dashboard' },
          {
            label: `${repo} #${id}`,
            href: `/dashboard/${owner}/${repo}/${id}`,
            active: true,
          },
        ]}
      />
      <Issue params={params} />
    </main>
  )
}
