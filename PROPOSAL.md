# Game Description
## Who's That Pokemon?

This game, _**"Who's That Pokemon?"**_, will mirror the game used in the actual Pokemon show. Here's a detailed description of how it works:

### **Basic Elements**

#### *Multiple Choice Options:*

There will be four mutiple choice options where the player will choose which pokemon the shadowed figure is. 

#### *Life Count:*

The player will have 4 lives, every time the player's choice is wrong, one life is deducted, the game will reveal the pokemon and move on to the next round. Once all lives are gone, the game will be over.

### **Game Mechanics**

#### *Start Button:*

There will be start button as the starter screen.

#### *Restart Button:*

There will be a restart button once the player is done with the game whether they won or lost.

#### *Pokemon Figure:*

Every time a pokemon is revealed, the sound the pokemon makes will play and the pokemon will go from a shadow to the actual picture of the pokemon.

#### *Losing the game:*

When the player loses the game, the game will produce a game over message saying "I guess you don't know who the pokemon is, better luck next time trainer". With the message there will also be some sort losing audio, preferably the losing audio used in the actual Pokemon games.

#### *Winning the game:*

When the player wins the game, the game will produce a winner message saying "Looks like you're ready to catch some pokemon, good work!". With the message there will also be some sort of winning audio, preferably the winning audio used in the actual Pokemon games.

#### *Life Count:*

There will be life count in the corner of the screen. Each time a player deducts a life, there will be an audio of some sort that plays signaling to the user that the life has deducted. Even if winner does not lose any lives, the game will only have 5 rounds before the game is over.

## **Technologies Used**

Vanilla HTML, CSS and Javascript (MAYBE ANOTHER LANGUAGE IF IM FEELING SPICY)

## MVP User Stories

* As a user, I want to see the start button.

* As a user, I want to see my life count so I know how much lives I have before the game is over.

* As a user, I want to be able to see in the life score when I lose a life.

* As a user, I want to see who the pokemon is once the round is over.

* As a user, I want to restart the game if I want to play again.

* As a user, I want to see if I won or not based on the message shown once the game is over.

## Stretch Goals

* As a user, I want to hear the sound effects of the pokemon once the pokemon is revealed.
* As a user, I want to hear the sound effects when I lose a life so I am notifed and focused on winning.
* As a user, I want to hear when I win or lose once the game is over, with either cheering or booing.

## Pseudocode:
```
Create HTML and CSS scaffolding
    HTML has three sections: display game start screen, display game board, display end screen. When user presses start use JS to change css classes to hide the starting html and show the game html, when the game ends hide the game board and show the end screen.
Javascript
    Define variables needed
    Create classes to seperate data recieved from user and objects to control.
    Create methods to control the pokemon figure, life count, buttons.
    Create an audio method for the winner message, game over message and the appearance of the pokemon.
    Use open source Poke API to loop through when choosing pokemon and extract the data.
    Create loop for players choice
        if user choice wrong
            deduct life count
            play audio for deduction of life count
            display pokemon 
            play audio of pokemon sound
        else if user choice right
            play sparkle sound
            display pokemon 
            play audio of pokemon sound
    create a if/else statement for winner and losing message