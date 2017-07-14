 var checked = [];
 var headings;
 String.prototype.splitCSV = function(sep) {
     var regex = /(\s*"[^"]+"|\s*[^,]+)(?=,|$)/g;
     return matches = this.match(regex);
 }

 function Upload() {
     var fileUpload = document.getElementById("fileUpload");
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
     if (regex.test(fileUpload.value.toLowerCase())) {
         if (typeof(FileReader) != "undefined") {
             var reader = new FileReader();
             reader.onload = function(e) {
                 var table = document.createElement("table");
                 var rows = e.target.result.split("\n");
                 console.log(rows[0]);
                 headings = rows[0].splitCSV();
                 //console.log(headings);
                 var container = document.getElementById("dynamic-headings");
                 container.innerHTML = "";
                 for (var k = 0; k < headings.length; k++) {

                     var checkbox = document.createElement('input');
                     checkbox.type = "checkbox";
                     checkbox.name = headings[k];
                     checkbox.value = "value";
                     checkbox.id = "ch-" + headings[k];

                     var label = document.createElement('label')
                     label.htmlFor = "ch-" + headings[k];
                     label.appendChild(document.createTextNode(headings[k]));

                     container.appendChild(checkbox);
                     container.appendChild(label);
                     container.appendChild(document.createElement("br"));

                 }



             }
             reader.readAsText(fileUpload.files[0]);
         } else {
             alert("This browser does not support HTML5.");
         }
     } else {
         alert("Please upload a valid CSV file.");
     }
 }


 function Render() {
     var fileUpload = document.getElementById("fileUpload");
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
     var dvCSV = document.getElementById("dvCSV");
     dvCSV.innerHTML = "";
     if (regex.test(fileUpload.value.toLowerCase())) {
         if (typeof(FileReader) != "undefined") {
             var reader = new FileReader();
             reader.onload = function(e) {
                 var table = document.createElement("table");
                 var rows = e.target.result.split("\n");
                 var inputs = container.getElementsByTagName("input");

                 for (var i = 0; i < headings.length; i++) {
                     checked[i] = inputs[i].checked;
                 }
                 //console.log(checked);
                 for (var i = 0; i < rows.length - 1; i++) {
                     var row = table.insertRow(-1);
                     var cells = rows[i].splitCSV();
                     console.log(cells);
                     for (var j = 0; j < cells.length; j++) {
                         if (checked[j]) {
                             var cell = row.insertCell(-1);
                             cell.innerHTML = cells[j];
                             console.log(cell);
                         }
                     }
                     //dvCSV.appendChild(table);

                 }
                 dvCSV.appendChild(table);
             }
             reader.readAsText(fileUpload.files[0]);
         } else {
             alert("This browser does not support HTML5.");
         }
     } else {
         alert("Please upload a valid CSV file OR File Not Uploaded!");
     }
 }

 function enableDisableEdit(button) {
     var x = document.getElementById("dvCSV");
     if (x.contentEditable == "true") {
         x.contentEditable = "false";
         button.innerHTML = "Enable Edit";
     } else {
         x.contentEditable = "true";
         button.innerHTML = "Disable Edit";
     }
 }

 function downloadInnerHtml(filename, elId, mimeType) {
     var elHtml = document.getElementById(elId).innerHTML;
     var link = document.createElement('a');
     mimeType = mimeType || 'text/plain';

     link.setAttribute('download', filename);
     link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
     link.click();
 }