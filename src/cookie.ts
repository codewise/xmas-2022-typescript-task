import { CookieType } from "./cookie-type";

export class Cookie {
    public constructor(
        private _label: string,
        private _cookieType: CookieType
    ) {}

    public getLabel(): string {
        return this._label;
    }

    public getCookieType(): CookieType {
        return this._cookieType;
    }
}
