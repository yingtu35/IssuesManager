import type { Metadata, ResolvingMetadata } from 'next';
import Form from '@/app/components/ui/issues/edit-form';
import Breadcrumbs from '@/app/components/ui/breadcrumbs';
import { getIssue } from '@/app/lib/actions';
import { auth } from "@/auth"
import { UserIcon as User } from '@/app/components/ui/user/user-icon';

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
    title: `${repo} #${id} | Edit`,
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
  const session = await auth();
  if (!session) return { redirect: { destination: '/auth/signin', permanent: false } };
  const { owner, repo, id } = params;
  const issue = await getIssue(owner, repo, id);
  const user = {
    name: issue.user.login,
    avatarUrl: issue.user.avatar_url,
    htmlUrl: issue.user.html_url
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issues', href: '/dashboard' },
          {
            label: `${repo} #${id}`,
            href: `/dashboard/${owner}/${repo}/${id}`,
          },
          {
            label: 'Edit',
            href: `/dashboard/${owner}/${repo}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="hidden md:flex gap-4 items-start">
        <User user={user} />
        <Form params={params} issue={issue} />
      </div>
      <div className="block md:hidden">
        <Form params={params} issue={issue} />
      </div>
    </main>
  );
}