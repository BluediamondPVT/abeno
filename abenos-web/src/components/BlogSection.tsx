"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  image: string;
  title: string;
  link: string;
  delay?: string;
}

const blogPosts: BlogPost[] = [
  {
    image: "/images/post-1.jpg",
    title: "How To Choose The Perfect Catering Menu For Your Special Event",
    link: "#blog-single",
  },
  {
    image: "/images/post-2.jpg",
    title: "Top Food Trends For Modern Events And Grand Celebrations",
    link: "#blog-single",
    delay: "0.2s",
  },
  {
    image: "/images/post-3.jpg",
    title: "Essential Tips For Planning A Stress-Free Event Catering Experience",
    link: "#blog-single",
    delay: "0.4s",
  },
];

export default function BlogSection() {
  return (
    <div className="our-blog" id="blog">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <span className="section-sub-title wow fadeInUp">Our blog</span>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Latest catering tips ideas and food inspirations
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          {blogPosts.map((post, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              {/* Post Item Start */}
              <div
                className="post-item wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <div className="post-featured-image">
                  <Link href={post.link} data-cursor-text="View">
                    <figure>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={410}
                        height={266}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </figure>
                  </Link>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <h2>
                      <Link href={post.link}>{post.title}</Link>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <Link href={post.link} className="readmore-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              {/* Post Item End */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
