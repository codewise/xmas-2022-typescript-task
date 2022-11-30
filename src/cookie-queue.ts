import { Cookie } from "./cookie";
import { Report } from "./report";

export interface CookieQueue {
    add(message: Cookie): void;
    getReport(): Report;
}
