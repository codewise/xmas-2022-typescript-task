import { describe, expect, test, jest } from "@jest/globals";
import { Cookie } from "./cookie";
import { CookieType } from "./cookie-type.enum";
import { CookieQueue } from "./index";

describe("Cookie queue", () => {
    test("add few cookies and create report", () => {
        const possibleTypes = [CookieType.CHRISTMAS_TREE, CookieType.SANTA_CLAUS_HAT, CookieType.SLEDGE];
        let expected_report: Cookie[] = [];
        let queue = new CookieQueue();
        for (let i = 0; i < 10; i++) {
            let cookie = new Cookie("cookie " + i.toString, possibleTypes[Math.floor(Math.random() * 3)]);
            expected_report.push(cookie);
            queue.add(cookie);
        }
        expected_report.reverse();
        expect(queue.getReport().getCookies()).toEqual(expected_report);
    });
    test("report should contain only 100 newest cookies", () => {
        const possibleTypes = [CookieType.CHRISTMAS_TREE, CookieType.SANTA_CLAUS_HAT, CookieType.SLEDGE];
        let expected_report: Cookie[] = [];
        let queue = new CookieQueue();
        for (let i = 0; i < 50; i++) {
            queue.add(new Cookie("cookie " + i.toString, possibleTypes[Math.floor(Math.random() * 3)]));
        }
        for (let i = 0; i < 100; i++) {
            let cookie = new Cookie("cookie " + i.toString, possibleTypes[Math.floor(Math.random() * 3)]);
            expected_report.push(cookie);
            queue.add(cookie);
        }
        expected_report.reverse();
        expect(queue.getReport().getCookies()).toEqual(expected_report);
    });
    test("report shouldn't contain rotten cookies", () => {
        jest.useFakeTimers()
        const possibleTypes = [CookieType.CHRISTMAS_TREE, CookieType.SANTA_CLAUS_HAT, CookieType.SLEDGE];
        let expected_report: Cookie[] = [];
        let queue = new CookieQueue();
        for (let i = 0; i < 10; i++) {
            queue.add(new Cookie("cookie " + i.toString, possibleTypes[Math.floor(Math.random() * 3)]));
        }
        jest.setSystemTime(Date.now() + 120000) // add two minutes
        for (let i = 0; i < 10; i++) {
            let cookie = new Cookie("cookie " + i.toString, possibleTypes[Math.floor(Math.random() * 3)]);
            expected_report.push(cookie);
            queue.add(cookie);
        }
        jest.setSystemTime(Date.now() + 240000) // add four minutes so older cookies go off
        expected_report.reverse();
        expect(queue.getReport().getCookies()).toEqual(expected_report);
    });
});
