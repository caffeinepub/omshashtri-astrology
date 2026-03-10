import { useQuery } from "@tanstack/react-query";
import type { Horoscope, ZodiacSign } from "../backend.d";
import { useActor } from "./useActor";

export function useZodiacSigns() {
  const { actor, isFetching } = useActor();
  return useQuery<ZodiacSign[]>({
    queryKey: ["zodiacSigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getZodiacSigns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDailyHoroscopes() {
  const { actor, isFetching } = useActor();
  return useQuery<Horoscope[]>({
    queryKey: ["dailyHoroscopes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDailyHoroscopes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBirthChartInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<{ sun: string; moon: string; rising: string }>({
    queryKey: ["birthChartInfo"],
    queryFn: async () => {
      if (!actor) return { sun: "", moon: "", rising: "" };
      return actor.getBirthChartInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAboutPage() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["aboutPage"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getAboutPage();
    },
    enabled: !!actor && !isFetching,
  });
}
