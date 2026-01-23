import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
    signIn: "/logIn",
  },
});

export const config = {
  matcher: ["/addItem/:path*", "/viewItem/:path*"],
};