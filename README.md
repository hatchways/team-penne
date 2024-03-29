<div align="center">
<img src="./client/src/assets/logo.png"/>

## The Deal Tracker

</div>

### The website that tracks products on a user's wishlist, and notifies them on any price changes.

**Contents:**

- [Core Functionality](#core-functionality)
  - [List Functionality](#list-functionality)
  - [Product Functionality](#product-functionality)
  - [Receiving Notifications](#receiving-notifications)
- [Additional Features](#additional-features)
  - [Followers](#followers)
- [How to Run](#how-to-run)
- [Authors](#authors)

## Core Functionality

The User has to create a list (if one doesn't already exist), and add the products that they want to track.\
Once added, the user will get notifications to any price changes to the products in their lists.

**NOTE:** Drop down list not appearing in following gifs. Drop down list includes all of the current user's lists.

### List Functionality

#### Creating a new List

Click on the "Add new list" card, at the end of the list of all your cards, and fill out the dialog that opens up.

**NOTE**: On clicking on the "Add a cover" box in the dialog, the gif below doesn't show the file explorer that opens up, where the image is retrieved from.

<div align="center"> <img src="./readme_assets/create_new_list.gif"/> </div>

[Back to top](#the-deal-tracker)

#### Deleting a list

#TODO\
[Back to top](#the-deal-tracker)

### Product Functionality

#### Adding Products to Lists

Click on "Add item" straight from the dashboard after inputting a valid URL where it says "place your link here"

<div align="center"> <img src="./readme_assets/add_item_from_dash.gif"/></div>

**OR** Click on "Add new item" after clicking on a list, and do the same.

<div align="center"> <img src="./readme_assets/add_item_from_list.gif"/></div>

[Back to top](#the-deal-tracker)

#### Removing Products from Lists

Click on "Remove" over a certain product in a list to permanently remove that product from that list.

<div align="center"> <img src="./readme_assets/delete_product_example.gif"/></div>

[Back to top](#the-deal-tracker)

### Receiving Notifications

Whenever one of the products on any of the lists goes on sale, the user gets a notification relaying that information. The product is then also updated in the list that it's in.

<div align="center"> <img src="./readme_assets/notifications.gif"/></div>

[Back to top](#the-deal-tracker)

## Additional Features

### Followers

#TODO

[Back to top](#the-deal-tracker)

## How to Run

**In the main "team-penne" folder:**

To run the application **in dev mode**, type `npm run dev` or `yarn run dev`.\
To **not run in dev mode**, type `npm run dealsmate` or `yarn run dealsmate`.

_Alternatively_\
Type `cd client` followed by `npm start` to only start the client.\
Followed by:\
Type `cd server` followed by `npm run start` to only start the server **OR**\
Type `cd server` followed by `npm run dev` to only start the server in dev mode.

[Back to top](#the-deal-tracker)

## Authors

Sagnik Roy\
Ricardo Brites

[Back to top](#the-deal-tracker)
