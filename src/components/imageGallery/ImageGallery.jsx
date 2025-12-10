import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { BiHeart } from "react-icons/bi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const MiniImages = ({ imgs, setImage }) => {
  const [showForward, setShowForward] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const scrollRef = useRef(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setShowBack(el.scrollLeft > 0);
    setShowForward(!(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10));
  };
  const handleBack = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTo({
      left: el.scrollLeft - el.clientWidth / 3,
      behavior: "smooth",
    });
  };
  const handleForward = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTo({
      left: el.scrollLeft + el.clientWidth / 3,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScroll());
    window.addEventListener("resize", checkScroll());

    return () => {
      el.removeEventListener("scroll", checkScroll());
      window.removeEventListener("resize", checkScroll());
    };
  }, []);
  return (
    <div className="h-min w-full relative">
      {showBack && (
        <button
          onClick={() => {
            handleBack();
            checkScroll();
          }}
          className="absolute left-0 mx-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/90 "
        >
          <IoChevronBack className="text-lg" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto overflow-y-auto hide-scrollbar shrink-0 mt-2"
      >
        <div className="flex flex-row gap-2 w-full h-full">
          {imgs.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                onMouseEnter={() => setImage(image)}
                onClick={() => setImage(image)}
                alt={`image${index}`}
                className="w-16 aspect-square border border-gray-500/50"
              />
            );
          })}
        </div>
      </div>
      {showForward && (
        <button
          onClick={() => {
            handleForward();
            checkScroll();
          }}
          className="absolute right-0 mx-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/90 "
        >
          <IoChevronForward className="text-lg" />
        </button>
      )}
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  if (!images) return;

  return (
    <div
      aria-label="Image Gallery"
      className=" max-h-min w-full border border-gray-500/50"
    >
      <div className="p-2 w-full">
        <div className="w-full md:w-8/12 relative bg-stone-800 border-gray-500/50 mx-auto">
          <img src={currentImage} alt="image" className=" h-full w-full " />
        </div>
        <MiniImages imgs={images} setImage={setCurrentImage} />
      </div>
    </div>
  );
};

export default ImageGallery;
