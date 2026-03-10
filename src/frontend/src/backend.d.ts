import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Horoscope {
    dailyText: string;
    sign: string;
}
export interface ZodiacSign {
    element: string;
    name: string;
    description: string;
    modality: string;
    rulingPlanet: string;
    dateRange: string;
    symbol: string;
}
export interface backendInterface {
    getAboutPage(): Promise<string>;
    getBirthChartInfo(): Promise<{
        sun: string;
        moon: string;
        rising: string;
    }>;
    getDailyHoroscopes(): Promise<Array<Horoscope>>;
    getZodiacSigns(): Promise<Array<ZodiacSign>>;
    updateHoroscope(sign: string, text: string): Promise<void>;
}
