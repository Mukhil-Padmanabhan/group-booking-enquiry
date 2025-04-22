# Group Booking Enquiry Form

A multi-lingual, accessible, mobile-first **group booking enquiry form** built using **Next.js App Router**, **TypeScript**, **Zod**, **React Hook Form**, **Tailwind CSS**, and **Prisma**. Supports real-time form progress, draft saving, dark mode and robust test coverage with **Jest** and **Playwright**.

---

## Table of Contents

- [Table of Contents](#-table-of-contents)
- [Tech Stack](#️-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Stretch Goals](#-stretch-goals)
- [Future Improvements](#-future-improvements)


---

## Tech Stack

- Next.js (App Router)
- Jest (Unit)
- TypeScript
- REST API
- ESLint + Prettier
- GitHub Actions
- Prisma (PostgreSQL)
- Playwright (E2E) 
- Tailwind CSS   
- Zod
- Lighthouse (manual) 
- Husky + Lint-staged 

## Features

- Multi-step form with section validation and draft saving
- Internationalization: supports `en` and `de`
- Autosave form data to `localStorage`
- Light/Dark theme toggle
- Fully accessible with keyboard nav, ARIA, color contrast
- XSS, CSRF-safe, form validation with `Zod`
- Submission to secure backend via API route
- Jest + Playwright test suite
- Real-time progress bar with smart validation
- Toast notifications for feedback

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Mukhil-Padmanabhan/group-booking-enquiry.git
cd group-booking-enquiry
```
### 2. Install Dependencies
```
npm install
```
### 3. Set Up Environment Variables
```
DATABASE_URL="postgresql://user:password@localhost:5432/groupbookings"
```
### 4. Setup Prisma DB
```
npx prisma generate
npx prisma migrate dev --name init
```
### 4. Run Dev Server
```
npm run dev
```
Visit: http://localhost:3000/en/groups/form

## Testing
### Unit Tests (Jest)
```
npm run test:coverage
```
![COV](./public/test-cov.png)
### E2E Tests (Playwright)
```
npx playwright install
npx playwright test __e2e__/form.spec.ts
```
![Playwright](./public/playwright-test.png)

### Manual Tests
A set of 45 different test cases were identified, documented, tested and reported. It can be found here - [Manual Tests](./public/manual_test_cases.pdf)


#### Screen recording
 ![web-vitals](./public/Automation_Video.gif)



### Web vitals (Lighthouse)
![web-vitals](./public/web-vital.png)
Report - https://pagespeed.web.dev/analysis/https-group-booking-enquiry-two-vercel-app/byyhy9ru5h?form_factor=mobile

 ### Prisma Studio

To visually explore the database during development:

```bash
npx prisma studio
```

## Deployment 
Deployed the app through Vercel - https://group-booking-enquiry-two.vercel.app/en/groups/form

Github actions added for CI - https://github.com/Mukhil-Padmanabhan/group-booking-enquiry/blob/main/.github/workflows/ci.yml

Configured husky as pre-commit hook - https://github.com/Mukhil-Padmanabhan/group-booking-enquiry/blob/main/.husky/pre-commit

## Stretch Goals
- Real-time form draft saving
- Dark mode with theme persistence
- Custom Toaster for all feedback
- Progress tracking based on form sections
- Language Switcher with i18n routing
- Jest + Playwright in CI workflow
- Typeahead for Hotels


## Future Improvements
- Auto-complete with debounce
- Add Recaptcha v3
- Email notifications on form submission
- Admin dashboard for booking view
- Form autosave sync to backend DB as draft
- Form resumption via magic link (email)
 
 