import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full max-w-sm",
            cardBox: "w-full",
          },
        }}
      />
    </main>
  );
}
