import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: ["/dashboard", "/dashboard/appearance", "/dashboard/settings", "/dashboard/analytics"],
};