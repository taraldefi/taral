import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const isAuthenticated = useAuth(false);

  useEffect(() => {
    router.push("users/importer/entities");
  });
}
