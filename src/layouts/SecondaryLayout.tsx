import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const SecondaryLayout = () => {
  return (
    <div>
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
      <Outlet />
    </div>
  );
};

export default SecondaryLayout;
