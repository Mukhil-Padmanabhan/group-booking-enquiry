import { test, expect } from "@playwright/test";

test("Fill Contact + Booking + Room Details form", async ({ page }) => {
  // Navigate to the form
  await page.goto("https://group-booking-enquiry-two.vercel.app/en/groups/form");

  // -------- CONTACT DETAILS SECTION --------

  const titles = ["Mr", "Mrs", "Ms", "Dr"];
  const firstNames = ["Arjun", "Mei", "Yuki", "Jin", "Ravi", "Sana", "Haruto", "Aisha", "Min", "Nguyen"];
  const lastNames = ["Kumar", "Chen", "Tanaka", "Kim", "Patel", "Wang", "Nguyen", "Singh", "Yamada", "Park"];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const phone = `${Math.floor(Math.random() * 3) + 7}${Math.floor(100000000 + Math.random() * 900000000)}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;

  await page.selectOption('select[name="title"]', { label: randomTitle });
  await page.fill('input[name="firstName"]', firstName);
  await page.fill('input[name="lastName"]', lastName);
  await page.fill('input[name="phone"]', phone);
  await page.fill('input[name="email"]', email);

  await page.click('button:has-text("Continue")');

  // -------- BOOKING DETAILS SECTION --------

  await page
    .getByRole("group", { name: "What type of booker are you?" })
    .getByLabel("Personal")
    .check();

  await page
    .getByRole("group", { name: "Is your group staying for Business or Leisure?" })
    .getByLabel("Business")
    .check();

  await page.selectOption('select[name="visitReason"]', { label: "Event" });

  await page.fill('input[id="hotel"]', "Premier Inn London City");
  await page.keyboard.press("Enter");

  const today = new Date();
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + 1);
  const checkIn = `${checkInDate.getFullYear()}-${String(checkInDate.getMonth() + 1).padStart(2, "0")}-${String(
    checkInDate.getDate()
  ).padStart(2, "0")}`;

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + 2);
  const checkOut = `${checkOutDate.getFullYear()}-${String(checkOutDate.getMonth() + 1).padStart(2, "0")}-${String(
    checkOutDate.getDate()
  ).padStart(2, "0")}`;

  await page.fill('input[name="checkInDate"]', checkIn);
  await page.fill('input[name="checkOutDate"]', checkOut);

  await page.getByLabel("Premier Inn Breakfast").check();

  await page.click('button:has-text("Continue")');

  // -------- ROOM REQUIREMENTS SECTION --------

  await page.getByRole("button", { name: "Increase Single Occupancy" }).click();

  await expect(page.getByText("Total: 1 room(s)")).toBeVisible();

  await page.fill(
    "textarea",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  await page.getByRole("button", { name: "Submit Enquiry" }).click();

  await expect(page.getByText("SUCCESSFUL - Booking submitted successfully!")).toBeVisible();
});
