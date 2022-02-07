// Type definitions for Bowser v2
// Project: https://github.com/lancedikson/bowser
// Definitions by: Alexander P. Cerutti <https://github.com/alexandercerutti>,

export = Bowser;
export as namespace Bowser;

declare namespace Bowser {
  /**
   * Creates a Parser instance
   * @param {string} UA - User agent string
   * @param {boolean} skipParsing
   */

  function getParser(UA: string, skipParsing?: boolean): Parser.Parser;

  /**
   * Creates a Parser instance and runs Parser.getResult immediately
   * @param UA - User agent string
   * @returns {Parser.ParsedResult}
   */

  function parse(UA: string): Parser.ParsedResult;

  /**
   * Constants exposed via bowser getters
   */

  namespace Parser {
    interface Parser {
      constructor(UA: string, skipParsing?: boolean): Parser.Parser;

      /**
       * Get parsed browser object
       * @return {BrowserDetails} Browser's details
       */

      getBrowser(): BrowserDetails;

      /**
       * Get browser's name
       * @param {Boolean} [toLowerCase] return lower-cased value
       * @return {String} Browser's name or an empty string
       */

      getBrowserName(toLowerCase?: boolean): string;

      /**
       * Get browser's version
       * @return {String} version of browser
       */

      getBrowserVersion(): string;

      isMobile(): boolean;

      getUA(): string;

      /**
       * Parse full information about the browser
       * @returns {Parser.Parser}
       */

      parse(): Parser.Parser;

      /**
       * Get parsed browser object
       * @returns {BrowserDetails}
       */

      parseBrowser(): BrowserDetails;

      isBrowser(browserName: string, includingAlias?: boolean): boolean;

      /**
       * Get parsed result
       * @return {ParsedResult}
       */

       getResult(): ParsedResult;

    }

    interface ParsedResult {
      browser: BrowserDetails;
    }

    interface Details {
      name?: string;
      version?: string;
    }

    type BrowserDetails = Details;

    interface checkTree {
      [key: string]: any;
    }
  }
}
