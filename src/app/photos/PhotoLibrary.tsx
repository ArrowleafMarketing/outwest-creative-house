"use client";

import { useMemo, useState } from "react";
import { Photo } from "@/components/Photo";
import type { Photo as PhotoData, PhotoCategory, PhotoTag } from "@/photos";

const CATEGORIES: PhotoCategory[] = ["place", "person", "detail", "work"];

export function PhotoLibrary({
  photos,
  series,
  tags,
}: {
  photos: readonly PhotoData[];
  series: readonly string[];
  tags: readonly PhotoTag[];
}) {
  const [category, setCategory] = useState<PhotoCategory | null>(null);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [tag, setTag] = useState<PhotoTag | null>(null);

  const shown = useMemo(
    () =>
      photos.filter(
        (p) =>
          (!category || p.category === category) &&
          (!activeSeries || p.series === activeSeries) &&
          (!tag || p.tags?.includes(tag)),
      ),
    [photos, category, activeSeries, tag],
  );

  const chip = (active: boolean) =>
    `eyebrow cursor-pointer border px-3 py-1.5 transition-colors duration-200 ${
      active
        ? "border-ink bg-ink text-alabaster"
        : "border-rule text-on-ground-dim hover:border-on-ground-dim hover:text-ink"
    }`;

  return (
    <>
      <div className="mt-10 space-y-4">
        <Filter label="Category">
          <button className={chip(!category)} onClick={() => setCategory(null)}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={chip(category === c)}
              onClick={() => setCategory(category === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </Filter>

        <Filter label="Series">
          <button
            className={chip(!activeSeries)}
            onClick={() => setActiveSeries(null)}
          >
            All
          </button>
          {series.map((s) => (
            <button
              key={s}
              className={chip(activeSeries === s)}
              onClick={() => setActiveSeries(activeSeries === s ? null : s)}
            >
              {s}
            </button>
          ))}
        </Filter>

        <Filter label="Tag">
          <button className={chip(!tag)} onClick={() => setTag(null)}>
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={chip(tag === t)}
              onClick={() => setTag(tag === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </Filter>
      </div>

      <p className="eyebrow mt-8 text-on-ground-dim">
        {shown.length} of {photos.length}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <figure key={p.slug}>
            <div className="relative aspect-3/4 overflow-hidden bg-canvas">
              <Photo
                photo={p}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 space-y-1">
              <p className="eyebrow text-ink">{p.category}</p>
              <p className="font-sans text-xs text-on-ground-dim">{p.slug}</p>
              {p.series ? (
                <p className="paragraph-header text-xs text-on-ground-dim">
                  {p.series}
                </p>
              ) : null}
              {p.tags?.length ? (
                <p className="font-sans text-[11px] text-on-ground-dim/70">
                  {p.tags.join(" · ")}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="paragraph-header mt-16 text-center text-lg text-on-ground-dim">
          Nothing matches that combination.
        </p>
      ) : null}
    </>
  );
}

function Filter({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="eyebrow w-20 shrink-0 text-on-ground-dim">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
