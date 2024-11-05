import { handleSignout } from '@/actions/authActions';

import { Button } from '../ui/button';

const SignoutButton = () => {
  return (
    <form action={handleSignout}>
      <Button type='submit' size='sm' variant='ghost'>
        Sign out
      </Button>
    </form>
  );
};

export default SignoutButton;
