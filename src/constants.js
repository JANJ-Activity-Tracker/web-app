const VERSION = "DEV"; // or PROD

export const URL = VERSION === "DEV" ? "https://janj-activity-tracker-dev.herokuapp.com" : "https://janj-activity-tracker.herokuapp.com";
export const BACKEND_URL = VERSION === "DEV" ? "https://janj-activity-tracker-dev.herokuapp.com/admin" : "https://janj-activity-tracker.herokuapp.com/admin";