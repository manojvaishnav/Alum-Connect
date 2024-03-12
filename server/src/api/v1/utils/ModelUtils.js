
//------------ Define the structure of the college types
const INSTITUTE_TYPE = Object.freeze({
    COLLEGE:'college',
    UNIVERSITY:'university'
})


//--------- Define the status, for all over same
const STATUS_TYPE  = Object.freeze({
    PROGRESS : 'progress',
    ACTIVE:'active',
    BLOCKED:'blocked',
})

//-------------- Define the users
const USER_TYPE = Object.freeze({
    STUDENT : 'student',
    ALUMNI : 'alumni',
    ADMIN : 'admin',
})

module.exports = {INSTITUTE_TYPE,STATUS_TYPE,USER_TYPE};