import {
  Bell,
  CircleUserRound,
  CreditCard,
  LucideIcon,
  MapPin,
  Tag,
  Wallet,
} from "lucide-react";
import EmptyStateUi from "../../components/common/EmptyStateUi";

type NotificationItemProps = {
  NotificationTag: LucideIcon;
  title: string;
  content: string;
};
const NotificationItem = ({
  NotificationTag,
  title,
  content,
}: NotificationItemProps) => {
  return (
    <div className="flex gap-3.25 items-stretch">
      <div className="shrink-0 w-6 flex items-center ">
        <NotificationTag className="h-6 w-6 stroke-[#1A1A1A] fill-[#CCCCCC] " />
      </div>
      <div className="flex-1">
        <h4 className="text-sm text-[#1A1A1A] font-semibold ">{title}</h4>
        <p className="text-[#808080] text-xs">{content}</p>
      </div>
    </div>
  );
};

const NotificationPage = () => {
  if (false)
    return (
      <EmptyStateUi
        title="You haven’t gotten any notifications yet!"
        content="  We’ll alert you when something cool happens."
        LabelIcon={Bell}
      />
    );
  return (
    <div className="space-y-4">
      <hr className="text-[#E6E6E6]" />
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Today</h3>
        <div className="space-y-5">
          <NotificationItem
            NotificationTag={Tag}
            title={"30% Special Discount!"}
            content={" Special promotion only valid today."}
          />
        </div>
      </section>
      <hr className="text-[#E6E6E6]" />

      <section className="space-y-4">
        <h3 className="text-base font-semibold">Yesterday</h3>
        <div className="space-y-5">
          <NotificationItem
            NotificationTag={Wallet}
            title={"Top Up E-wallet Successfully!"}
            content={"You have top up your e-wallet."}
          />
          <hr className="text-[#E6E6E6]" />
          <NotificationItem
            NotificationTag={MapPin}
            title={"New Service Available!"}
            content={" Now you can track order in real time."}
          />
        </div>
      </section>
      <hr className="text-[#E6E6E6]" />
      <section className="space-y-4">
        <h3 className="text-base font-semibold">20 Dec, 2025</h3>
        <div className="space-y-5">
          <NotificationItem
            NotificationTag={CreditCard}
            title={"Credit Card Connnected!"}
            content={" Credit card has been linked."}
          />
          <hr className="text-[#E6E6E6]" />
          <NotificationItem
            NotificationTag={CircleUserRound}
            title={"Account Setup Successfully!"}
            content={"Your account has been created."}
          />
        </div>
      </section>
    </div>
  );
};

export default NotificationPage;
