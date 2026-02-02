export type RightIcon = "call" | "notification" | "none";
export type HeaderConfig = {
  title: string;
  showBack: boolean;
  rightIcon: RightIcon;
};

export const HEADER_CONFIG: Record<string, HeaderConfig> = {
  "/": { title: "Discover", showBack: false, rightIcon: "notification" },
  "/search": { title: "Search", showBack: true, rightIcon: "notification" },
  "/saved": { title: "Saved", showBack: true, rightIcon: "notification" },
  "/cart": { title: "Cart", showBack: true, rightIcon: "notification" },
  "/account": { title: "Account", showBack: true, rightIcon: "notification" },
  "/notifications": {
    title: "Notifications",
    showBack: true,
    rightIcon: "notification",
  },
  "/orders": { title: "My Orders", showBack: true, rightIcon: "notification" },

  "/my-details": {
    title: "My Details",
    showBack: true,
    rightIcon: "notification",
  },
  "/notification-settings": {
    title: "Notifications",
    showBack: true,
    rightIcon: "notification",
  },
  "/faqs": {
    title: "FAQs",
    showBack: true,
    rightIcon: "notification",
  },
  "/help-center": {
    title: "Help Center",
    showBack: true,
    rightIcon: "notification",
  },
  "/customer-service": {
    title: "Customer Service",
    showBack: true,
    rightIcon: "call",
  },
  "/addresses": {
    title: "Manage Addresses",
    showBack: true,
    rightIcon: "notification",
  },

  "/checkout/address": {
    title: "Select Address",
    showBack: true,
    rightIcon: "none",
  },
};
