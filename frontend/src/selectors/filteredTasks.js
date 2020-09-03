import moment from 'moment';

//function that takes in the tasks and returns a filtered version
export default (tasks, {filterBy}) =>{ //filterOption is string
    console.log('filterBy',filterBy);
    let now = moment();
    if(tasks.length === 0){return [];}
    if(filterBy === '') {
        return [...tasks];
    }
    if(filterBy == 'Alphabetically'){
        return tasks.sort((a,b)=>{
            if(a.description > b.description) {
                return 1
            } else {
                return -1;
            }
        })
    }
    if(filterBy === 'last 24Hours') {
        let oneDayAgo = moment().subtract(1, 'days')
        return tasks.filter((task)=>moment(task.createdAt).isAfter(oneDayAgo));     
    }
    if(filterBy === 'last 3 days') {
        let threeDaysAgo = moment().subtract(3, 'days')
        return tasks.filter((task)=>moment(task.createdAt).isAfter(threeDaysAgo));     
    }
    if(filterBy === 'last week') {
        let oneWeekAgo = moment().subtract(7, 'days')
        return tasks.filter((task)=>moment(task.createdAt).isAfter(oneWeekAgo));     
    }
    if(filterBy === 'show all') {
        return tasks 
    }
    else {
        return []
     
    }
   
}

// export default (expenses, { text, sortBy, startDate, endDate }) => {
//   return expenses.filter((expense) => {
//     const createdAtMoment = moment(expense.createdAt);
//     const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
//     const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
//     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

//     return startDateMatch && endDateMatch && textMatch;
//   }).sort((a, b) => {
//     if (sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     } else if (sortBy === 'amount') {
//       return a.amount < b.amount ? 1 : -1;
//     }
//   });
// };
