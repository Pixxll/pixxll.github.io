var xml = new XMLHttpRequest();
xml.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        document.getElementById("demo").innerHTML = myArr[0];
    }
};

xml.open("GET", "jsontest.json", true);
xml.send();