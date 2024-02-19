import Form from '@/components/ui/issues/edit-form';
import Breadcrumbs from '@/components/ui/issues/breadcrumbs';
import { getIssue } from '@/app/lib/actions';
import { Metadata } from 'next';
import { auth } from "@/auth"

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
            label: 'Update Issue',
            href: `/dashboard/${owner}/${repo}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form params={params} issue={issue} />
    </main>
  );
}