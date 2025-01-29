import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data }: any = useSession();
  return (
    <div>
      Profile Page
      <div>Name : {data?.user?.email}</div>
    </div>
  );
};

export default ProfilePage;
