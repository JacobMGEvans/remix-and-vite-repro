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
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in?redirect_url=" + args.request.url);
  }
  console.log("ENV META", import.meta.env);
  const user = await createClerkClient({
    secretKey: import.meta.env.VITE_CLERK_SECRET_KEY,
  }).users.getUser(userId);
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
      <p>User: {JSON.stringify(user)}</p>
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
