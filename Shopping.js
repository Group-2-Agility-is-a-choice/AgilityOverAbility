load();

function load() {
  if(localStorage.length!=0) {

    let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
    const obj = JSON.parse(storage);
    //console.log(obj['1'][1]+obj['1'][2]+" "+obj['1'][0]);
    //5x bananas
    let finalList = "";
    let finalForm = "";

    const keys = Object.keys(obj);
    // print all keys
    console.log(keys); //0:1,1:2
    // iterate over object
    keys.forEach((key) => {
      //console.log(`${key}: ${obj[0][0]}`);
    //});

    let amount = obj[key][1];
    let unit = obj[key][2];
    let item = obj[key][0];
    let list = "<div class='form-check m-3' onclick='checkedBox(this)'><input class='form-check-input' type='checkbox' id='ingredient1'><label class='form-check-label' for='ingredient1'>"
    let form = list+"<input type='number' style='width:75px;' value='"+amount+"' placeholder='"+amount+"'>";
    list += amount+unit+" "+item; //how it displays: 5x bananas
    form += unit+" "+item+"</label></div>" //for the form it is [5]x bananas where 5 is changeable (not available yet)
    list += "</label></div>";

    finalList += list;
    finalForm += form;
    });

    document.getElementById("shopping").innerHTML = finalList;
    document.getElementById("form").innerHTML = finalForm;
  } else {
    let empty = "<p>Your shopping cart is empty.</p>"
    document.getElementById("shopping").innerHTML = empty;
    document.getElementById("form").innerHTML = empty;
  }
}
