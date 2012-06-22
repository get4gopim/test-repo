/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function liveSearchNavListContentTitle(device) {
    var el = parent.parent.document.getElementById("contenttitle")
    el.innerHTML = "Device->"+device;
}

function setFilteredData(arr) {
    var args = getArgs();
    if (args != null) {
        if (args["search"] != null) { // search=match:OR,groupIpAddress:224 
            var search = args["search"]; // match:OR,groupIpAddress:224 
            var page_url = document.location.toString();
            //var search_url = page_url.substring(0, page_url.indexOf("?")); // http://localhost:8084/cmm30/domain/search_domain.htm
            var search_url = page_url.substring(0, page_url.indexOf("search=")-1); // http://localhost:8084/cmm30/domain/search_domain.htm
            
            search_url = search_url.substring(page_url.lastIndexOf("/")+1); // search_domain.htm            
            
            var match = search.substring(0, search.indexOf(",")).split(":")[1]; // match:OR   
            search = search.substring(search.indexOf(",")+1); // groupIpAddress:224
            
            var values = search.split(","); // route:12.2,device:sd1,source:12.2.3
            
            for (var i=0;i<values.length;i++) {
                addEvent('mytable', arr, search_url);
                
                var pair = values[i].split(":");
                var key = pair[0];
                var value = pair[1];
                
                var txt_search = document.getElementsByName("txtsearch");
                var sel_actions = document.getElementsByName("sel_actions");                
                //alert ("sel_actions = " + sel_actions.length)
                
                for (var items=0;items<arr.length;items++) {                    
                    //alert (key + " = " + sel_actions[i].options[items].value)                    
                    if (key == sel_actions[i].options[items].value) {
                        sel_actions[i].options[items].selected = true;                        
                        txt_search[i].value = value;
                        break;
                    }
                }
            }
            
            var sel_combo = document.getElementById("selmatch");
            sel_combo.value = match;
            
            var control = document.getElementById("btnRemove");
            if(control.style.display == "visible" || control.style.display == "")                
              control.style.display = "none";
            else
              control.style.display = "";
        }
        if (args["per"] != null) {
            var rows_per = document.getElementById("t2_rowsper");
            rows_per.value = args["per"];
        }
    }
    
}

function cuesGetSelectedRows(tableId, cellObj) {
  var unique_id = null;
  
  try {
      cuesDeselectAllTableRows(tableId);
      rowObj = cellObj.parentNode;
      cellObj = rowObj.cells[0];
      if(cellObj.className=="cuesTableReorderColumn") {
          cellObj = rowObj.cells[1];  
      }        
      if(cellObj.tagName.toLowerCase()=="td")
      {          
        checkedObj = cellObj.getElementsByTagName("input");
        unique_id = checkedObj[0].value;
        checkedObj[0].checked = true;        
        rowObj.className = icuesRowSelectedClass(rowObj);
      }      
  } catch (e) {}
  
    return unique_id;
}

function changeImportTitle() {
    var el = parent.parent.document.getElementById("contenttitle")
    el.innerHTML += "->Import";
}

function changeContentTitle() {
    var el = parent.parent.document.getElementById("contenttitle")
    el.innerHTML += "->Add/Modify";
}

function changeContentTitleByDevice() {
    var el = parent.parent.document.getElementById("contenttitle")
    el.innerHTML += "->By Device - Add/Modify";
}

function updateContentTitle(topwin) {
    var el = topwin.document.getElementById("contenttitle");
    var nav = el.innerHTML.toString();
    //alert (nav.lastIndexOf("-&gt"));
    if (nav != -1) {
        nav = nav.substring(0, nav.lastIndexOf("-&gt"));
        //alert (nav.lastIndexOf("-&gt"));
        if (nav.lastIndexOf("-&gt") != -1) {                        
            //alert (nav);
            //alert (nav.lastIndexOf("-&gt"));
            el.innerHTML = nav;
        }
    }
}

function getArgs() { 
    var args = new Object(); 
    var query = location.search.substring(1);
    //alert (query)
    var pairs = query.split("&");

    for(var i = 0; i < pairs.length; i++) { 
        //alert (pairs.length)
        var pos = pairs[i].indexOf('='); 
        //alert (pos)
        if (pos == -1) continue; 
        var argname = pairs[i].substring(0,pos); 
        //alert (argname)
        var value = pairs[i].substring(pos+1); 
        //alert (value)
        args[argname] = unescape(value); 
    }
    //alert (args["status"])
    return args; 
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

function removeItem(list, value) {
	
	for (var i=0;i<list.length;i++)
	{
            // alert (list[i].value + " == " + value);
		if (list[i].value == value)
			list.remove(i);
	}
}

function selItems(list)
{
	var cnt=0;
	for (var i=0;i<list.length;i++)
	{
		if (list[i].selected == true)
			cnt++;
	}
	return cnt;
}

function delList_Right(form) {
        var rlist = form.ces_right;
        var rlist_sel = form.ces_right_sel;
        var llist = form.ces_left;

        var lcnt = form.ces_left.options.length;
        var rcnt = form.ces_right.options.length;

        var olength = selItems(rlist_sel);

   if (olength > 0) {
        // for (var i=0;i<rlist_sel.length;i++)
        for (var i=rlist_sel.length-1;i>=0;i--)
        {
                if (rlist_sel[i].selected == true) {
                        var str = rlist_sel[i].value;
                        // llist.options[lcnt++] = new Option(str, str, false, true);
                        rlist.options[rcnt++] = new Option(str, str, false, true);
                        rlist_sel.remove(i);
                }
        }
  
   } else {
        alert ("select any one ce's from the list to remove !!");
   }
   return false;
}

function delList_Left(form) {
        var llist = form.ces_left;
        var llist_sel = form.ces_left_sel;
        var rlist = form.ces_right;

        var lcnt = form.ces_left.options.length;
        var rcnt = form.ces_right.options.length;

        var olength = selItems(llist_sel);

   if (olength > 0) {
        for (var i=0;i<llist_sel.length;i++)
        {
                if (llist_sel[i].selected == true) {
                        var str = llist_sel[i].value;
                        llist.options[lcnt++] = new Option(str, str, false, true);
                        llist_sel.remove(i);
                        // rlist.options[rcnt++] = new Option(str, str, false, true);
                }
        }
  
   } else {
        alert ("select any one ce's from the list to remove !!");
   }
   return false;
}

function moveList_Left(form) {    
        var llist = form.ces_left;
        var llist_sel = form.ces_left_sel;

        var rlist = form.ces_right;
        var cnt = form.ces_left_sel.options.length;

        var olength = selItems(llist);
        var selStr = "";

       //alert ("hi from mmt.js " + olength);

   if (olength > 0) {
        if (llist_sel.length == 0) {

        for (var i=0;i<llist.length;i++)
        {
                if (llist[i].selected == true) {
                        // alert ("S:" + llist[i].value);
                        // selStr += rlist[i].value + ",";

                        var str = llist[i].value;
                        llist_sel.options[cnt++] = new Option(str, str, false, true);
                        llist.remove(i);
                        // rlist.remove(i);
                        cnt++;
                }
        }
        } else alert ("At a time only one CE should be mapped !!");

        // selStr = selStr.substring(0, selStr.length - 1);
   } else {
        alert ("select any one ce's from the list to move !!");
   }

   // alert ("S" + selStr);
   // form.lces_sel.value = selStr;

   return false;
}

function moveList_Right(form) {
        var rlist = form.ces_right;
        var llist = form.ces_left;

        var selLength = selItems(rlist);

        var rlist_sel = form.ces_right_sel;
        var llist_sel = form.ces_left_sel;

        var cnt = rlist_sel.options.length;
        var l_cnt = llist_sel.options.length;

        if (l_cnt <= 0) {
                alert ("first select one ce from left side to map ");
                return false;
        }

        if (selLength > 0) {
                for (var i=rlist.length-1;i>=0;i--)
                {
                        if (rlist[i].selected == true) {

                                var str = rlist[i].value;
                                rlist_sel.options[cnt++] = new Option(str, str, false, true);
                                // removeItem(llist, rlist[i].value);
                                rlist.remove(i);
                        }
                }

        } else {
                alert ("select one/more ce's from the list to map !!");
        }

   return false;
}

function addConfigList(form)
{
        var rlist_sel = form.ces_right_sel;
        var llist_sel = form.ces_left_sel;
        var configs = form.ceListEntry;
        var ce_sel = "";
        var stype = form.serviceTypeName.value;

        if (stype.trim().length <= 0) {
                alert ("Enter Service Type ");
                form.serviceTypeName.focus();
                return false;
        }
        if (llist_sel.options.length <= 0) {
                alert ("Select atleast one Left CEs List ");
                return false;
        }
        if (rlist_sel.options.length <= 0) {
                alert ("Select atleast one/more Right CEs List ");
                return false;
        }

        if (form.sourceCEName != null) ce_sel = form.sourceCEName.value;
        else ce_sel = form.sourceCEName.value; // form.device.value

        var if_list = "", ce_list = "";

        for (var i=llist_sel.length-1;i>=0;i--)
        // for (var i=0;i<llist_sel.length;i++)
        {
                // if (llist_sel[i].selected == true) {
                        if_list += llist_sel[i].value + ",";
                        removeItem(llist_sel, llist_sel[i].value);
                // }
        }
        if_list = if_list.substring(0, if_list.length - 1);

        for (var i=rlist_sel.length-1;i>=0;i--)
        // for (var i=0;i<rlist_sel.length;i++)
        {
                // if (rlist_sel[i].selected == true) {
                        ce_list += rlist_sel[i].value + ",";
                        removeItem(rlist_sel, rlist_sel[i].value);
                // }
        }
        ce_list = ce_list.substring(0, ce_list.length - 1);
        var str = ce_sel + "@" + if_list + ":" + ce_list;

        var cnt = configs.options.length;
        configs.options[cnt++] = new Option(str, str, false, true);

}

function remove_configs(form) {
        var configs = form.ceListEntry;
        
        var rlist = form.ces_right;
        var llist = form.ces_left;

        var l_cnt = llist.options.length;
        var r_cnt = rlist.options.length;

        for (var i=configs.length-1;i>=0;i--)
        {
                if (configs[i].selected == true) {
                        var str = configs[i].value;
                        var arr = str.split("@");
                        var ifindex = arr[1].split(":");
                        var str2 = ifindex[0] + ":" + ifindex[1];

                        llist.options[l_cnt++] = new Option(str2, str2, false, true);
                        var ces = ifindex[2].split(",");

                        for (var j=0;j<ces.length;j++) {
                                rlist.options[r_cnt++] = new Option(ces[j], ces[j], false, true);

                        }
                        configs.remove(i);
                        // removeItem(configs, configs[i].value);
                }
        }
}

function showTip(tspan) {
    var tip = document.getElementById(tspan)
    tip.style.display = ""
}

function hideTip(tspan) {
    var tip = document.getElementById(tspan)
    tip.style.display = "none"
}

/*
 *  Add Remove Filter Part starts Here.
 *  
 */

function addEvent(mytable, arr, search_url)
{       
    //alert(arr.length);
    var maxAllow = arr.length;
    var tbl = document.getElementById(mytable);
    var lastRow = tbl.rows.length;

    if (lastRow >= maxAllow) {
        alert ("WARNING: Only " + maxAllow + " columns should be allowed to filter !")
        return 0;
    }

    // if there's no header row in the table, then iteration = lastRow + 1
    var iteration = lastRow + 1;
    var row = tbl.insertRow(lastRow);

    // left cell
    var cell = row.insertCell(0);

    if (iteration == 1) {
        var div_match = document.createElement('div');
        div_match.setAttribute("id", 'divmatch');						
        div_match.style.visibility = "hidden";

        var textNode = document.createTextNode("Matching : ");
        var sel = document.createElement('select');
        sel.setAttribute("id", 'selmatch');        
        sel.name = 'selmatch';
        sel.options[0] = new Option('Any', 'OR');
        sel.options[1] = new Option('All', 'AND');
        sel.style.visibility = "hidden";
        div_match.appendChild(textNode);
        div_match.appendChild(sel);	
        cell.appendChild(div_match);
    }

    if (iteration > 1) {
        document.getElementById('divmatch').style.visibility = "visible"
        document.getElementById('selmatch').style.visibility = "visible"
    }

    var cellRight = row.insertCell(1);

    var textNode = document.createTextNode(" Filter : ");	
    cellRight.appendChild(textNode);    
    
    var sel = document.createElement('select');
    sel.setAttribute("id", "sel_actions");	
    sel.name = "sel_actions";
    for (var i=0;i<arr.length;i++) {
        var disname = arr[i].split(":");
        sel.options[i] = new Option(disname[0], disname[1]);
        //sel[i].selected = true;
    }                				
    //sel.onClick = selEvent;				
    cellRight.appendChild(sel);

    var textNode = document.createTextNode(" Containing Text : ");				
    cellRight.appendChild(textNode);

    var cellRight = row.insertCell(2);

    var txtSearch = document.createElement('input');
    txtSearch.type = 'text';					
    txtSearch.setAttribute("id", 'txtsearch');
    txtSearch.setAttribute("name", 'txtsearch');
    txtSearch.setAttribute("size", '20');

    var div_sel = document.createElement('div');
    div_sel.setAttribute("id", 'div_sel');
    div_sel.appendChild(txtSearch);						
    cellRight.appendChild(div_sel);

    var cellRight = row.insertCell(3);

    var el = document.createElement('input');
    el.type = 'button';
    el.name = 'btnRemove' + iteration;
    el.id = 'btnRemove' + iteration;
    el.value = "Remove";
    el.mytable = mytable;
    el.search_url = search_url;    
    el.onclick = removeEvent;
    cellRight.appendChild(el);

    var totRow = lastRow + 1;                    
    addRemoveSearch(totRow, cellRight, search_url)
    return 0;
}

function removeEvent()
{	//alert (this.search_url)		  
    var tbl = document.getElementById(this.mytable);
    var lastRow = tbl.rows.length;
    tbl.deleteRow(lastRow - 1);			  			  
    if (lastRow == 2) {
        document.getElementById('divmatch').style.visibility = "hidden"
        document.getElementById('selmatch').style.visibility = "hidden"
    }

    var totRow      = tbl.rows.length;
    var mytablebody = tbl.getElementsByTagName("tbody")[0];
    if (totRow > 0) {
      var myrow       = mytablebody.getElementsByTagName("tr")[totRow-1];
      if (myrow != null) {
          var cellRight = myrow.insertCell(4);
          addRemoveSearch(totRow, cellRight, this.search_url)
      }
    }
}

function addRemoveSearch(totRow, cellRight, search_url) {
    for (var i=1; i<=totRow; i++) {                    
        if (totRow == i) {
            var el = document.createElement('input');
            el.setAttribute("id", 'btnSearch' + totRow);
            el.type = 'button';
            el.name = 'btnSearch' + totRow;                        
            el.value = "Search";
            el.search_url = search_url;
            el.onclick = searchEvent;
            cellRight.appendChild(el);                        
        } else {                        
            var elem = document.getElementById('btnSearch'+i);
            if (elem != null)
                var old = (elem.parentNode).removeChild(elem);
        }                        
    }
}

function searchEvent() {
    var param_val = document.getElementsByName("txtsearch")
    var params = document.getElementsByName("sel_actions")
    var params_match = document.getElementById("selmatch")
    //alert (this.search_url)

    var regexp = /[a-zA-Z0-9]/;
    
    var search_str = "match:" + params_match.value + ",";
    for (var i=0; i<param_val.length; i++) {
        if (!isEmpty("Containing Text"+i, param_val[i])) {
            param_val[i].focus()
            return false;
        }
        
        var n = param_val[i].value.toString();
        if (!n.match(regexp)) {
          alert("Enter only alphanumeric characters [a-zA-Z0-9]");
          return false;
        }          
               
        search_str += params[i].value + ":" + param_val[i].value + ",";
    }
    search_str = search_str.substring(0, search_str.length - 1);
    //alert ("search params : "  + search_str);
    
    //alert (this.search_url)
    var url = this.search_url.toString()
    //alert (url)
    if (url.indexOf("?") > 0) {
        url = this.search_url + "&"
    } else {
        url = this.search_url + "?"
    }
    
    //alert (url)
        
    document.location = url + "search="+search_str;
    return true;
}

function isEmpty(fieldname, field) {
    //alert (field.value + ": " + field.value.length)
    var value = field.value;
    //alert (value.trim() + "." + value.trim().length)
    if (value.trim().length <= 0) {
      alert(fieldname + " field should not be empty !")      
      return false
    }
    return true
}

function validateIMTconfig(form, e) {

  var i;
  var nelem = form.elements.length;

  for (i=0; i<nelem; i++) {
    if ((form.elements[i].type == 'checkbox')) {
      if (form.elements[i].checked) {
        var tag = form.elements[i].name;
        var direction;
        var ifIndex;
        var hid;
        var lid;
        if (tag.indexOf("in") != -1) {
            direction = 'in';
            ifIndex = tag.substr(tag.indexOf('n')+1);
        }
        else {
            direction = 'out';
            ifIndex = tag.substr(tag.indexOf('t')+1);
        }
        hid = direction+"hi"+ifIndex;
        lid = direction+"lo"+ifIndex;
        var hi = parseInt(eval("form."+hid+".value"));
        var lo = parseInt(eval("form."+lid+".value"));

        if (!hi || !lo) {
           alert("Please enter a hi and lo value for " + direction + "bound.");
           //e.returnValue = false;
           return false;
        }

        if (!thresholdsOKnegative(hi,lo)) {
           //e.returnValue = false;
           return false;
        } 

        if (!checkNumber(eval("form."+hid)) || !checkNumber(eval("form."+lid))) {                        
            //e.returnValue = false;
            return false;
        }
      }
    }
  }              
  return true;
}

function thresholdsOKnegative(p1,p2) {

  var t1 = p1;
  var t2 = p2;

  if (t1 <= t2) {
    alert("Hi (" + t1 + ") threshold must be greater than Lo (" + t2 + ")");
    return false;
  }

 return true;
}

function checkNumber(num,hi,lo) {
  var n = num.value;

  var regexp = /^[-]?\d*\d*$/;  

  n = n.toString();

  if (!n.match(regexp)) {
    alert("Please enter a number");    
    setTimeout(function(){num.focus(),10});
    return false;
  }

  var numValue = parseInt(n);
  var highValue = parseInt(hi);
  var lowValue = parseInt(lo);

  if ((highValue >= 0) && (lowValue >= 0)) {
    if ( (numValue > highValue) || (numValue < lowValue) ) {
      alert("Please enter a number between " + lo + " and " + hi);
      setTimeout(function(){num.focus(),10});
      return false;
    }
  }
  return true;
}

function checkGlobalInterval(value, num, hi, lo) {
  var n = value;

  var regexp = /^[-]?\d*\d*$/;

  n = n.toString();

  if (!n.match(regexp)) {
    alert("Please enter a number");    
    num.focus();
    return false;
  }
 
try
{
  var numValue = parseInt(n);
  var highValue = parseInt(hi);
  var lowValue = parseInt(lo);
  if ((highValue >= 0) && (lowValue >= 0)) {
    if ( (numValue > highValue) || (numValue < lowValue) ) {
      alert("Time interval exceeds a day interval. Enter a interval less than 86400 seconds");
      num.focus();
      return false;
    }
  }
}
catch(err)
{
  alert("error");
  return false;
}
  
  
  return true;
}


