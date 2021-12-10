export interface Crumb {
    path: string;
    absolute: boolean;
    relative: boolean;
    name_en: string;
    name_ar: string;
    translate?: string;
    disabled: boolean;
}