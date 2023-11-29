
var httpHome = 'http://localhost:3000';
var httpLogin = httpHome + '/login';
var email = 'peter@abv.bg';
var pswd = '123456';

const{test,expect} = require('@playwright/test');

test('Verify "All Books" link is visible', async({page}) => 
{
    await page.goto(httpHome);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true); 
});

test( 'Verify "Login" button is visible', async({page}) =>  
{
    await page.goto(httpHome);
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test( 'Verify "Register" button is visible', async({page}) =>  
{
    await page.goto(httpHome);
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});

async function LogIn(PageAddress,UserEmail,UserPassword) {
    await page.goto(PageAddress);
    await page.fill('input[name="email"]', UserEmail);
    await page.fill('input[name="password"]', UserPassword);
    await page.click('input[type="submit"]');
    return page;
  }

test('Verify "All Books" link is visible after user login', async({page}) => 
    {
        await page.goto(httpLogin);
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', pswd);
        await page.click('input[type="submit"]');
        const allBooksLink = await page.$('a[href="/catalog"]');
        const isAllBooksLinkVisible = await allBooksLink.isVisible();
        expect(isAllBooksLinkVisible).toBe(true); 
    });

test('Verify "My Books" link is visible', async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', pswd);
    await page.click('input[type="submit"]');
    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();
    expect(isMyBooksLinkVisible).toBe(true); 
});

test('Verify "Add Books" link is visible', async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', pswd);
    await page.click('input[type="submit"]');
    const addBooksLink = await page.$('a[href="/create"]');
    const isAddBooksLinkVisible = await addBooksLink.isVisible();
    expect(isAddBooksLinkVisible).toBe(true); 
});

test("Verify the User's email address is visible", async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', pswd);
    await page.click('input[type="submit"]');
    await expect(page.getByText(email)).toBeVisible();
});

test("Verify the Login Page", async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', pswd);
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect (page.url()).toBe(httpHome + "/catalog");
});

test("Verify the Form with empty input fields", async({page}) => 
{
    await page.goto(httpLogin);
    await page.click('input[type="submit"]');
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect (page.url()).toBe(httpHome + "/login");
});

test("Submit the form with empty email input field", async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', "");
    await page.fill('input[name="password"]', pswd);
    await page.click('input[type="submit"]');
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect (page.url()).toBe(httpHome + "/login");
});

test("Submit the form with empty password input field", async({page}) => 
{
    await page.goto(httpLogin);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "");
    await page.click('input[type="submit"]');
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect (page.url()).toBe(httpHome + "/login");
});