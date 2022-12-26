import { Cookie } from "./cookie";
import { CookieType } from "./cookie-type.enum";
import { IReport } from "./report.interface";
import { ICookieQueue } from "./cookie-queue.interface";

class CookieNode {
    cookie: Cookie;
    prev: CookieNode | null;
    next: CookieNode | null;
    date_created: Date;

    constructor(cookie: Cookie, prev: CookieNode | null = null, next: CookieNode | null = null, date_created: Date = new Date(Date.now())) {
        this.cookie = cookie;
        this.prev = prev;
        this.next = next;
        this.date_created = date_created;
    }
}

export class CookieQueue implements ICookieQueue {
    private newest_cookie: CookieNode = new CookieNode(new Cookie("placeholder cookie", CookieType.ERROR));
    private oldest_cookie: CookieNode = this.newest_cookie;
    private amount_of_cookies = 0;

    add(message: Cookie): void {
        if (this.amount_of_cookies == 0) { // pushing first element
            this.newest_cookie = new CookieNode(message);
            this.oldest_cookie = this.newest_cookie;
        }
        else {
            this.newest_cookie.next = new CookieNode(message, this.newest_cookie);
            this.newest_cookie = this.newest_cookie.next;
        }
        this.amount_of_cookies++;
    }

    getReport(): IReport {
        this.removeRottenCookies()
        const report_len = Math.min(100, this.amount_of_cookies)
        let report: Cookie[] = []
        let curr_cookie: CookieNode = this.newest_cookie
        while (curr_cookie.prev != null && report.length < 99) {
            report.push(curr_cookie.cookie)
            curr_cookie = curr_cookie.prev
        }
        report.push(curr_cookie.cookie)
        return {
            getCookies: () => report
        }
    }

    private removeRottenCookies(): void {
        const five_minutes = 300000;
        while (this.amount_of_cookies > 0 && this.oldest_cookie.date_created < new Date(Date.now() - five_minutes)) {
            if (this.oldest_cookie.next == null) { // removing last element
                this.newest_cookie = new CookieNode(new Cookie("placeholder cookie", CookieType.ERROR));
                this.oldest_cookie = this.newest_cookie;
            }
            else {
                this.oldest_cookie = this.oldest_cookie.next;
                this.oldest_cookie.prev = null;
            }
            this.amount_of_cookies--;
        }
    }
}