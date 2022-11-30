import { Cookie } from "./cookie";
import { IReport } from "./report.interface";

export interface ICookieQueue {
    add(message: Cookie): void;
    getReport(): IReport;
}
