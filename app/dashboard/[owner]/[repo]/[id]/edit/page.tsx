import Form from '@/components/ui/issues/edit-form';
import Breadcrumbs from '@/components/ui/issues/breadcrumbs';
import { getIssue } from '@/app/lib/actions';
import { Metadata } from 'next';
import { auth } from "@/auth"
import Image from 'next/image';

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
  const user = issue.user.login;
  const avatarUrl = issue.user.avatar_url;
  const htmlUrl = issue.user.html_url;
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
      <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={avatarUrl}
          alt={`${user} icon`}
          width={50}
          height={50}
          className="rounded-full border-2 border-blue-200"
        />
      </a>
        <Form params={params} issue={issue} />
      </div>
    </main>
  );
}