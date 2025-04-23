import { FieldErrors } from "react-hook-form";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const getError = (name: string, errors: FieldErrors) => {
    return name
        .split(".")
        .map((item) => item.replaceAll("[", "").replaceAll("]", ""))
        .reduce((prev, curr) => (prev ? prev[curr] : prev), errors as any);
};
