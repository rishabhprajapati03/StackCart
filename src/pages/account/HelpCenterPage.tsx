import { LucideIcon } from "lucide-react";

import {
  Headphones,
  MessageCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { id: 1, name: "Customer Service", icon: Headphones },
  { id: 2, name: "Whatsapp", icon: MessageCircle },
  { id: 3, name: "Website", icon: Globe },
  { id: 4, name: "Facebook", icon: Facebook },
  { id: 5, name: "Twitter", icon: Twitter },
  { id: 6, name: "Instagram", icon: Instagram },
];

interface ServiceItemProps {
  name: string;
  Icon: LucideIcon;
}

const ServiceLink = ({ name, Icon }: ServiceItemProps) => {
  return (
    <Link
      to={"/customer-service"}
      className="w-full flex items-center gap-3 py-3.5 px-5 bg-white border border-[#E6E6E6] rounded-[10px]"
    >
      <div className="text-[#1A1A1A]">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-base font-medium text-[#1A1A1A]">{name}</span>
    </Link>
  );
};

const HelpCenterPage = () => {
  return (
    <div className="w-full space-y-3.5">
      <hr className="mb-5 text-[#E6E6E6]" />
      {services.map((service) => (
        <ServiceLink key={service.id} name={service.name} Icon={service.icon} />
      ))}
    </div>
  );
};

export default HelpCenterPage;
