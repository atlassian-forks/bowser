/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */

/**
 * Get first matched item for a string
 * @param {RegExp} regexp
 * @param {String} ua
 * @return {Array|{index: number, input: string}|*|boolean|string}
 */
const getFirstMatch = (regexp, ua) => {
  const match = ua.match(regexp);
  return (match && match.length > 0 && match[1]) || "";
};

/**
 * Get second matched item for a string
 * @param regexp
 * @param {String} ua
 * @return {Array|{index: number, input: string}|*|boolean|string}
 */
const getSecondMatch = (regexp, ua) => {
  const match = ua.match(regexp);
  return (match && match.length > 1 && match[2]) || "";
};

const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

const getBrowserVersion = (regexes = [], ua) => {
  for (const regex of regexes) {
    const result = getFirstMatch(regex, ua);
    if (result) {
      return result;
    }
  }

  return null;
};

const browsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua) {
      return {
        name: "Googlebot",
        version: getBrowserVersion(
          [/googlebot\/(\d+(\.\d+))/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },

  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(ua) {
      return {
        name: "Opera",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:opera)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },

  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(ua) {
      return {
        name: "Opera",
        version: getBrowserVersion(
          [/(?:opr|opios)[\s/](\S+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      return {
        name: "Samsung Internet for Android",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/Whale/i],
    describe(ua) {
      return {
        name: "NAVER Whale Browser",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:whale)[\s/](\d+(?:\.\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      return {
        name: "MZ Browser",
        version: getBrowserVersion(
          [/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/focus/i],
    describe(ua) {
      return {
        name: "Focus",
        version: getBrowserVersion(
          [/(?:focus)[\s/](\d+(?:\.\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/swing/i],
    describe(ua) {
      return {
        name: "Swing",
        version: getBrowserVersion(
          [/(?:swing)[\s/](\d+(?:\.\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/coast/i],
    describe(ua) {
      return {
        name: "Opera Coast",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:coast)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua) {
      return {
        name: "Opera Touch",
        version: getBrowserVersion(
          [/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      return {
        name: "Yandex Browser",
        version: getBrowserVersion(
          [/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      return {
        name: "UC Browser",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      return {
        name: "Maxthon",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      return {
        name: "Epiphany",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/puffin/i],
    describe(ua) {
      return {
        name: "Puffin",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:puffin)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      return {
        name: "Sleipnir",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      return {
        name: "K-Meleon",
        version: getBrowserVersion(
          [commonVersionIdentifier, /(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i],
          ua
        ),
      };
    },
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      return {
        name: "WeChat",
        version: getBrowserVersion(
          [/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier],
          ua
        ),
      };
    },
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      return {
        name: /qqbrowserlite/i.test(ua) ? "QQ Browser Lite" : "QQ Browser",
        version: getBrowserVersion([/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier], ua),
      };
    },
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      return {
        name: "Internet Explorer",
        version: getBrowserVersion([/(?:msie |rv:)(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/\sedg\//i],
    describe(ua) {
      return {
        name: "Microsoft Edge",
        version: getBrowserVersion([/\sedg\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      return {
        name: "Microsoft Edge",
        version: getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua),
      };
    },
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      return {
        name: "Vivaldi",
        version: getBrowserVersion([/vivaldi\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      return {
        name: "SeaMonkey",
        version: getBrowserVersion([/seamonkey\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      return {
        name: "Sailfish",
        version: getBrowserVersion([/sailfish\s?browser\/(\d+(\.\d+)?)/i], ua),
      };
    },
  },
  {
    test: [/silk/i],
    describe(ua) {
      return {
        name: "Amazon Silk",
        version: getBrowserVersion([/silk\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/phantom/i],
    describe(ua) {
      return {
        name: "PhantomJS",
        version: getBrowserVersion([/phantomjs\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      return {
        name: "SlimerJS",
        version: getBrowserVersion([/slimerjs\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      return {
        name: "BlackBerry",
        version: getBrowserVersion([commonVersionIdentifier, /blackberry[\d]+\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      return {
        name: "WebOS Browser",
        version: getBrowserVersion([commonVersionIdentifier, /w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/bada/i],
    describe(ua) {
      return {
        name: "Bada",
        version: getBrowserVersion([/dolfin\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/tizen/i],
    describe(ua) {
      return {
        name: "Tizen",
        version: getBrowserVersion([/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, commonVersionIdentifier], ua),
      };
    },
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      return {
        name: "QupZilla",
        version: getBrowserVersion([/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier], ua),
      };
    },
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      return {
        name: "Firefox",
        version: getBrowserVersion([/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/electron/i],
    describe(ua) {
      return {
        name: "Electron",
        version: getBrowserVersion([/(?:electron)\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      return {
        name: "Miui",
        version: getBrowserVersion([/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/chromium/i],
    describe(ua) {
      return {
        name: "Chromium",
        version: getBrowserVersion([/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, commonVersionIdentifier], ua),
      };
    },
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      return {
        name: "Chrome",
        version: getBrowserVersion([/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },
  {
    test: [/GSA/i],
    describe(ua) {
      return {
        name: "Google Search",
        version: getBrowserVersion([/(?:GSA)\/(\d+(\.?_?\d+)+)/i], ua),
      };
    },
  },

  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      return {
        name: "Android Browser",
        version: getBrowserVersion([commonVersionIdentifier], ua),
      };
    },
  },

  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(ua) {
      return {
        name: "PlayStation 4",
        version: getBrowserVersion([commonVersionIdentifier], ua),
      };
    },
  },

  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      return {
        name: "Safari",
        version: getBrowserVersion([commonVersionIdentifier], ua),
      };
    },
  },

  /* Something else */
  {
    test: [/.*/i],
    describe(ua) {
      /* Here we try to make sure that there are explicit details about the device
       * in order to decide what regexp exactly we want to apply
       * (as there is a specific decision based on that conclusion)
       */
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search("\\(") !== -1;
      const regexp = hasDeviceSpec
        ? regexpWithDeviceSpec
        : regexpWithoutDeviceSpec;
      return {
        name: getFirstMatch(regexp, ua),
        version: getSecondMatch(regexp, ua),
      };
    },
  },
];

export default browsersList;
