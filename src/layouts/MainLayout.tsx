import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";
import AppHeader from "../components/common/AppHeader";
import { HEADER_CONFIG } from "../types/headerConfig";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  const config = HEADER_CONFIG[location.pathname] ?? {
    title: "App",
    onBack: false,
    rightIcon: "none",
  };
  return (
    <div className="w-full  min-h-dvh mx-auto relative">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          bottom: 90,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFFFFF",
            color: "#1A1A1A",
            borderRadius: "10px",
            fontSize: "14px",
          },
          error: {
            iconTheme: {
              primary: "#ED1010",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppHeader
        title={config.title}
        showBack={config.showBack}
        rightIcon={config.rightIcon}
      />
      <main className=" w-full min-h-[calc(100dvh-135px)] bg-white px-5 py-1 relative flex flex-col items-stretch">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
