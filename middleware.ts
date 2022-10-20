import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = (request) => {
  const response = NextResponse.next();

  if (!request.cookies.get("sid"))
    response.cookies.set("sid", crypto.randomUUID(), {
      sameSite: "none",
      secure: true,
    });

  return response;
};

export const config = {
  matcher: "/",
};
