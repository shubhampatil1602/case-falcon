import Link from 'next/link';

import { auth } from '@/auth';

import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import SignoutButton from './auth/SignoutButton';

const Navbar = async () => {
  const user = await auth();

  const isAdmin = user?.user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold text-lg'>
            case<span className='text-orange-600'>falcon</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <SignoutButton />

                {isAdmin ? (
                  <Link
                    href='/'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                    variant: 'primary',
                  })}
                >
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/sign-up'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign up
                </Link>
                <Link
                  href='/sign-in'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign in
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block'></div>
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                    variant: 'primary',
                  })}
                >
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
