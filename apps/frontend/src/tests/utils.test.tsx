import CoreUtils from "@utils/coreUtils"; // replace with actual path

describe("CoreUtils", () => {
  it("should set a cookie", () => {
    const cookieName = "testCookie";
    const cookieValue = "testValue";
    const path = "/";
    const days = 1;
    CoreUtils.call("setCookie", cookieName, cookieValue, path, days);
  });

  it("should get a cookie", () => {
    const cookieName = "testCookie";
    const data = CoreUtils.return("getCookie", cookieName);
    expect(data).toEqual("testValue");
  });

  it("should delete a cookie", () => {
    const cookieName = "testCookie";
    const path = "/";
    CoreUtils.call("delCookie", cookieName, path);
    const data = CoreUtils.return("getCookie", cookieName);
    expect(data).toEqual(null);
  });

  it("should set token value to authHeader and return it's value", () => {
    const mockResult = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    localStorage.setItem(
      "SITE_DATA_AUTH",
      JSON.stringify({
        token: token,
      })
    );
    const authHeaderValue = CoreUtils.return("authHeader");
    expect(mockResult).toEqual(authHeaderValue);
  });
});
