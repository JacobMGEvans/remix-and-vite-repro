import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/remix";
import { LoaderFunction, redirect } from "@remix-run/node";
import { createClerkClient } from "@clerk/remix/api.server";
import { getAuth } from "@clerk/remix/ssr.server";

export const loader: LoaderFunction = async (args) => {
  const user = await createClerkClient({
    secretKey: import.meta.env.VITE_CLERK_SECRET_KEY,
  }).users.getUser("user_2Y8JK1J3cFKGUO8RBNkvhmEC7cJ");
  return { serialisedUser: JSON.stringify(user) };
};

export default function Index() {
  const { userId, sessionId, getToken } = useAuth();
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
