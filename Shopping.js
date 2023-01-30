load();

function load() {
  if(localStorage.length!=0) {

    let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
    //alert(storage);
    console.log(storage);

    try {
      const obj = JSON.parse(storage);

      //console.log(obj['1'][1]+obj['1'][2]+" "+obj['1'][0]);
      //5x bananas
      let finalList = "";
      let finalForm = "";

      const keys = Object.keys(obj);
      // print all keys
      console.log(keys); //1:[banana,5,x]
      // iterate over object
      keys.forEach((key) => {
        //console.log(`${key}: ${obj[0][0]}`);
      //});

        let amount = obj[key][1];
        let unit = obj[key][2];
        let item = obj[key][0];
        let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"Box'><label class='form-check-label' for='"+item+"Box'>"
        let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"EditBox'><label class='form-check-label' for='"+item+"EditBox'><input type='number' id='"+item+"Input' min='0' style='width:75px;' value='"+amount+"' placeholder='"+amount+"'>";
        list += amount+unit+" "+item; //how it displays: 5x bananas
        form += unit+" "+item+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
        list += "</label></div>";

        finalList += list;
        finalForm += form;
        });

        document.getElementById("shopping").innerHTML = finalList;
        document.getElementById("form").innerHTML = finalForm;
        //document.getElementById("save").classList.remove("hide");
        document.getElementById("edit").classList.remove("hide");
        document.getElementById("remove").classList.remove("hide");
        document.getElementById("empty").classList.remove("hide");
    } catch {
      let empty = "<p>Your shopping cart is empty.</p>"//or error
      document.getElementById("shopping").innerHTML = empty;
      document.getElementById("save").classList.add("hide");
      document.getElementById("edit").classList.add("hide");
      document.getElementById("remove").classList.add("hide");
      document.getElementById("empty").classList.add("hide");
    }
  } else {
    let empty = "<p>Your shopping cart is empty.</p>"
    document.getElementById("shopping").innerHTML = empty;
    document.getElementById("save").classList.add("hide");
    document.getElementById("edit").classList.add("hide");
    document.getElementById("remove").classList.add("hide");
    document.getElementById("empty").classList.add("hide");
    //document.getElementById("form").innerHTML = empty;
  }
}

function update() {
  let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
  //alert(storage);
  console.log(storage);

  try {
      const obj = JSON.parse(storage);

      //console.log(obj['1'][1]+obj['1'][2]+" "+obj['1'][0]);
      //5x bananas
      let newList = "";
      let newForm = "";

      const keys = Object.keys(obj);
      // print all keys
      console.log(keys); //1:[banana,5,x]
      // iterate over object
      var shoppingList = "{";
      let number = 0;

      keys.forEach((key) => {
        //console.log(`${key}: ${obj[0][0]}`);
      //});

        let amount = obj[key][1];
        let unit = obj[key][2];
        let item = obj[key][0];

        let itemID = item+"Input";
        let newAmount = document.getElementById(itemID).value;
        if (newAmount!=0) {
          let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"Box'><label class='form-check-label' for='"+item+"Box'>"
          let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"EditBox'><label class='form-check-label' for='"+item+"EditBox'><input type='number' id='"+item+"Input' style='width:75px;' min='0' value='"+newAmount+"' placeholder='"+newAmount+"'>";
          list += newAmount+unit+" "+item; //how it displays: 5x bananas
          form += unit+" "+item+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
          list += "</label></div>";

          newList += list;
          newForm += form;
          number += 1;
          shoppingList+=`"`+number+`":["${item}",${newAmount},"${unit}"],`;
        }else {
          //delete from list
          //CHECK IF LIST IS EMPTY!!
        }
      });
        shoppingList = shoppingList.slice(0, -1); //removes comma
        shoppingList +=`}`;

        document.getElementById("shopping").innerHTML = newList;
        document.getElementById("form").innerHTML = newForm;
        localStorage.setItem('storage',shoppingList); //new list is saved
    } catch {
      //error
    }
}

function remove() {
  let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
  //alert(storage);
  console.log(storage);

  try {
      const obj = JSON.parse(storage);

      //console.log(obj['1'][1]+obj['1'][2]+" "+obj['1'][0]);
      //5x bananas
      let newList = "";
      let newForm = "";

      const keys = Object.keys(obj);
      // print all keys
      console.log(keys); //1:[banana,5,x]
      // iterate over object
      var shoppingList = "{";
      let number = 0;

      keys.forEach((key) => {

        let amount = obj[key][1];
        let unit = obj[key][2];
        let item = obj[key][0];

        let itemID = item+"Box";
        let itemID2 = item+"EditBox";
        let check = false;
        if (document.getElementById(itemID).checked||document.getElementById(itemID2).checked) {
          check = true;
        }
        console.log(itemID+" "+itemID2+" "+check);

        if (check!=true) {
          let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"Box'><label class='form-check-label' for='"+item+"Box'>"
          let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item+"EditBox'><label class='form-check-label' for='"+item+"EditBox'><input type='number' id='"+item+"Input' style='width:75px;' min='0' value='"+amount+"' placeholder='"+amount+"'>";
          list += amount+unit+" "+item; //how it displays: 5x bananas
          form += unit+" "+item+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
          list += "</label></div>";

          newList += list;
          newForm += form;
          number += 1;
          shoppingList+=`"`+number+`":["${item}",${amount},"${unit}"],`;
        }else {
          //delete from list
          //CHECK IF LIST IS EMPTY!
        }
      });
        shoppingList = shoppingList.slice(0, -1); //removes comma
        shoppingList +=`}`;

        document.getElementById("shopping").innerHTML = newList;
        document.getElementById("form").innerHTML = newForm;
        localStorage.setItem('storage',shoppingList); //new list is saved
    } catch {
      //error
    }
}

function empty() {
  localStorage.clear();
  let empty = "<p>Your shopping cart is empty.</p>"//or error
  document.getElementById("shopping").innerHTML = empty;
  document.getElementById("form").innerHTML = empty;
  document.getElementById("save").classList.add("hide");
  document.getElementById("edit").classList.add("hide");
  document.getElementById("remove").classList.add("hide");
  document.getElementById("empty").classList.add("hide");
}
