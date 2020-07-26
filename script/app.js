//Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const gitHub = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){

    let username = nameInput.value.trim();
    if(username === ""){
        alert("Lütfen Geçerli Bir Kullanıcı Adı Giriniz");
    }
    else{
        gitHub.getGithubData(username)
        .then(response => 
            {
                if(response.user.message === "Not Found")
                {
                    //Hata Mesajı
                    ui.showError("Kullanıcı Bulunamadı");
                }
                else{
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                    console.log(response);
                }
            })
        .catch (err =>ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
 //Tüm Arananları Temizler
  if(confirm("Emin misiniz?")){
     Storage.clearAllSearchesFromStorage();
     ui.clearAllSearchedfromUI();
  }
}

function getAllSearched(){
    //Arananları Storeagen al UI'yda göster
    let result ="";
    let users = Storage.getSearchedUsersFromStorage();
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML=result;
}