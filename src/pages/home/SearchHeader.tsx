import { useState } from "react";
import { Search, Mic, SlidersHorizontal } from "lucide-react";
import InputTwo from "../../components/ui/InputTwo";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const SearchHeader = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!value.trim()) return;
    navigate(`/search?search=${encodeURIComponent(value)}`);
  };
  return (
    <div className="space-y-3 bg-white">
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <InputTwo
            value={value}
            onClick={() => navigate("/search")}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            leftIcon={Search}
            rightIcon={Mic}
            type="text"
            placeholder="Search for clothes..."
            className="py-4 rounded-[18px]"
          />
        </div>
        <div className="w-min">
          {/* filters come here like, min Price- maxPrice, size */}
          <Button variant="primary" onClick={() => console.log("Open Filter")}>
            <SlidersHorizontal size={24} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
