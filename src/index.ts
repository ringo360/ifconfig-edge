import { Hono } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    ip: getConnInfo(c).remote.address,
    ua: c.req.header("User-Agent"),
  });
});

app.get("/ip", async (c) => {
  const info = getConnInfo(c);
  return c.json({
    ip: info.remote.address,
  });
});

app.get("/ua", async (c) => {
  const userAgent = c.req.header("User-Agent");
  return c.json({
    ua: userAgent,
  });
});

export default app;
