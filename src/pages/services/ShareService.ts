export class ShareService {  
  
    username: string;
 
    constructor() {
        this.username = 'Blank';
    }
  
    setUserName(uname) {
        this.username = uname;       
    }
  
    getUserName() {
        return this.username;
    }   
}