import { LucideIcon } from "lucide-react";

type EmptyStateUiProps = {
  title: string;
  content: string;
  LabelIcon: LucideIcon;
};

const EmptyStateUi = ({ title, content, LabelIcon }: EmptyStateUiProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full px-10  flex flex-col items-center gap-4  ">
      <LabelIcon className="h-16 w-16 stroke-[#B3B3B3]" />
      <div className="space-y-3">
        <h2 className="font-semibold text-xl text-center">{title}</h2>
        <p className="text-base text-[#808080] text-center">{content}</p>
      </div>
    </div>
  );
};
export default EmptyStateUi;
