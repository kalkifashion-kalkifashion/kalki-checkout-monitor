# Kalki Fashion checkout monitor

Synthetic customer journeys for the India, United States, United Kingdom, and Global Kalki Fashion storefronts. The monitor validates product selection, Add to Cart, cart contents, checkout launch, regional contact/shipping forms, shipping availability, and payment-page readiness. It never places an order.

## Coverage

The configuration creates 16 Playwright projects: four storefronts × desktop/mobile Chromium × guest/signed-in. Signed-in projects skip clearly when that storefront's credential pair is absent. CI uses two workers and one bounded retry, retaining the original failure evidence.

| Store | URL | Product variable | Shipping variable |
|---|---|---|---|
| India | `https://in.kalkifashion.com/` | `KALKI_IN_PRODUCT_URL` | `KALKI_IN_SHIPPING_JSON` |
| United States | `https://www.kalkifashion.com/` | `KALKI_US_PRODUCT_URL` | `KALKI_US_SHIPPING_JSON` |
| United Kingdom | `https://uk.kalkifashion.com/` | `KALKI_UK_PRODUCT_URL` | `KALKI_UK_SHIPPING_JSON` |
| Global | `https://global.kalkifashion.com/` | `KALKI_GLOBAL_PRODUCT_URL` | `KALKI_GLOBAL_SHIPPING_JSON` |

## Local setup

1. Install Node.js 22 or newer, run `npm ci`, then `npx playwright install chromium`.
2. Copy `.env.example` to `.env` (it is ignored by Git).
3. Choose an inexpensive, stable in-stock product for each store. If a URL is omitted, the monitor conservatively discovers a product and records its URL in the report.
4. Supply a business-approved synthetic regional address for each storefront tested.

Each shipping value is one JSON object:

```json
{"firstName":"Synthetic","lastName":"Shopper","email":"checkout-monitor@example.com","phone":"APPROVED_TEST_NUMBER","address1":"APPROVED_TEST_ADDRESS","address2":"","city":"CITY","state":"STATE_OR_REGION","postalCode":"POSTAL_CODE","country":"COUNTRY_LABEL_SHOWN_AT_CHECKOUT"}
```

Use only approved synthetic data, never scraped or real customer information. A unique plus-address is generated per run. Run `npm run test:guest`, `npm run test:signed-in`, or `npm test`; view results with `npx playwright show-report`.

## Dedicated test accounts

Create business-controlled customer accounts. Store credentials only in environment variables or GitHub Actions secrets: `KALKI_IN_EMAIL`/`KALKI_IN_PASSWORD`, `KALKI_US_EMAIL`/`KALKI_US_PASSWORD`, `KALKI_UK_EMAIL`/`KALKI_UK_PASSWORD`, and `KALKI_GLOBAL_EMAIL`/`KALKI_GLOBAL_PASSWORD`. Never paste credentials into code, logs, screenshots, PRs, or chat.

## GitHub Actions setup

In **Settings → Secrets and variables → Actions**:

1. Under **Variables**, add the four `KALKI_*_SHIPPING_JSON` values and, once chosen, the four `KALKI_*_PRODUCT_URL` values.
2. Under **Secrets**, add the optional eight signed-in credential values.
3. Create a Slack incoming webhook and save it as the `SLACK_WEBHOOK_URL` secret.
4. Open **Actions**, enable workflows if prompted, select **Checkout monitor**, and run it manually once.

The workflow runs hourly at minute 17. Failure alerts contain storefront/project, severity/category, last confirmed step, error, run URL, and artifact guidance. A success alert is sent only after a failed run recovers. Without the Slack secret, monitoring still runs without notifications.

Download the `checkout-monitor-artifacts-*` artifact for the HTML report, traces, screenshots, and videos. Open traces with `npx playwright show-trace path/to/trace.zip`.

## No-purchase safety boundary

The test stops after payment UI readiness. It enters no card, bank, or wallet data. A code-level denylist blocks Place Order, Pay Now, Complete Order/Purchase, Submit Order, Confirm Order/Payment, and Buy Now controls; unlabeled click targets are rejected. If readiness requires a potentially chargeable action, the monitor fails closed.

## Operations and maintenance

Failures are categorized by customer stage and include the last confirmed step. One failed synthetic run indicates a symptom, not a conversion-impact root cause; review evidence and reproduce before escalation.

Cookie banners, region selectors, CAPTCHA, bot protection, inventory changes, A/B tests, payment iframes, and redesigns can interfere. Keep products stocked, rotate test credentials, and add narrow overrides in `src/sites.ts` only after confirming markup differences. Do not weaken cart, shipping, payment, or safety assertions to hide transient failures.
