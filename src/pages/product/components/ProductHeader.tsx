import { ArrowLeft, Bell } from "lucide-react";
import React from "react";
import AppHeader from "../../../components/common/AppHeader";

const ProductHeader = () => {
  return <AppHeader showBack={true} title="Details" rightIcon="notification" />;
};

export default ProductHeader;
