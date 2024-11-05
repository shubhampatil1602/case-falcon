import { Button } from '../ui/button';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { CardContent } from '../ui/card';
import { handleGithubSignIn, handleGoogleSignIn } from '@/actions/authActions';

const Socials = () => {
  return (
    <CardContent className='p-7 flex flex-col gap-y-4'>
      <form action={handleGoogleSignIn}>
        <Button
          size='lg'
          className='w-full font-semibold'
          variant='outline'
          name='action'
          value='google'
        >
          <FcGoogle className='w-5 h-5 mr-2' />
          Login with Google
        </Button>
      </form>
      <form action={handleGithubSignIn}>
        <Button
          size='lg'
          className='w-full font-semibold'
          variant='outline'
          name='action'
          value='github'
        >
          <FaGithub className='w-5 h-5 mr-2' />
          Login with Github
        </Button>
      </form>
    </CardContent>
  );
};

export default Socials;
