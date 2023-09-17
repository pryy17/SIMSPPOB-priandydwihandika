import React from "react";
import banner from "../../../../assets/image/Banner 1.png";
import useEmblaCarousel from "embla-carousel-react";

export default function Promo({ data }) {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="text-left">
      <h1 className="text-lg font-medium">Temukan promo menarik</h1>
      <div className="embla mt-5 overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {data?.map((item, key) => (
            <img
              key={key}
              className="embla__slide w-72 mr-7"
              src={item.banner_image}
              alt={item.banner_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
