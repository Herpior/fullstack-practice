window.onload = () => {
    createForm();
    getContactList();
}
var mode = 0;
changeToEditMode = (contact) => {
    mode = contact.id;
    let firstname = document.getElementById("fnameinput");
    let lastname = document.getElementById("lastnameinput");
    let email = document.getElementById("emailinput");
    let phone = document.getElementById("phoneinput");
    let submitbutton = document.getElementById("submitbutton");
    firstname.value = contact.firstname;
    lastname.value = contact.lastname;
    email.value = contact.email;
    phone.value = contact.phone;
    submitbutton.value = "Save";
    
}
changeToAddMode = () => {
    mode = 0;
    let firstname = document.getElementById("firstnameinput");
    let lastname = document.getElementById("lastnameinput");
    let email = document.getElementById("emailinput");
    let phone = document.getElementById("phoneinput");
    let submitbutton = document.getElementById("submitbutton");
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    phone.value = "";
    submitbutton.value = "Add";
}
createForm = () => {
    let anchor = document.getElementById("anchor");
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    // firstname
    let fnameinput = document.createElement("input");
    let fnamelabel = document.createElement("label");
    fnameinput.setAttribute("type", "text");
    fnameinput.setAttribute("name", "fnameinput");
    fnameinput.setAttribute("id", "fnameinput");
    fnamelabel.setAttribute("for", "fnameinput");
    fnamelabel.setAttribute("id", "fnamelabel");
    let fnametext = document.createTextNode("First Name: ");
    fnamelabel.appendChild(fnametext);
    // lastname
    let lastnameinput = document.createElement("input");
    let lastnamelabel = document.createElement("label");
    lastnameinput.setAttribute("type", "text");
    lastnameinput.setAttribute("name", "lastnameinput");
    lastnameinput.setAttribute("id", "lastnameinput");
    lastnamelabel.setAttribute("for", "lastnameinput");
    lastnamelabel.setAttribute("id", "lastnamelabel");
    let lastnametext = document.createTextNode("Last Name: ");
    lastnamelabel.appendChild(lastnametext);
    // email
    let emailinput = document.createElement("input");
    let emaillabel = document.createElement("label");
    emailinput.setAttribute("type", "email");
    emailinput.setAttribute("name", "emailinput");
    emailinput.setAttribute("id", "emailinput");
    emaillabel.setAttribute("for", "emailinput");
    emaillabel.setAttribute("id", "emaillabel");
    let emailtext = document.createTextNode("Email: ");
    emaillabel.appendChild(emailtext);
    // phone
    let phoneinput = document.createElement("input");
    let phonelabel = document.createElement("label");
    phoneinput.setAttribute("type", "tel");
    phoneinput.setAttribute("name", "phoneinput");
    phoneinput.setAttribute("id", "phoneinput");
    phonelabel.setAttribute("for", "phoneinput");
    phonelabel.setAttribute("id", "phonelabel");
    let phonetext = document.createTextNode("Phone: ");
    phonelabel.appendChild(phonetext);

    let submitbutton = document.createElement("input");
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("value", "Add");
    submitbutton.setAttribute("id", "submitbutton");

    let br = document.createElement("br");


    form.appendChild(fnamelabel);
    form.appendChild(fnameinput);
    form.appendChild(br);
    form.appendChild(lastnamelabel);
    form.appendChild(lastnameinput);
    form.appendChild(br.cloneNode());
    form.appendChild(emaillabel);
    form.appendChild(emailinput);
    form.appendChild(br.cloneNode());
    form.appendChild(phonelabel);
    form.appendChild(phoneinput);
    form.appendChild(br.cloneNode());
    form.appendChild(submitbutton);

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        addToList();
    })

    anchor.appendChild(form);
}

addToList = async () => {
    let fname = document.getElementById("fnameinput");
    let lastname = document.getElementById("lastnameinput");
    let email = document.getElementById("emailinput");
    let phone = document.getElementById("phoneinput");
    let contact = {
        "firstname":fname.value,
        "lastname": lastname.value,
        "email": email.value,
        "phone": phone.value
    }
    let method = "POST";
    let url = "/api/contact";
    console.log(mode);
    if (mode) {
        method = "PUT";
        url = "/api/contact/" + mode;
    }
    let request = {
        "method":method,
        "mode":"cors",
        "headers":{"Content-type":"application/json"},
        "body":JSON.stringify(contact)
    }
    let response  = await fetch(url, request);
    if(response && response.ok){
        fname.value = "";
        lastname.value = "";
        email.value = "";
        phone.value = "";
        getContactList();
        if(mode){
            changeToAddMode();
        }
    } else {
        console.log("Server response: "+response.status);
    }
}

getContactList = async () => {
    let request = {
        "method": "GET",
        "mode": "cors",
        "headers": { "Content-type": "application/json" }
    }
    let response = await fetch("/api/contact", request);
    if (response && response.ok) {
        let data = await response.json();
        createContactTable(data);
    } else {
        console.log("Failed to load contacts, Server response: " + response.status);
    }
}

createContactTable = (data) => {
    let anchor = document.getElementById("anchor");
    let oldTable = document.getElementById("table");
    if(oldTable){
        anchor.removeChild(oldTable);
    }
    let table = document.createElement("table");
    table.setAttribute("id", "table");

    let header = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let firstnameheader = document.createElement("th");
    let firstnametexth = document.createTextNode("First Name");
    firstnameheader.appendChild(firstnametexth);
    let lastnameheader = document.createElement("th");
    let lastnametexth = document.createTextNode("Last name");
    lastnameheader.appendChild(lastnametexth);
    let emailheader = document.createElement("th");
    let emailtexth = document.createTextNode("Email");
    emailheader.appendChild(emailtexth);
    let phoneheader = document.createElement("th");
    let phonetexth = document.createTextNode("Phone");
    phoneheader.appendChild(phonetexth);
    let removeheader = document.createElement("th");
    let removetexth = document.createTextNode("Remove");
    removeheader.appendChild(removetexth);
    let editheader = document.createElement("th");
    let edittexth = document.createTextNode("Edit");
    editheader.appendChild(edittexth);

    headerRow.appendChild(firstnameheader);
    headerRow.appendChild(lastnameheader);
    headerRow.appendChild(emailheader);
    headerRow.appendChild(phoneheader);
    headerRow.appendChild(removeheader);
    headerRow.appendChild(editheader);
    header.appendChild(headerRow);
    table.appendChild(header);

    let body = document.createElement("tbody");
    data.forEach((obj)=>{
        let row = document.createElement("tr");
        for (x in obj){
            if(x === "id"){
                continue
            }
            let tablecell = document.createElement("td");
            let celltext = document.createTextNode(obj[x]);
            tablecell.appendChild(celltext);
            row.appendChild(tablecell);
        }
        
        let removecell = document.createElement("td");
        let removebutton = document.createElement("input");
        removebutton.setAttribute("type", "button");
        removebutton.setAttribute("value", "Remove");
        removebutton.setAttribute("name", obj.id);
        removebutton.addEventListener("click", ()=>removeContact(obj.id));
        removecell.appendChild(removebutton);
        let editcell = document.createElement("td");
        let editbutton = document.createElement("input");
        editbutton.setAttribute("type", "button");
        editbutton.setAttribute("value", "Edit");
        //editbutton.setAttribute("name", obj.id);
        editbutton.addEventListener("click", () => changeToEditMode(obj));
        editcell.appendChild(editbutton);

        row.appendChild(removecell);
        row.appendChild(editcell);

        body.appendChild(row);

    })
    table.appendChild(body);
    anchor.appendChild(table);
}

removeContact = async (id) => {
    let request = {
        "method":"DELETE",
        "mode":"cors",
        "headers":{"content-type":"application/json"}
    }
    let response = await fetch("/api/contact/"+id, request);
    if (response.ok){
        getContactList();
    } else {
        console.log("Failed to delete, Server response: " + response.status);
    }
}
