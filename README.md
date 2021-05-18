# Pogo Coding Challenge

In the Pogo mobile app, we integrate with Plaid to pull a user's purchase data and reward them with points. The core mechanism in the Pogo mobile is app is the Claim Feed. This is a feed of recent purchases made by the user and each row in the claim feed has the purchase details as well as the amount of points earned. Users can earn points by pressing the claim button on each purchase. 

From the Pogo Mobile App: 
![image](https://user-images.githubusercontent.com/5782586/118692627-439b4400-b7d8-11eb-865a-b85b9c976192.png)


# Your Task

In this coding challenge, you will work with this MERN (Mongo, Express, React, Node) web app to allow users to earn points by claiming their recent transactions. The current app supports user creation and authentication. It also supports the linking and un-linking of Plaid accounts in their sandbox environment (sandbox API keys are included in the repo). Your task is to replicate the behavior we see in the Pogo app. You'll build your component in the "Purchases to Claim" section.

![image](https://user-images.githubusercontent.com/5782586/118696311-28323800-b7dc-11eb-8c11-de6db6677692.png)

By the end of this exercise, a user should be able to: 
1. See the total number of points they have earned 
2. View eligible purchases from the last 60 days that are available to claim. 
3. Each eligible purchase should have a point value associated with it and a user should be able claim points associated with each purchase.
4. The user should see their point total increase as they claim more purchases. 

How to determine if a transaction/purchase is eligible for points:
1. The `amount` field is > 0
2. The category of the purchase is not one of the following: Bank Fees, Interest, Transfer, Taxes, Payments

Points System: For an eligible purchase, if the amount is below $25 they earn 5 points, otherwise they earn 10 points. 

Hint: the only API you'll need to use is the Plaid Transactions endpoint to fetch transactions for a linked Plaid Account.

To link an account via the sandbox environment: 
1. Click on Link Account button
2. Pick any bank account logo from the Plaid interface.
3. Username is `user_good`
4. Password is `pass_good`

Out of scope: 
1. Supporting multiple Plaid linked accounts
2. Making it look pretty, responsive etc. 

The focus of this exercise is to see how you can build something functional end-to-end. By the end of this, you will have created or modified data models, apis and views/components. Please add unit tests only to the code you're introducing. 

Feel free to use any publicly available resources, libraries, etc. that helps you accomplish this coding challenge!

Ran into issues or have questions? Email shikhar@joinpogo.com

<br>

## Starting the App

<br>

- ## Install Docker for your OS

  [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

- ## Install docker-compose for your OS

  [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

- ## Clone the repository

```bash
    git clone https://github.com/shikharmohan/PogoCodingChallenge.git

    cd PogoCodingChallenge

```
- ## Install dependencies
```bash
    npm i && cd client && npm i && cd ..
```

- ## Starting development environment

```bash
    docker-compose up --remove-orphans --build
```
>   to stop `docker-compose up` use <kbd>Ctrl</kbd> + <kbd>c</kbd>

- ## Stopping development environment

```bash
    docker-compose down -v
```
> `docker-compose down` stops containers and removes containers, networks, volumes, and images
created by `docker-compose up`.

- ## Running tests

Tests need to be run in the project's root directory for the express backend and in the `client` directory for the react frontend. Test files should have the `.test.js` extension. 
```bash
   npm run test && cd client && npm run test && cd ..
```

<br><br>
