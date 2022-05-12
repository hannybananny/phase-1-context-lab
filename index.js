function createEmployeeRecord([name, lastName, jobTitle, payRate]){
    let employeeRecord = {
        firstName: `${name}`,
        familyName: `${lastName}`,
        title: `${jobTitle}`,
        payPerHour: parseInt(`${payRate}`),
        timeInEvents: [],
        timeOutEvents: []
    }
     return employeeRecord
}

function createEmployeeRecords(employeeArrs){
    let newRecordArr = []
    employeeArrs.map(employee => {
        newRecordArr.push(createEmployeeRecord.call(this, employee))
    })
    return newRecordArr
}

function createTimeInEvent(dateStamp){
    let [date, hours] = dateStamp.split(" ")
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hours),
        date: date
    })

    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hours] = dateStamp.split(" ")
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hours),
        date: date
    })

    return this
}

function hoursWorkedOnDate(dateStamp){
    let timeInEvent = this.timeInEvents
    let timeOutEvent = this.timeOutEvents
  
    let timeInDate = timeInEvent.find(time => {
      return dateStamp === time.date
    })
    
    let timeOutDate = timeOutEvent.find(time => {
      return dateStamp === time.date
    })
    
    return timeOutDate.hour/100 - timeInDate.hour/100
}

function wagesEarnedOnDate(dateStamp){
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    let payRate = this.payPerHour;
    return parseInt(hoursWorked * payRate);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecordArr, firstName){
    return employeeRecordArr.find(employee => (employee.firstName === firstName))
}

function calculatePayroll(employeeArrs){
    let wagesArr = []
    
    employeeArrs.forEach(employee => {
        let allWages = allWagesFor.call(employee)
        wagesArr.push(allWages)
    })
      
        let payroll = wagesArr.reduce((a, b) => {
            return a + b;
          }, 0);

          return payroll
}

