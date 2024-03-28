import type { Metadata, ResolvingMetadata } from 'next';
import Breadcrumbs from "@/app/components/ui/breadcrumbs";
import Issue from "@/app/components/ui/issues/issue";

type Props = {
  params: { 
    owner: string,
    repo: string,
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { owner, repo, id } = params;
  
  return {
    title: `${repo} #${id}`,
    description: `Display issue ${repo} for the authenticated user`
  }
}

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
