var NONSPACE = /[^\t ]/                                                                                                         
                                                                                                                                
function Line(previous, str)                                                                                                    {
  this.previous = previous                                                                                                      
  var firstNonspace = NONSPACE.exec(str)                                                                                        
  if (firstNonspace)                                                                                                            {
    firstNonspace = firstNonspace.index                                                                                         
    this.preSpaces = str.slice(0, firstNonspace)                                                                                
    this.code = str.slice(firstNonspace).trim()                                                                                 }
  else                                                                                                                          {
    this.preSpaces = str                                                                                                        
    this.code = ""                                                                                                              }
                                                                                                                                
  this.borderSymbols = ""                                                                                                       }
                                                                                                                                
                                                                                                                                
Line.prototype.pourWater = function()                                                                                           {
  // line endings (`{`, `;`) to the border                                                                                      
  while (true)                                                                                                                  {
    var lastChar = this.code.slice(-1)                                                                                          
    if (~['{', ';'].indexOf(lastChar))                                                                                          {
      this.code = this.code.slice(0, -1).trim()                                                                                 
      this.borderSymbols = lastChar + this.borderSymbols                                                                        }
    else break                                                                                                                  }
                                                                                                                                
                                                                                                                                
  // closing curlies and isaacs-semicolons to the border of the previous line                                                   
  if (this.previous)                                                                                                            
    while (true)                                                                                                                {
      var firstChar = this.code[0]                                                                                              
      if (~['}', ';'].indexOf(firstChar))                                                                                       {
        this.code = this.code.slice(1).trim()                                                                                   
        this.previous.borderSymbols += firstChar                                                                                }
      else break                                                                                                                }
                                                                                                                                }
                                                                                                                                
                                                                                                                                
Line.prototype.toString = function()                                                                                            {
  // must be such a high number in order to make it invisible on github for extra lulz :D                                       
  return padTo(this.preSpaces + this.code, 128) + this.borderSymbols                                                            }
                                                                                                                                
                                                                                                                                
                                                                                                                                
function padTo(str, len)                                                                                                        {
  while (str.length < len)                                                                                                      
    str += " "                                                                                                                  
  return str                                                                                                                    }
                                                                                                                                
                                                                                                                                
function flowerify(code)                                                                                                        {
  var lastLine = null                                                                                                           
  var lines = code.split('\n').map(function(line)                                                                               {
    return lastLine = new Line(lastLine, line)                                                                                  }
  )                                                                                                                             
  lines.forEach(function(line)                                                                                                  {
    line.pourWater()                                                                                                            }
  )                                                                                                                             
  return lines.map(function(line)                                                                                               {
    return line.toString()                                                                                                      }
  ).join('\n')                                                                                                                  }
                                                                                                                                
                                                                                                                                
console.log(flowerify(require('fs').readFileSync('/dev/stdin', 'utf8')))                                                        
                                                                                                                                
