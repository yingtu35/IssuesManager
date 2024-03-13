import Form from '@/app/components/ui/issues/create-form';
import Breadcrumbs from '@/app/components/ui/issues/breadcrumbs';
import { getRepos } from '@/app/lib/actions';
import { Metadata } from 'next';
import { auth } from "@/auth"
import { UserIcon as User } from '@/app/components/ui/user/user-icon';

export const metadata: Metadata = {
  title: 'Create Issue',
  description: "Create an issue for the authenticated user"
}
 
export default async function Page() {
  const session = await auth();
  if (!session) return { redirect: { destination: '/auth/signin', permanent: false } };
  const repos = await getRepos();
  // console.log("session at create issue: ", session);
  const user = {
    name: session.user.name as string,
    avatarUrl: session.user.image as string,
    htmlUrl: `https://github.com/${session.user.name}`
  }
  const owner = session.user.name as string;

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
      <div className="flex gap-4 items-start">
        <User user={user} />
        <Form owner={owner} repos={repos} />
      </div>
    </main>
  );
}