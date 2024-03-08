import Form from '@/components/ui/issues/edit-form';
import Breadcrumbs from '@/components/ui/issues/breadcrumbs';
import { getIssue } from '@/app/lib/actions';
import { Metadata } from 'next';
import { auth } from "@/auth"
import { UserIcon as User } from '@/components/ui/user/user-icon';

export const metadata: Metadata = {
  title: 'Create Issue',
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
      <div className="flex gap-4 items-start">
        <User user={user} />
        <Form params={params} issue={issue} />
      </div>
    </main>
  );
}