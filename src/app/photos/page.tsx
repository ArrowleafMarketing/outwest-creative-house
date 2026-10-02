import type { Metadata } from "next";
import { photos, seriesNames, type PhotoTag } from "@/photos";
import { PhotoLibrary } from "./PhotoLibrary";

export const metadata: Metadata = {
  title: "Photo library · OutWest Creative House",
  description:
    "Every photograph currently available for the OutWest site, filterable by category, series and tag.",
};

export default function PhotosPage() {
  const tags = [
    ...new Set(photos.flatMap((p) => p.tags ?? [])),
  ].sort() as PhotoTag[];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24">
      <p className="eyebrow text-on-ground-dim">Working library</p>
      <h1 className="mt-3 font-display text-4xl tracking-display sm:text-6xl">
        PHOTOGRAPHY
      </h1>
      <p className="paragraph-header mt-6 max-w-2xl text-lg text-on-ground-dim">
        Everything currently available to build with — {photos.length} frames,
        categorised by the PLACE / PERSON / DETAIL / WORK rhythm.
      </p>

      <PhotoLibrary photos={photos} series={seriesNames} tags={tags} />
    </main>
  );
}
