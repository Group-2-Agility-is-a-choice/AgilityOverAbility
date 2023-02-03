load();
let qrScanner;
let camera = 'environment';
var current_basket = [];

if (window.location.href.includes("?")) {
  localStorage.setItem("storage", JSON.parse(LZString.decompressFromEncodedURIComponent(window.location.href.split("?")[1])));
  update();
}

const qrCode = new QRCode(document.getElementById("qrcode"), {
  text: "https://lgl.genav.ch/shopping.html?" + LZString.compressToEncodedURIComponent(JSON.stringify(localStorage.getItem('storage'))),
  width: 512,
  height: 512,
  colorDark: "#ffffff",
  colorLight: "#3E5641",
  correctLevel: QRCode.CorrectLevel.L
});

function showQRCode() {
  document.getElementById('qrDialogue').style.display = "block";
  qrCode.clear();
  qrCode.makeCode("https://lgl.genav.ch/shopping.html?" + LZString.compressToEncodedURIComponent(JSON.stringify(localStorage.getItem('storage'))));
}

function scanCode() {
  document.getElementById('scannerDialogue').style.display = 'block';
  qrScanner = new QrScanner(
      document.getElementById("video"),
      (camQrResult, _) => {
        let list = "";
        if (camQrResult.data.startsWith("https://lgl.genav.ch/shopping.html?")) {
          localStorage.setItem("storage", JSON.parse(LZString.decompressFromEncodedURIComponent(camQrResult.data.replace("https://lgl.genav.ch/shopping.html?", ""))));
          update();
          document.getElementById("scannerDialogue").style.display = 'none';
          qrScanner.destroy();
          document.getElementById('cameraLoading').style.display = 'block';
          document.getElementById('buttons').style.display = 'none';
        }
      }, {
        onDecodeError: (error)=>{
          if (error !== "Scanner error: No QR code found" && error !== QrScanner.NO_QR_CODE_FOUND)
            console.error(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
  );
  qrScanner.setInversionMode('both');
  qrScanner.start().then(()=>{
    document.getElementById('cameraLoading').style.display = 'none'
    document.getElementById('buttons').style.display = 'flex';
  });
}

function closeCam() {
  document.getElementById('scannerDialogue').style.display = 'none';
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('cameraLoading').style.display = 'block';
  qrScanner.destroy();
}

function load() {
  if(localStorage.length!=0) {

    let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
    //alert(storage);
    //console.log(storage);

    //try {
      const obj = JSON.parse(storage);

      //5x bananas
      let finalList = "";
      let finalForm = "";
      current_basket = [];
      let num = 0;

      // iterate over object
      obj.forEach((item) => {
        let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item.num+"Box'><label class='form-check-label' for='"+item.num+"Box'>"
        let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+item.num+"EditBox'><label class='form-check-label' for='"+item.num+"EditBox'><input type='number' id='"+item.num+"Input' min='0' style='width:75px;' value='"+item.amount+"' placeholder='"+item.amount+"'>";
        list += item.amount+" "+item.unit+" "+item.name; //how it displays: 5x bananas
        form += item.unit+" "+item.name+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
        list += "</label></div>";
        finalList += list;
        finalForm += form;

        let ingredient = {
            "num": num,//id
            "name": item.name,
            "amount": item.amount,
            "unit": item.unit
          };
          num+=1;
        current_basket.push(ingredient);
        });
        localStorage.setItem('storage',JSON.stringify(current_basket));
        document.getElementById("shopping").innerHTML = finalList;
        document.getElementById("form").innerHTML = finalForm;
        //document.getElementById("save").classList.remove("hide");
        document.getElementById("edit").classList.remove("hide");
        document.getElementById("remove").classList.remove("hide");
        document.getElementById("empty").classList.remove("hide");
        document.getElementById("share").classList.remove("hide");
    /*} catch {
      let empty = "<p>Your shopping cart is empty.</p>"//or error
      document.getElementById("shopping").innerHTML = empty;
      document.getElementById("save").classList.add("hide");
      document.getElementById("edit").classList.add("hide");
      document.getElementById("remove").classList.add("hide");
      document.getElementById("empty").classList.add("hide");
    }*/
  } else {
    let empty = "<p>Your shopping cart is empty.</p>"
    document.getElementById("shopping").innerHTML = empty;
    document.getElementById("save").classList.add("hide");
    document.getElementById("edit").classList.add("hide");
    document.getElementById("remove").classList.add("hide");
    document.getElementById("empty").classList.add("hide");
    document.getElementById("share").classList.add("hide");
    //document.getElementById("form").innerHTML = empty;
  }
}

function update() {
  let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
  //alert(storage);
  //console.log(storage);

  //try {
      const obj = JSON.parse(storage);

      let newList = "";
      let newForm = "";

      current_basket = [];
      let num = 0;

      obj.forEach((item) => {

        let itemID = item.num+"Input";
        let newAmount = document.getElementById(itemID).value;
        if (newAmount!=0) {
          let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+num+"Box'><label class='form-check-label' for='"+num+"Box'>"
          let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+num+"EditBox'><label class='form-check-label' for='"+num+"EditBox'><input type='number' id='"+num+"Input' style='width:75px;' min='0' value='"+item.amount+"' placeholder='"+item.amount+"'>";
          list += newAmount+" "+item.unit+" "+item.name; //how it displays: 5x bananas
          form += item.unit+" "+item.name+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
          list += "</label></div>";
          newList += list;
          newForm += form;
          let ingredient = {
              "num": num,
              "name": item.name,
              "amount": newAmount,
              "unit": item.unit
            };
          num+=1;
          current_basket.push(ingredient);
        }else {
          //delete from list
          //CHECK IF LIST IS EMPTY!!
        }
      });

        if (current_basket.length!=0) { //change
          document.getElementById("shopping").innerHTML = newList;
          document.getElementById("form").innerHTML = newForm;
          localStorage.setItem('storage',JSON.stringify(current_basket)); //new list is saved
        }else  {
          empty();
        }

    //} catch {
      //error
    //}
}

function remove() {
  let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
  //alert(storage);
  //console.log(storage);

  //try {
      const obj = JSON.parse(storage);

      let newList = "";
      let newForm = "";

      var current_basket = [];
      let num = 0;

      obj.forEach((item) => {

        let itemID = item.num+"Box";
        let itemID2 = item.num+"EditBox";
        let check = false;
        console.log(itemID);
        if (document.getElementById(itemID).checked||document.getElementById(itemID2).checked) {
          check = true;
        }
        //console.log(itemID+" "+itemID2+" "+check);

        if (check!=true) {
          let list = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+num+"Box'><label class='form-check-label' for='"+num+"Box'>"
          let form = "<div class='form-check m-3'><input class='form-check-input' type='checkbox' id='"+num+"EditBox'><label class='form-check-label' for='"+num+"EditBox'><input type='number' id='"+num+"Input' style='width:75px;' min='0' value='"+item.amount+"' placeholder='"+item.amount+"'>";
          list += item.amount+" "+item.unit+" "+item.name; //how it displays: 5x bananas
          form += item.unit+" "+item.name+"</label></div>" //for the form it is [5]x bananas where 5 is changeable
          list += "</label></div>";
          newList += list;
          newForm += form;

          let ingredient = {
              "num": num,
              "name": item.name,
              "amount": item.amount,
              "unit": item.unit
            };
          num+=1;
          current_basket.push(ingredient);
        }else {
          //delete from list
          //CHECK IF LIST IS EMPTY!
        }
      });
        if (current_basket.length!=0) {
          document.getElementById("shopping").innerHTML = newList;
          document.getElementById("form").innerHTML = newForm;
          localStorage.setItem('storage',JSON.stringify(current_basket)); //new list is saved
        }else  {
          empty();
        }
    //} catch {
      //error
    //}
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
  document.getElementById("share").classList.add("hide");
}
