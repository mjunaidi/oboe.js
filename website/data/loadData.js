

function expandJsonTemplate( json ) {
            
   // traveerse json recursively, replacing some special tokens with random values:
   
   function replacePlaceholders(templateString){
      return templateString.replace(
         "{{Boolean}}", 
         function(){ return Math.random() > 0.5 }
      );
   }
   
   for( var i in json ) {
   
      switch( json[i].constructor.name ) {
         
         case "Object":
         case "Array":         
            json[i] = expandJsonTemplate(json[i]);
            break;
         
         case "String":
            json[i] = replacePlaceholders( json[i] );
            break;                       
      }
   }
                  
   return json;         
}

/** I can't remember if Javascript objects are deterministic in their ordering, but in practice
 *  they always output to JSON in the order that the keys were added. Make things a bit more
 *  interesting by randomising that order
 */
function randomiseMapOrder(map) {
   var randomkeys = _.shuffle( _.keys(map) ),
       newMap = {};
   
   _.each( randomkeys, function( key ) {
      newMap[key] = map[key];      
   });
   
   return newMap;
}      

function loadThrottled(fullData, dripSize, dripInterval, callback) {
      
   var cursorPosition = 0;         
      
   var intervalId = window.setInterval(function(){
   
      var nextDrip = fullData.substr(cursorPosition, dripSize);         
      
      cursorPosition += dripSize;
      
      //console.log('next drip is', nextDrip);
               
      callback(nextDrip);                     
      
      if( cursorPosition >= fullData.length ) {
         window.clearInterval(intervalId);
      }                                                        

   }, dripInterval);
}

