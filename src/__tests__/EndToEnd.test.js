import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async() => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch({
      //      headless: false, //allows the testing process to be viewed
      //      slowMo: 250, //slows down the process by #-ms
      //      ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });
    
    test('An event element is collapsed by default', async () => {
     
        const eventDetails = await page.$('.event .details-view');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {

        await page.click('.event #details-btn');

        const eventDetails = await page.$('.event .details-view');
        expect(eventDetails).toBeDefined();
    });

    test('User can Collapse an event to hide its details', async () => {
        await page.click('.event #details-btn');
        const eventDetails = await page.$('.event .details-view');
        expect(eventDetails).toBeNull();
    });
});

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async() => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch({
      //      headless: false, //allows the testing process to be viewed
      //      slowMo: 250, //slows down the process by #-ms
      //      ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('When user hasn`t searched for a city, show upcoming events from all cities.', async () => {
        const countEvents = await page.$$eval('.event', (element) => element.length);
        expect(countEvents).toBe(2);
      });
    
      test('User should see a list of suggestions when they search for a city.', async () => {
        await page.type('.city', 'Berlin');
        const countCities = await page.$$eval('.suggestions li', (element) => element.length);
        expect(countCities).toBe(2);
      });
    
      test('User can select a city from the suggested list.', async () => {
        await page.reload();
        await page.type('.city', 'Berlin');
        await page.click('.suggestions li');
        const countEvents = await page.$$eval('.event', (element) => element.length);
        expect(countEvents).toBe(1);
      });
});    