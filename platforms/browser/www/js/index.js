/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// function that is called and outputs result in EUR 
function convertUSD(){
    
    var num1 = Number(document.getElementById("num1").value);
    
    // Extracting especifically rate
    var result = num1 * 0.90;
    
    // Calling the function in charge of contacting
    // the external API
    convert();
    
    // Printing to front end
    var textToDisplay = "EUR: " + result;
    document.getElementById('result').innerHTML = textToDisplay;
    
    //document.getElementById("result").innerHTML = result;
    //console.log(result);
    
}

// function that is called and outputs result in USD
function convertEUR(){
    
    var num1 = Number(document.getElementById("num1").value);
    
    // Extracting especifically rate
    var result = num1 * 1.12;
    
    // Calling the function in charge of contacting
    // the external API
    convert();
    
    // Printing to front end
    var textToDisplay = "USD: " + result;
    document.getElementById('result').innerHTML = textToDisplay;
    
    //document.getElementById("result").innerHTML = result;
    //console.log(result);
    
}

// Function in charge of contacting the external API
function convert() {
   
    // The variable http is an instance of the class XMLHttpRequest
    // this is a library included in JS that helps with HTTP requests
    var http = new XMLHttpRequest()
    
    // The end point of the API
    // "convert" endpoint - convert any amount from one currency to another
    // using real-time exchange rates
    const url = 'http://apilayer.net/api/convert?access_key=28c13b8f52f315a061b7e186884ddd32&from=USD&to=EUR&amount=25&format=1';

    // Preparing the request
    http.open('GET', url);
    // Sending the request
    http.send();
    // The we obtain the response, then we can do something with it
    http.onreadystatechange = (e) => {
		// Getting the response in a text format
        var response = http.responseText;
		// converting the response from a text format to a json format
        var responseJSON = JSON.parse(response); 
        
        // printing both results to the console to compare
        console.log(responseJSON);
        console.log(response);
        
        // extracting one piece of information from the response
        var country = responseJSON.results[0];
        document.getElementById('pos').innerHTML = country;
            
    }
}
