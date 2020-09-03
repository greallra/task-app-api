export function checkLsForToken(){
    try {
        const token = localStorage.getItem('token');
        if(token){
            return token;
        } 
    } catch (e) {
        console.log("checkForUser e: nothing found in local storage");
    }
}
export function clearToken (){
    localStorage.removeItem('token');
}
export function setTokenLS (token){
    localStorage.setItem('token', token);
}
export function checkForTasks(){
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
            return tasks;
        }
        
    } catch (e) {
        console.log("checkForTasks e", e);
    }
}