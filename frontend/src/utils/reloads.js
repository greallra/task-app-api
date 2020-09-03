
export default ()=>{
    if (window.performance) {
        if (performance.navigation.type == 1) {
            return true
        } else {
            return false;
        }
    } 
}

