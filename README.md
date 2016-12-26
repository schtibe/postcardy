# Postcardy [![Build Status](https://travis-ci.org/schtibe/postcardy.svg?branch=master)](https://travis-ci.org/schtibe/postcardy)

Ember application with a Node backend to easily send postcards via
the free Postcard Service of the Swiss Post, where you can send a postcard 
every 24 hours.

## Prerequisites

* Git
* Node.Js (with NPM)
* Bower
* Ember CLI
* A valid and verified [swiss post account](https://account.post.ch)


## Installation

* `git clone <repo-url>` Clone this repository
* `npm --prefix=backend install`  Install backend packages
* `npm --prefix=frontend install` Install frontend packages
* `cd frontend && bower install` Install bower packages


## Configuration

You need to go to `config` and copy the file `postconfig.json.example`
to `postconfig.json` and adjust the values in it:

* Insert the `username` and `password` of your post account in the corresponding 
    fields
* Insert your default recipient address in the other fields


## Running

You need to run both the frontend and backend in separate terminals
(or start them in the background):

* Run the backend with `npm --prefix=backend start`
* Run the frontend with `npm --prefix=frontend start`


## Issues

Probably quite many. To name a few:

* No input validation
* Missing tests
* Probably not very stable file handling

Help is very welcome!
