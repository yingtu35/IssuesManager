import Form from '@/components/ui/issues/create-form';
import Breadcrumbs from '@/components/ui/issues/breadcrumbs';
import { SessionProvider } from 'next-auth/react';
import { getRepos } from '@/app/lib/actions';
import { Metadata } from 'next';
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: 'Create Issue',
}
 
export default async function Page() {
  const session = await auth();
  if (!session) return { redirect: { destination: '/auth/signin', permanent: false } };
  const owner = session.user.name as string;
  const repos = await getRepos();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issues', href: '/dashboard' },
          {
            label: 'Create Issue',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <SessionProvider>
        <Form owner={owner} repos={repos} />
      </SessionProvider>
    </main>
  );
}