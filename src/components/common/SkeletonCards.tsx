type Props = {
  quantity?: number;
  isSavedCard?: boolean;
};
const SkeletonCards = ({ quantity = 6, isSavedCard }: Props) => {
  return (
    <>
      {Array.from({ length: quantity }, (_, i) => (
        <div key={`index-${i}`} className="space-y-3 animate-pulse">
          <div
            className={`"w-full ${isSavedCard ? "aspect-4/3" : "aspect-3/4"} bg-[#CCCCCC] rounded-[10px]"`}
          ></div>
          <div className="w-full h-4.5 bg-[#CCCCCC] rounded-sm"></div>
          <div className="w-1/2 h-4.5 bg-[#CCCCCC] rounded-sm"></div>
        </div>
      ))}
    </>
  );
};
export default SkeletonCards;
