import cron from "node-cron";
import { User } from "../models/userModel.js";

export const removeUnverifiedAccounts = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const result = await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });

      console.log(
        `[CRON] Deleted ${
          result.deletedCount
        } unverified accounts at ${new Date().toISOString()}`
      );
    } catch (error) {
      console.error(
        `[CRON] Failed to delete unverified accounts: ${error.message}`
      );
    }
  });
};
