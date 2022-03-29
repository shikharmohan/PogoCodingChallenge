# Pogo Coding Challenge

## Context
In the Pogo mobile app, we integrate with Plaid to pull a user's purchase data and reward them with points. The core mechanism in the Pogo mobile is app is the Claim Feed. This is a feed of recent purchases made by the user and each row in the claim feed has the purchase details as well as the amount of points earned. Users can earn points by pressing the claim button on each purchase. 

From the Pogo Mobile App: 
![image](https://user-images.githubusercontent.com/5782586/118692627-439b4400-b7d8-11eb-865a-b85b9c976192.png)


# Your Task

In this coding challenge, you will work with this MERN (Mongo, Express, React, Node) web app to allow users to earn points by claiming their recent transactions. 

**Your task is to replicate the behavior we see in the Pogo app.** You'll build your component in the "Purchases to Claim" section.

![image](https://user-images.githubusercontent.com/5782586/118696311-28323800-b7dc-11eb-8c11-de6db6677692.png)

## Requirements
By the end of this exercise, a user should be able to do the following: 

- Purchases
  - [ ] View eligible purchases from the last 60 days that are available to claim.
  - [ ] Each eligible purchase should have a point value associated with it and a user should be able to claim points associated with each purchase.
  - [ ] Claimed purchase should disappear from the list of purchases to claim.
  - [ ] Users should only be able to claim transactions that belong to their linked plaid accounts. 
- Points 
  - [ ] The user should see their total claimed points
  - [ ] The user should see their point total increase as they claim more purchases.

### Bonus/Nice to haves:
- [ ] Supporting multiple Plaid linked accounts
- [ ] Making the app look pretty, responsive etc. 
- [ ] Viewing already claimed purchases

### What has been built for you already

- User creation and authentication.
- Linking and un-linking of Plaid accounts in their sandbox environment (sandbox API keys are included in the repo)

## Tips

- How to determine if a transaction/purchase is eligible for points:
  1. The `amount` field is `> 0`
  2. The category of the purchase is not one of the following: `Bank Fees, Interest, Transfer, Taxes, Payments`

- Points System: For an eligible purchase, if the amount is below $25 they earn 5 points, otherwise they earn 10 points. 

- Users should not be rewarded points for purchases that they didn't make or for purchases not tied to accounts they've linked.

- Hint: the only API you'll need to use is the Plaid Transactions endpoint to fetch transactions for a linked Plaid Account.

To link an account via the sandbox environment: 
1. Click on Link Account button
2. Pick any bank account logo from the Plaid interface.
3. Username is `user_good`
4. Password is `pass_good`

By the end of this, you will have created or modified data models, apis and views/components. The actions taken by the user and all data should be persisted in Mongo. 

Feel free to use any publicly available resources, libraries, etc. that helps you accomplish this coding challenge!

Run into issues or have questions? Email shikhar@joinpogo.com

<br>

## Starting the App

<br>

- ## Install Docker for your OS

  [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

- ## Install docker-compose for your OS

  [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

- ## Clone the repository (don't fork)

```bash
    git clone https://github.com/shikharmohan/PogoCodingChallenge.git

    cd PogoCodingChallenge

```
- ## Install dependencies
```bash
    npm i
```

- ## Starting development environment

```bash
    docker-compose up --remove-orphans --build
```
>   to stop `docker-compose up` use <kbd>Ctrl</kbd> + <kbd>c</kbd>

The app is served on port 3000, so if you navigate to localhost:3000, you should see the app. 
_The api is hosted on port 8080, but the frontend hot module replacement will not work there, if you see the webapp but your frontend changes don't refresh the page automatically, check if you accidentally on port 8080 in the browser._

- ## Stopping development environment

```bash
    docker-compose down -v
```
> `docker-compose down` stops containers and removes containers, networks, volumes, and images
created by `docker-compose up`.

<br><br>