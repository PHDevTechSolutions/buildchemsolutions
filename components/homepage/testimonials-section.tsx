"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export function ReelsSection() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, "reels"),
          where("website", "==", "VAH"),
          where("visibility", "==", "public"),
        );
        const querySnapshot = await getDocs(q);
        const videoIds = querySnapshot.docs.map((doc) => doc.data().url);
        setVideos(videoIds);
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const currentVideos = videos
    .slice(currentIndex, currentIndex + 3)
    .concat(videos.slice(0, Math.max(0, currentIndex + 3 - videos.length)));

  return (
    <section className="w-full bg-white py-24 md:py-32 border-b border-gray-200/50">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 w-fit">
            <div className="w-2.5 h-2.5 bg-blue-600" />
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              Social Media
            </span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <h2 className="text-balance text-4xl md:text-5xl font-normal text-gray-900">
              {"Follow Us on TikTok.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] gap-3">
            <Loader2 className="animate-spin text-gray-400" size={36} />
            <p className="text-sm text-gray-400">Loading reels...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {currentVideos.map((videoPath, index) => {
              const videoId = videoPath.split("/").pop()?.split("?")[0];
              return (
                <div
                  key={`${videoId}-${index}`}
                  className={`p-8 border-gray-200/50 ${
                    index !== 2 ? "md:border-r border-b md:border-b-0" : ""
                  }`}
                >
                  <iframe
                    src={`https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1&loop=1`}
                    height="500"
                    width="100%"
                    allow="fullscreen"
                    title={`TikTok video ${videoId}`}
                    className="rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
