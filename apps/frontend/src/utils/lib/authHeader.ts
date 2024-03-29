interface User {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

const authHeader = (): { Authorization?: string } | object => {
  // return authorization header with JWT(JSON Web Token) token
  if (typeof window !== "undefined") {
    const user: User = JSON.parse(
      localStorage.getItem("SITE_DATA_AUTH") || "{}"
    );

    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      return {};
    }
  }
  return {};
};

export default authHeader;
