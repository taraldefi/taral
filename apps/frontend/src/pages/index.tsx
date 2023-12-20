import { useEffect } from "react";
import Login from "./auth/login-mvp";
import { useRouter } from "next/router";
import { AuthGuard } from "@components/AuthGuard";

export default function Index() {
  const router = useRouter();

  return <AuthGuard></AuthGuard>;
}
