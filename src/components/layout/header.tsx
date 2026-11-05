import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="font-semibold">
          ToDo list
        </Link>

        <Show when="signed-in">
          <UserButton />
        </Show>
        <Show when="signed-out">
          <div className="flex gap-2">
            <SignInButton>
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">Criar conta</Button>
            </SignUpButton>
          </div>
        </Show>
      </div>
    </header>
  );
}
