import Breadcrumbs from "@/components/ui/issues/breadcrumbs";
import Issue from "@/components/ui/issues/issue";

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
