interface User {
  token?: string;
}

const authHeader = (): { Authorization?: string } | object => {
  // return authorization header with JWT(JSON Web Token) token
  if (typeof window !== "undefined") {
    const user: User = JSON.parse(
      localStorage.getItem("SITE_DATA_AUTH") || "{}"
    );

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }
  return {};
};

export default authHeader;
