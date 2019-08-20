// Global variables
var itemKey     = "item";
var counterKey  = "count";

function init(){
    document.querySelector(".container").innerHTML = "";

    // if have items in local store
    for (var key in localStorage){
        if( key.search(itemKey) > -1 )
        {
            // get item from local storge
            // convert string json to object
            var item    = JSON.parse( localStorage.getItem(key) );
            var id      = key.replace(itemKey, "");

            // show on screen
            createItem( item.time,item.date, item.text, id);
        }
     }
}

function createItem(time,date, text, id=null)
{
    var items = {
        "date": date,
        "time": time,
        "text": text
    };

    // get id
    var tempCounter = id == null ? counter() : id;

    localStorage.setItem(`item${tempCounter}`, JSON.stringify(items));
    
    let str = document.querySelector(".container").innerHTML;
    str += `<div id="item${tempCounter}" class="newDiv" >
    <span onclick="remove(event)"><i class="far fa-times-circle"></i></span>
    <h3>${items.text}</h3> <br>
    ${items.time}<br>
    ${items.date}<br>
    </div>`
    document.querySelector(".container").innerHTML = str;
}

// create item be click buttun
var form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var text = document.getElementById("textarea").value;

    // clear data form from
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("textarea").value = "";


    createItem(date, time, text);

    return false;
  });
  


function remove(e) {
    // remove from local storge
    var id = e.path[2].id;
    localStorage.removeItem(id);

    // remove from document
    init();
}

function counter(){
    
    // למצוא אם יש קאונטר
    // אם יש קאונטר לקחת את המספר שיש ולהגדיל בפלוס  1 ולעשות לו סט
    if( localStorage.getItem(counterKey) == null ){
        localStorage.setItem(counterKey, 1);
        return 1;
    }

    //אם אין שיגדיר אותו 1 ושיחזיר 1
    else{
        var count = parseInt(localStorage.getItem(counterKey));
        count++;
        localStorage.setItem(counterKey,count);
        return count;
    }
}

init();


  //מחיקת תוכן של הטופס
  function clearForm(){
    document.getElementById("myForm").reset();//אחראי למחוק את האינפוט בטופס
   
};
