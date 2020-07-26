class Storage {
    static getSearchedUsersFromStorage()
    {
        //Tüm kullanıcıları Al
        let users;
        if(localStorage.getItem("searched")== null)
        {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        let users = this.getSearchedUsersFromStorage();
        
        //indexof -1 = array içinde yok 
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchesFromStorage(){
        //Tüm Kullanıcıları Silme
        localStorage.removeItem("searched");
    }
}