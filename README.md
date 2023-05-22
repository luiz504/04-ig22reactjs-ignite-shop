## Getting Started

First, create a file .env.local following the file .env.example using your Stripe Keys

Then, run the development server:

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

#### Incremental

Description of features not requested in the challenge but were made as research to seek knowledge:

- Now the user is able to select the quantity of each product and increment or decrement it as well.

#### Points to be addressed:

- How the app behaves when the Stribe isn't configured.
- How the app behaves when the products are not available and the user tries to checkout with them.
- It is a good learning app to start learning TRPC, even though it has only one API.
- Refactor the app directory and compare the changes.
