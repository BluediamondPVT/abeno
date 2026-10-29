"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    quote:
      "“We hired this catering team for our wedding, and everything exceeded expectations. The food was absolutely delicious, beautifully presented, and served on time.”",
    name: "Emily Carter",
    role: "Event Manager",
    avatar: "/images/author-1.jpg",
  },
  {
    quote:
      "“We hired this catering team for our wedding, and everything exceeded expectations. The food was absolutely delicious, beautifully presented, and served on time.”",
    name: "Daniel Brooks",
    role: "Business Owner",
    avatar: "/images/author-2.jpg",
  },
  {
    quote:
      "“We hired this catering team for our wedding, and everything exceeded expectations. The food was absolutely delicious, beautifully presented, and served on time.”",
    name: "Olivia Carter",
    role: "Event Coordinator",
    avatar: "/images/author-3.jpg",
  },
];

export default function TestimonialsSection() {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Autoplay],
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
          },
          1300: {
            slidesPerView: 2,
          },
        },
      });
    }

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="our-testimonials" id="testimonials">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <span className="section-sub-title wow fadeInUp">
                Testimonials
              </span>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                What our customer say about our catering services
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-md-5">
            {/* Testimonials Image Box Start */}
            <div className="testimonials-image-box wow fadeInUp">
              {/* Testimonials Image Start */}
              <div className="testimonials-image">
                <figure className="image-anime">
                  <Image
                    src="/images/our-testimonials-image.jpg"
                    alt="Our Testimonials"
                    width={410}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                  />
                </figure>
              </div>
              {/* Testimonials Image End */}

              {/* Testimonials Client Box Start */}
              <div className="testimonials-client-box">
                <div className="testimonials-client-header">
                  {/* Satisfy Client Images Start */}
                  <div className="satisfy-client-images">
                    <div className="satisfy-client-image">
                      <figure className="image-anime">
                        <Image
                          src="/images/author-1.jpg"
                          alt="Emily Carter"
                          width={48}
                          height={48}
                        />
                      </figure>
                    </div>
                    <div className="satisfy-client-image">
                      <figure className="image-anime">
                        <Image
                          src="/images/author-2.jpg"
                          alt="Daniel Brooks"
                          width={48}
                          height={48}
                        />
                      </figure>
                    </div>
                    <div className="satisfy-client-image">
                      <figure className="image-anime">
                        <Image
                          src="/images/author-3.jpg"
                          alt="Olivia Carter"
                          width={48}
                          height={48}
                        />
                      </figure>
                    </div>
                  </div>
                  {/* Satisfy Client Images End */}

                  <div className="testimonials-client-counter">
                    <h2>
                      <span className="counter">326</span>K+
                    </h2>
                  </div>
                </div>
                <div className="testimonials-client-content">
                  <p>Our Happy Customer</p>
                </div>
              </div>
              {/* Testimonials Client Box End */}
            </div>
            {/* Testimonials Image Box End */}
          </div>

          <div className="col-xl-8 col-md-7">
            {/* Testimonials Slider Start */}
            <div className="testimonials-slider">
              <div className="swiper" ref={swiperContainerRef}>
                <div className="swiper-wrapper" data-cursor-text="Drag">
                  {testimonialsData.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                      {/* Testimonials Item Start */}
                      <div className="testimonials-item">
                        <div className="testimonials-item-rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="testimonials-item-body">
                          <div className="testimonials-item-content">
                            <p>{item.quote}</p>
                          </div>
                          <div className="testimonials-item-author-box">
                            <div className="testimonials-item-author">
                              <div className="testimonials-item-author-image">
                                <figure>
                                  <Image
                                    src={item.avatar}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                  />
                                </figure>
                              </div>
                              <div className="testimonials-item-author-content">
                                <h2>{item.name}</h2>
                                <p>{item.role}</p>
                              </div>
                            </div>
                            <div className="testimonial-item-quote">
                              <Image
                                src="/images/testimonial-quote.svg"
                                alt="Quote"
                                width={40}
                                height={40}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Testimonials Item End */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Testimonials Slider End */}
          </div>

          <div className="col-lg-12">
            {/* Section Footer Text Start */}
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.2s"
            >
              {/* Satisfy Client Images Start */}
              <div className="satisfy-client-images">
                <div className="satisfy-client-image">
                  <figure className="image-anime">
                    <Image
                      src="/images/author-1.jpg"
                      alt="Client"
                      width={48}
                      height={48}
                    />
                  </figure>
                </div>
                <div className="satisfy-client-image add-more">
                  <Image
                    src="/images/icon-phone-white.svg"
                    alt="Contact"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {/* Satisfy Client Images End */}
              <p>
                From menu planning to flawless service -{" "}
                <Link href="#contact">
                  we create catering experiences you can trust.
                </Link>
              </p>
              <ul className="section-footer-border-list">
                <li>
                  <b>
                    <span className="counter">4.9</span>
                  </b>{" "}
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  Trusted By <b>2,000+</b> Users
                </li>
              </ul>
            </div>
            {/* Section Footer Text End */}
          </div>
        </div>
      </div>
    </div>
  );
}
