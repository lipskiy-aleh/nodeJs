import cookie from 'cookie';

class CookiesParser {

    cookieParser(req, res, next) {
        if (req.parsedCookies) {
            return next();
        }

        const cookies = req.headers.cookie;
        req.parsedCookies = Object.create(null);

        // no cookies
        if (!cookies) {
            return next();
        }

        req.parsedCookies = cookie.parse(cookies);
        // parse JSON cookies
        req.parsedCookies = JSONCookies(req.parsedCookies);

        next();
    }

    // Borrowed from this library
    // https://github.com/expressjs/cookie-parser/blob/master/index.js
    JSONCookies(obj) {
        const cookies = Object.keys(obj);
        let key;
        let val;

        for (let i = 0; i < cookies.length; i++) {
            key = cookies[i];
            val = JSONCookie(obj[key]);

            if (val) {
                obj[key] = val;
            }
        }

        return obj;
    }
    // Borrowed from this library
    // https://github.com/expressjs/cookie-parser/blob/master/index.js
    JSONCookie(str) {
        if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
            return undefined;
        }

        try {
            return JSON.parse(str.slice(2));
        } catch (err) {
            return undefined;
        }
    }
}

const cookiesParser = new CookiesParser();
export default cookiesParser;

