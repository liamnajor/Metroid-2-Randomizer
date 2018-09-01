var c = []
var adresses = {//I know I spelled addresses wrong, but I'd already copy-pasted all the shit below and this was quicker
        items:[["DF97","E041"],["DDC9","E023"],["DE49","DFE7"],["DFBF","DFFA"],"DD89","DF58","DDE5","DED2","DFA6","DA24"],
        graphics:[["14725","14DE2","150B2","1510C","15255","15531"],["14743","14759","15072","150D3","1520E","1527A","153BC","15525","1552F"],["15095","150BB","15529"],["14C22","150B4","150C2","15199","15527","1552B"],"15132",["150A6","15533"],"15084",["154FE","15500","15523"],["14804","1498F","15026","15521","1552D"],["14C0C","15047"]]
    }
var testhack = function(){
    //opens gameboy emulator in a new tab/window
    window.open("GB_Emu/index.xhtml")
}
var seedused = false
	var converter = function(input)
	{
        var stringHexadecimal = ""+input+""
		var returnValues = [];

		var nibblesForByteCurrent = [];

		for (i = 0; i < stringHexadecimal.length; i++)
		{
			var charForNibble = stringHexadecimal[i];
			var nibbleAsInt = parseInt(charForNibble, 16);
			if (isNaN(nibbleAsInt) == false)
			{
				nibblesForByteCurrent.push(nibbleAsInt);
				if (nibblesForByteCurrent.length == 2)
				{
					var byte = 
						(nibblesForByteCurrent[0] << 4) 
						+ nibblesForByteCurrent[1];
					returnValues.push(byte);
					nibblesForByteCurrent.length = 0;
				}
			}			
		}

		return returnValues;
	}	

	var save = function(bytes)
	{
        this.bytes = bytes
		var dataAsArrayBuffer = new ArrayBuffer(this.bytes.length);
		var dataAsArrayUnsigned = new Uint8Array(dataAsArrayBuffer);
	    for (var i = 0; i < this.bytes.length; i++) 
		{
			dataAsArrayUnsigned[i] = this.bytes[i];
		}
    	var dataAsBlob = new Blob([dataAsArrayBuffer], {type:'bytes'});


		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(dataAsBlob);
        if (document.getElementById("filename").value === ""){
            link.download = "data.bin"
        } else {
            link.download = document.getElementById("filename").value
        }
		link.click();
	}


var button = function(){
    var usrseed = ""+document.getElementById("seed").value+""
    if (usrseed != ""){
        seedused = true
    }
    var bytes = document.getElementById("Bytes").value
    var e = bytes.length
    var p = 0
    var i = e/2
    var g = 0, d = 0, a = 0, x = 0, h = 0, w = 0, f = ""
    while(d <= i){
        if (g === 16){
            g = 0
            a += 1
        }
        if (a === 16){
            a = 0
            x += 1
        }
        if (x === 16){
            x = 0
            h += 1
        }
        if (h === 16){
            h = 0
            w += 1
        }
        f += "0x"+w.toString(16)+""+h.toString(16)+""+x.toString(16)+""+a.toString(16)+""+g.toString(16)+""
        d += 16
        g += 16
    }
    while(e >= 0){
        var counter = e/2 -1
        var b = e - 2
        var res = bytes.substr(b, e)
        c[counter] = res.substr(0, 2)
        e = b
    }
    var t = c.length
    var k = 0
    var j = 0
    var q = ""
    while(t >= 16){
        var u = j + 14
        var n = f.substr(j, u)
        var z = n.substr(0, 7)
        q += ""+z+" "
        var l = k + 15
        j += 7
        while(l >= k){
            q += ""+c[k]+","
            k += 1
        }
        q += " "
        t -= 16
    }
    document.getElementById("output HEX").value = ""+q+""
    var r = c.length - 147456 
    var z = r / 16383
    var y = ""+z+""
    var b = y.split(".")
}
var encode = function(){
    var value = ""
    var bytes = document.getElementById("Bytes").value
    var str =  document.getElementById("output HEX").value
    var e = str.split(" ");
    var d = 1
    var j = ""
    while (d <= e.length){
        j += ""+e[d]+""
        d += 2
    }
    c = j.split(",")
    var seed = []
    var varif = []
    if (seedused === false){
	var i = 0
        while(i != 10){
		var val = Math.floor((Math.random() * 10));
		seed[i] = val
		var e
		for(e = 0; e != i; e++){
		    if(seed[e] === val){
			i -= 1
			break
		    }
		}
		i += 1
        }
        document.getElementById("seed").value = ""+seed+""
	//generate seed
    } else if (seedused === true){
        //add usrseed to seed
        var strseed = document.getElementById("seed").value.split(",")
	var i = 0
	while(i != 10){
	    seed[i] = parseInt(strseed[i], 10)
	    i += 1
	}
    }
    var ireplacement = ["80","82","84","86","88","8A","8C","8E","90","92"]
    var greplacement = ["D1","D2","D3","D4","D5","D6","D7","D8","D9","DA"]
    //replace items
    c[20099] = "00"
    c[parseInt("34FBD", 16)] = "1D"
        var strseed = document.getElementById("seed").value.split(",")
	var i = 0
	while(i != 10){
	    seed[i] = parseInt(strseed[i], 10)
	    i += 1
	}
    //sets items not to save state
    c[parseInt(adresses.items[0][0], 16)-1] = ireplacement[seed[0]]
    c[parseInt(adresses.items[0][1], 16)-1] = ireplacement[seed[0]]

    c[parseInt(adresses.items[1][0], 16)-1] = ireplacement[seed[1]]
    c[parseInt(adresses.items[1][1], 16)-1] = ireplacement[seed[1]]
    
    c[parseInt(adresses.items[2][0], 16)-1] = ireplacement[seed[2]]
    c[parseInt(adresses.items[2][1], 16)-1] = ireplacement[seed[2]]
    
    c[parseInt(adresses.items[3][0], 16)-1] = ireplacement[seed[3]]
    c[parseInt(adresses.items[3][1], 16)-1] = ireplacement[seed[3]]
    
    c[parseInt(adresses.items[4], 16)-1] = ireplacement[seed[4]]
    
    c[parseInt(adresses.items[5], 16)-1] = ireplacement[seed[5]]
    
    c[parseInt(adresses.items[6], 16)-1] = ireplacement[seed[6]]
    
    c[parseInt(adresses.items[7], 16)-1] = ireplacement[seed[7]]
    
    c[parseInt(adresses.items[8], 16)-1] = ireplacement[seed[8]]
    
    c[parseInt(adresses.items[9], 16)-1] = ireplacement[seed[9]]
	
    c[parseInt(adresses.items[0][0], 16)] = ireplacement[seed[0]]
    c[parseInt(adresses.items[0][1], 16)] = ireplacement[seed[0]]

    c[parseInt(adresses.items[1][0], 16)] = ireplacement[seed[1]]
    c[parseInt(adresses.items[1][1], 16)] = ireplacement[seed[1]]
    
    c[parseInt(adresses.items[2][0], 16)] = ireplacement[seed[2]]
    c[parseInt(adresses.items[2][1], 16)] = ireplacement[seed[2]]
    
    c[parseInt(adresses.items[3][0], 16)] = ireplacement[seed[3]]
    c[parseInt(adresses.items[3][1], 16)] = ireplacement[seed[3]]
    
    c[parseInt(adresses.items[4], 16)] = ireplacement[seed[4]]
    
    c[parseInt(adresses.items[5], 16)] = ireplacement[seed[5]]
    
    c[parseInt(adresses.items[6], 16)] = ireplacement[seed[6]]
    
    c[parseInt(adresses.items[7], 16)] = ireplacement[seed[7]]
    
    c[parseInt(adresses.items[8], 16)] = ireplacement[seed[8]]
    
    c[parseInt(adresses.items[9], 16)] = ireplacement[seed[9]]
    
    //replace screen transition codes for proper graphics loading (which a CERTAIN DUMBASS didn't do the first time around)
    c[parseInt(adresses.graphics[0][0], 16)] = greplacement[seed[0]]
    c[parseInt(adresses.graphics[0][1], 16)] = greplacement[seed[0]]
    c[parseInt(adresses.graphics[0][2], 16)] = greplacement[seed[0]]
    c[parseInt(adresses.graphics[0][3], 16)] = greplacement[seed[0]]
    c[parseInt(adresses.graphics[0][4], 16)] = greplacement[seed[0]]
    c[parseInt(adresses.graphics[0][5], 16)] = greplacement[seed[0]]
   
    c[parseInt(adresses.graphics[1][0], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][1], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][2], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][3], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][4], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][5], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][6], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][7], 16)] = greplacement[seed[1]]
    c[parseInt(adresses.graphics[1][8], 16)] = greplacement[seed[1]]

    c[parseInt(adresses.graphics[2][0], 16)] = greplacement[seed[2]]
    c[parseInt(adresses.graphics[2][1], 16)] = greplacement[seed[2]]
    c[parseInt(adresses.graphics[2][2], 16)] = greplacement[seed[2]]

    c[parseInt(adresses.graphics[3][0], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[3][1], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[3][2], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[3][3], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[3][4], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[3][5], 16)] = greplacement[seed[3]]
    c[parseInt(adresses.graphics[4], 16)] = greplacement[seed[4]]
    c[parseInt(adresses.graphics[5][0], 16)] = greplacement[seed[5]]
    c[parseInt(adresses.graphics[5][1], 16)] = greplacement[seed[5]]
 
    c[parseInt(adresses.graphics[6], 16)] = greplacement[seed[6]]
        
    c[parseInt(adresses.graphics[7][0], 16)] = greplacement[seed[7]]
    c[parseInt(adresses.graphics[7][1], 16)] = greplacement[seed[7]]
    c[parseInt(adresses.graphics[7][2], 16)] = greplacement[seed[7]]

    c[parseInt(adresses.graphics[8][0], 16)] = greplacement[seed[8]]
    c[parseInt(adresses.graphics[8][1], 16)] = greplacement[seed[8]]
    c[parseInt(adresses.graphics[8][2], 16)] = greplacement[seed[8]]
    c[parseInt(adresses.graphics[8][3], 16)] = greplacement[seed[8]]
    c[parseInt(adresses.graphics[8][4], 16)] = greplacement[seed[8]]
    c[parseInt(adresses.graphics[9][0], 16)] = greplacement[seed[9]]
    c[parseInt(adresses.graphics[9][1], 16)] = greplacement[seed[9]]
    var i = 0
    while(i <= bytes.length){
        value += ""+c[i]+""
        i += 1
    }
    //bytes = value
    var saver = Converter.stringHexadecimalToBytes(value)
    c = saver
    var m = 262143
    var w = []
    var v = 0
    while(v <= m){
        w[v] = saver[v]
        v += 1
    }
    save(w)
    window.alert("encoding complete")
}
main();
