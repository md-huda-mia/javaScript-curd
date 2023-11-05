
let regForm = document.querySelector('.register-form');
let allInput = document.querySelectorAll('INPUT');
let allBtn = regForm.querySelectorAll('BUTTON');
let closeBtn = document.querySelector('.btn-close');
let regList = document.querySelector('.reg_list')
let addBtn = document.querySelector('.add-btn')
let searchEl = document.querySelector('.search')
let allRegData = [];


//===============================
//====== reading profile data
allInput[6].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[6].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
    }
}
//===============================
//====== add form input data
regForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allRegData.find((data) => data.email === allInput[2].value);
    if (checkEmail === undefined) {
        allRegData.push({
        name: allInput[1].value,
        email: allInput[2].value,
        mobile: allInput[3].value,
        dob: allInput[4].value,
        password: allInput[5].value,
        profile: url 
        })
        localStorage.setItem('allRegData', JSON.stringify(allRegData));
        swal('Data Inserted', 'Successfully', 'success');
        closeBtn.click();
        regForm.reset();
        getRedData();
    } else {
        swal('Email Allready Existed','Failed','warning')
    }
    

}
//===============================
//====== save local-storage
if (localStorage.getItem('allRegData') != null) {
    allRegData=JSON.parse(localStorage.getItem('allRegData'))
}

//=====================================
// ** localStorage data Read & Show data
//=====================================
const getRedData = () => {
    regList.innerHTML = '';
    allRegData.forEach((data, index) => {
        let dataStr = JSON.stringify(data);
        let dataUpdate = dataStr.replace(/"/g,"'")
        regList.innerHTML += `
        <tr>
        <td>${index+1}</td>
        <td> <img class="rounded-circle" src=${data.profile} width="40" alt=""> </td>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.mobile}</td>
        <td>${data.dob}</td>
        <td>
            <button data="${dataUpdate}" index=${index} class="edit-btn border-0 bg-primary text-white rounded"><i
                    class="fa fa-edit"></i></button>
            <button index=${index} class="del-btn border-0 bg-danger text-white rounded"><i
                    class="fa fa-trash"></i>
            </button>
        </td>
        </tr>
        `;
    })
    action();
}


const action = () => {
    // delete btn 
    let deleteItem = regList.querySelectorAll('.del-btn');
    for (let btn of deleteItem) {
        btn.onclick = async () => {
            let isConfirm = await confirm();
            if (isConfirm) {
                let delBtn = btn.getAttribute('index')
                allRegData.splice(delBtn, 1);
                localStorage.setItem('allRegData', JSON.stringify(allRegData));
                getRedData()
            }
        }
    }

    // update btn
    let updateBtn = regList.querySelectorAll('.edit-btn');
    for (let btn of updateBtn) {
        btn.onclick = () => {
            let editIndex = btn.getAttribute('index');
            let dataStr = btn.getAttribute('data');
            let dataUpdate = dataStr.replace(/'/g, '"');
            let data = JSON.parse(dataUpdate)
            console.log(data)
            addBtn.click();
            allInput[1].value = data.name;
            allInput[2].value = data.email;
            allInput[3].value = data.mobile;
            allInput[4].value = data.dob;
            allInput[5].value = data.password;
            url = data.profile;
            allBtn[0].disabled = false;
            allBtn[1].disabled = true;

            allBtn[0].onclick = () => {
                allRegData[editIndex]={
                    name: allInput[1].value,
                    email: allInput[2].value,
                    mobile: allInput[3].value,
                    dob: allInput[4].value,
                    password: allInput[5].value,
                    profile: url
                }
                localStorage.setItem('allRegData', JSON.stringify(allRegData));
                swal('Data Updated', 'Successfully', 'success');
                closeBtn.click();
                regForm.reset();
                getRedData();
            }
        }

    }

}
getRedData();


// let confirm
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                resolve(true)
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              } else {
                  reject(false)
              swal("Your imaginary file is safe!");
            }
          }); 
    });
}


// searching data
searchEl.oninput = () => {
    search();
}

const search = () => {
    let value = searchEl.value.toLowerCase()
    alert(value)
}
