"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  delay?: string;
}

const faqList: FaqItem[] = [
  {
    question: "Do you offer customized catering menus?",
    answer:
      "Yes, we provide fully customizable menus tailored to your event type, guest preferences, and budget requirements. Our team works closely with you to understand your vision, dietary needs, and cuisine preferences.",
  },
  {
    question: "How early should I book your catering services?",
    answer:
      "Yes, we provide fully customizable menus tailored to your event type, guest preferences, and budget requirements. Our team works closely with you to understand your vision, dietary needs, and cuisine preferences.",
    delay: "0.2s",
  },
  {
    question: "Do you provide staff for serving and setup?",
    answer:
      "Yes, we provide fully customizable menus tailored to your event type, guest preferences, and budget requirements. Our team works closely with you to understand your vision, dietary needs, and cuisine preferences.",
    delay: "0.4s",
  },
  {
    question: "What types of events do you cater?",
    answer:
      "Yes, we provide fully customizable menus tailored to your event type, guest preferences, and budget requirements. Our team works closely with you to understand your vision, dietary needs, and cuisine preferences.",
    delay: "0.6s",
  },
  {
    question: "Do you offer vegetarian and vegan options?",
    answer:
      "Yes, we provide fully customizable menus tailored to your event type, guest preferences, and budget requirements. Our team works closely with you to understand your vision, dietary needs, and cuisine preferences.",
    delay: "0.8s",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="our-faqs dark-section" id="faqs">
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            {/* FAQS Content Start */}
            <div className="faqs-content">
              {/* Section Title Start */}
              <div className="section-title">
                <span className="section-sub-title wow fadeInUp">
                  Frequently Asked Questions
                </span>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  Everything you need to know about catering
                </h2>
              </div>
              {/* Section Title End */}

              {/* FAQS Image Box Start */}
              <div className="faqs-image-box wow fadeInUp" data-wow-delay="0.2s">
                {/* FAQS Image Start */}
                <div className="faqs-image">
                  <figure className="image-anime">
                    <Image
                      src="/images/our-faqs-image.jpg"
                      alt="Catering FAQs"
                      width={510}
                      height={360}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                </div>
                {/* FAQS Image End */}

                {/* FAQS CTA Box Start */}
                <div className="faqs-cta-box">
                  {/* FAQS CTA Title Start */}
                  <div className="faqs-cta-title">
                    <h3>Contact Information</h3>
                  </div>
                  {/* FAQS CTA Title End */}

                  {/* FAQS CTA Item List Start */}
                  <div className="faqs-cta-item-list">
                    {/* FAQS CTA Item Start */}
                    <div className="faqs-cta-item">
                      <div className="icon-box">
                        <Image
                          src="/images/icon-phone-white.svg"
                          alt="Phone"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="faqs-cta-item-content">
                        <p>Phone number</p>
                        <h3>
                          <Link href="tel:+91123456789">+91 12345-6789</Link>
                        </h3>
                      </div>
                    </div>
                    {/* FAQS CTA Item End */}
                  </div>
                  {/* FAQS CTA Item List End */}
                </div>
                {/* FAQS CTA Box End */}
              </div>
              {/* FAQS Image Box End */}
            </div>
            {/* FAQS Content End */}
          </div>

          <div className="col-xl-7">
            {/* FAQ Accordion Start */}
            <div className="faq-accordion" id="accordion">
              {faqList.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay={item.delay}
                    key={index}
                  >
                    <h2 className="accordion-header" id={`heading${index + 1}`}>
                      <button
                        className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                        aria-controls={`collapse${index + 1}`}
                        style={{ outline: "none", boxShadow: "none" }}
                      >
                        {item.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index + 1}`}
                      className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                      aria-labelledby={`heading${index + 1}`}
                    >
                      <div className="accordion-body">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* FAQ Accordion End */}
          </div>
        </div>
      </div>
    </div>
  );
}
