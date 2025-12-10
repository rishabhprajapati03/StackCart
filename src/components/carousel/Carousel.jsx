import React, { useCallback, useEffect, useRef, useState } from "react";
import { CarouselImages } from "../../assets/images/images";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { RxDot, RxDotFilled } from "react-icons/rx";

const Carousel = ({ IntervalTime = 3000, autoplay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const setCurrentSlide = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;

    setCurrentIndex(index);
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const handleBack = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? CarouselImages.length - 1 : currentIndex - 1;
    setCurrentSlide(newIndex);
  }, [currentIndex, setCurrentSlide]);

  const handleForward = useCallback(() => {
    const newIndex =
      currentIndex === CarouselImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentSlide(newIndex);
  }, [currentIndex, setCurrentSlide]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      handleForward();
    }, IntervalTime);
    return () => clearInterval(timer);
  }, [IntervalTime, handleForward, autoplay]);

  return (
    <div aria-label="Carousel" className="w-full relative">
      <div className="absolute flex top-1 left-1/2 -translate-x-1/2">
        <div className={`w-10 h-2 rounded-md bg-gray-500`}></div>
      </div>
      <button
        onClick={handleBack}
        className="cursor-pointer absolute z-10 top-1/2 left-0 -translate-y-1/2 w-10 h-20 bg-black/70 flex items-center justify-center text-xl rounded-r-lg"
      >
        <IoChevronBackOutline />
      </button>

      {/* IMAGES */}
      <div ref={scrollRef} className="w-full overflow-hidden">
        <div className="flex">
          {CarouselImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="slide"
              className="object-cover min-w-full h-full aspect-video sm:aspect-15/6 md:aspect-15/5 lg:aspect-auto"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleForward}
        className="cursor-pointer absolute z-10 top-1/2 right-0 -translate-y-1/2 w-10 h-20 bg-black/70 flex items-center justify-center text-xl rounded-l-lg"
      >
        <IoChevronForwardOutline />
      </button>

      {/* DOTS */}
      <div className="absolute flex bottom-1 left-1/2 -translate-x-1/2 text-gray-800">
        {CarouselImages.map((_, index) => (
          <span key={index}>
            {currentIndex === index ? (
              <RxDotFilled
                className="cursor-pointer"
                onClick={() => setCurrentSlide(index)}
              />
            ) : (
              <RxDot
                className="cursor-pointer"
                onClick={() => setCurrentSlide(index)}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
