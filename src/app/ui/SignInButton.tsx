import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()}>Sign Out</button>
  ) : (
    <button onClick={() => signIn('google')}>Sign In with Google</button>
  );
}

export default SignInButton;
