"use client";

import { useMemo, useRef, type RefObject } from "react";

import { useMediaQuery } from "@/hooks";

import {
  canesDesktop,
  canesMobile,
  canesTablet,
  type CaneConfig,
} from "../../data/hero.data";
import { useHeroPointer } from "../../hooks/useHeroPointer";
import { useInteractiveCanes } from "../../hooks/useInteractiveCanes";
import { Cane } from "./Cane";

type InteractiveCanesProps = {
  rootRef: RefObject<HTMLElement | null>;
};

export function InteractiveCanes({ rootRef }: InteractiveCanesProps) {
  const caneRefs = useRef<Array<HTMLElement | null>>([]);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const canes: CaneConfig[] = useMemo(() => {
    if (isMobile) return canesMobile;
    if (isTablet) return canesTablet;
    return canesDesktop;
  }, [isMobile, isTablet]);

  const interactionEnabled = !isCoarsePointer && !isMobile;
  const pointerRef = useHeroPointer({
    rootRef,
    enabled: interactionEnabled,
  });

  useInteractiveCanes({
    rootRef,
    caneRefs,
    pointerRef,
    enabled: interactionEnabled,
  });

  return (
    <div data-hero-canes aria-hidden>
      {canes.map((cane, index) => (
        <Cane
          key={cane.id}
          cane={cane}
          ref={(element) => {
            caneRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
