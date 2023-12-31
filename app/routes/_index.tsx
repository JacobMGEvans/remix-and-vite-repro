import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/remix";

export default function Index() {
  const { userId, sessionId } = useAuth();
  const { user } = useUser();
  return (
    <div>
      <h1>
        Index route {userId}, {sessionId}
      </h1>
      <p>User: {JSON.stringify(user, null, 2)}</p>
      <SignedIn>
        <h1>Index route</h1>
        <p>You are signed in!</p>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
