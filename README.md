[Plate-Map](https://plate-map-app.herokuapp.com/)
======

### Technologies Used

This app was created with:

- Ruby on Rails
- ReactJS
- PostgresSQL
- NodeJS
- D3.JS
- [React Router](https://reacttraining.com/react-router/)
- [React Bootstrap](https://react-bootstrap.github.io/)

This app is:

- Deployed on [Heroku](https://plate-map-app.herokuapp.com/)
- Hosted on GitHub. [See API Repo](https://github.com/mstone89/plate-map-api).


### About Plate-Map

Plate-Map is a one-model application that generates and stores plate assay data. It is designed to assist in planning out plate assays based on a number of inputted samples. The app generates combinations for diluting and replicating samples based on input, as well as a visual grid (built with D3) of how those samples, dilutions, and replicates might look on a 96 well plate format. Users can store chosen plate combinations for later use, and delete them as needed.


### Approach

A 96 well plate can have any number of samples tested. Currently, this app allows for up to 16 testable samples.

These samples can be duplicated (AKA replicated) a certain number of times. They can also be diluted a certain number of times as well.
In addition, samples that are replicated and diluted are also tested against standard curve samples. It is also a good practice to leave some wells in the plate empty or "blank."

With all of these factors, and given a variable number of samples to test, it can be difficult to determine how many times a sample can be replicated and diluted, and how many times the standard curve samples can be replicated as well.

To tackle this, a few JS algorithms were created to generate plate combinations. A final set of data is created using each combination of samples, dilutions, replicates, blank wells, and standard curve replicates, which is then used to create a visual of how the plate map might look with a particular combination.

This app is meant to take the guesswork out of creating plate assays when you're not sure how many times you can replicate or dilute a given number of samples.


### Wireframe

![alt-text](https://github.com/mstone89/plate-map-frontend/blob/master/plate-map-wireframe.png)


### User Stories

> As a user, I can input a sample number and see plate combinations.

> As a user, I can choose a plate combination and see a visual of that plate.

> As a user, I can save a chosen plate combination for later use.

> As a user, I can sort combinations by dilutions, replicates, standard curve replicates, or well count.

> As a user, I can see my saved plates in a list.

> As a user, I can choose a saved plate and see the visual of that plate.

> As a user, I can delete saved plates.


### Future Improvements

- Show a small rendering of how the grid will look within the list of combinations (show a preview without clicking a combo).
- Right now, 2 possible renderings of the grid are shown. For a future improvement, all more options where samples are grouped together rather than shown in a horizontal or vertical line.
- Export full dataset for a particular combination into a .csv file.
