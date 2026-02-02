import ToggleButton from "../../components/ui/ToggleButton";

const NotificationSettingsPage = () => {
  const notificationSettings = [
    "General Notifications",
    "Sound",
    "Vibrate",
    "Special Offers",
    "Promos & Discount",
    "Payments",
    "Cashbacks",
    "App Updates",
    "New Service Available",
    "New Tips Available",
  ];
  return (
    <div className="pb-5">
      <hr className="text-[#E6E6E6] mb-6" />
      {notificationSettings.map((notification, index) => {
        return (
          <>
            <ToggleButton key={index} label={notification} />
            {index !== notificationSettings.length - 1 && (
              <hr className="text-[#E6E6E6] my-5" />
            )}
          </>
        );
      })}
    </div>
  );
};

export default NotificationSettingsPage;
