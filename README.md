# React News-Reader
A simple [news reader app](http://news-reader.sarcastyx.surge.sh) written in React and using [NewsAPI](https://newsapi.org). The app is currently hosted on [Surge.sh](https://surge.sh). 

This app was mostly written as a React learning exercise.

### Pre requisites
You need to have the latest version of [Node.js](https://nodejs.org) installed. This should also install npm.

### To run this app locally.
* Create an account with [NewsAPI](https://newsapu.org) to get an API Key.
* Download or Clone the source code from the repo.
```
git clone https://github.com/sarcy/news-reader.git react-news-reader
```
* Open the source code in your favourite text editor and update **Utils/constants.js** with the News API Key:
```
NEWSAPI_KEY       : '[YOUR NEWS API KEY]',
```
* Open a Terminal window and navigate to the directory
```
cd react-news-reader
```
* Run the following command to install all the dependencies:
```
npm install
```
* To test the changes locally use the command below and navigate to http://localhost:3000:
```
npm start
```
