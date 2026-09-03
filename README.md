# El Pollo Loco

A 2D jump-and-run browser game built with Vanilla JavaScript and the HTML5 Canvas API.

The project was created as a learning project with a strong focus on object-oriented JavaScript. It combines character movement, animations, collision detection, enemies, collectibles and interactive game controls within a class-based architecture.

## Preview

## Gameplay Demo

[![Watch the El Pollo Loco gameplay demo](./assets/Screenshot%202026-09-04%20011433.png)](https://www.youtube.com/watch?v=ceiBZy0hrBY)

[▶ Watch the full gameplay demo on YouTube](https://www.youtube.com/watch?v=ceiBZy0hrBY)

## Features

- 2D side-scrolling gameplay
- Player movement and jumping
- Throwable bottles
- Different enemies
- Endboss fight
- Collectible coins and bottles
- Health and resource status bars
- Character and enemy animations
- Collision detection
- Gravity and jumping mechanics
- Keyboard controls
- Touch controls for mobile devices
- Sound and background music
- Pause and start functionality
- Responsive behaviour for different screen sizes
- Multiple game objects and level elements

## Technologies

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas API
- Object-Oriented Programming
- DOM Manipulation
- Event Handling
- LocalStorage
- Responsive Web Design
- Vanilla JavaScript

No external game engine or frontend framework is used.

## Technical concepts

The game is structured around JavaScript classes representing the different elements of the game world.

The project includes practical experience with:

- object-oriented programming
- classes and inheritance
- reusable base classes for game objects
- rendering objects on an HTML5 canvas
- continuous rendering with `requestAnimationFrame()`
- character movement and simulated gravity
- collision detection between game objects
- animation using sequences of sprite images
- managing game state
- keyboard and touch input
- handling multiple enemies and collectibles
- sound management
- responsive controls for desktop and mobile devices

A class hierarchy is used to share common functionality between different game objects. For example, drawable and movable objects provide reusable behaviour that can then be extended by characters, enemies and throwable objects.

## Architecture

The application separates different parts of the game into separately dedicated classes and files.

Examples include:

- `World` – coordinates the game world, rendering and interactions
- `Character` – controls the player character
- `MovableObject` – provides shared movement and collision behaviour
- `DrawableObject` – provides common rendering functionality
- `ThrowableObject` – represents throwable bottles
- `Endboss` – implements the endboss behaviour
- `Level` – groups enemies, backgrounds and other level elements
- dedicated classes for enemies, status bars, collectibles and background objects

This structure was used to reduce duplicated logic and to practise inheritance and reusable object-oriented design.

## What I learned

This project helped me gain practical experience with:

- structuring a larger JavaScript application across multiple files
- applying object-oriented programming in a practical project
- modelling related objects through inheritance
- coordinating game state, rendering and user input
- implementing time-dependent processes and animations
- working with collision and movement logic
- developing interfaces for both keyboard and touch interaction
- debugging interactions between multiple independent components

## Project context

El Pollo Loco is an earlier learning project created during my software development training.

Its main purpose was to practise object-oriented programming with Vanilla JavaScript and to understand how a larger interactive application can be divided into reusable classes and components.

Since completing this project, I have continued working on more application-oriented software involving APIs, document processing, desktop applications, backend services and mobile development.
