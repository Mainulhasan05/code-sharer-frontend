import googleAnalytics from "@analytics/google-analytics";
import Analytics from "analytics";
export const analytics = Analytics({
  app: "Codesharer",
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: "G-89ZKDQJBR9",
    }),
  ],
});