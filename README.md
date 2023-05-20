## Getting Started

First, run the development server:

```bash
pnpm install

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### About the challenge

In this challenge, you will build upon the application we have already developed in the track to implement a shopping cart that will use data from the Stripe API to fetch existing items and control the number of items a person wants to purchase through your application.

Here are the steps for the challenge:

- You will use the existing item listing in your application but add the functionality to add an item to the shopping cart on the product page.
- Save all the selected items in your application and display the number of items in the shopping cart.
- Send the stored shopping cart data to the checkout route, where you will generate a checkout session with the necessary `line_items`.
- To complete this challenge, you will need to perform some research to understand the Stripe API.
