import { getIssue } from "@/app/lib/actions";
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
  const issue = await getIssue(owner, repo, id);
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
      <Issue params={params} issue={issue} />
    </main>
  )
}
