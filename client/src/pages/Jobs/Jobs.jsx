import React from 'react'
import JobsLayout from './JobsLayout'

const Jobs = () => {

  const jobDetail = [
    {
      'job_id': '1',
      'designation': "Python developer",
      'company': 'Celebal',
      'location': "Jaipur",
      'job_type': "Remote",
      'description': 'Hii cnjasnjbb bjhb  detaildetaildetaildetaildetaildetaild etaild etaild  e t ai ld e tai ld eta i lde ta i lde t ai l de ta i l det a ildet  a i ld e tai l deta il de t ai l d et ai l d e t ai l d et    a il d et a il d et a il de t ai l de tai  ld e ta il de t ail detaildetaildetaildetaildetaildetail  detaildet   a i ldetaildetaildetaildetaildetail  de t ai l de t ai l det a i ld e ta ilde ta  ild e ta i ld e ta ildetaildetaildetaildetaildetaildetaildetail',
      'posted_by': 'Nikhil'
    },
    {
      'job_id': '2',
      'designation': "Java developer",
      'company': 'Celebal',
      'location': "Jaipur",
      'job_type': 'Remote',
      'description': 'Hii cnjasnjbb bjhb  detaildetaildetaildetaildetaildetaild etaild etaild  e t ai ld e tai ld eta i lde ta i lde t ai l de ta i l det a ildet  a i ld e tai l deta il de t ai l d et ai l d e t ai l d et    a il d et a il d et a il de t ai l de tai  ld e ta il de t ail detaildetaildetaildetaildetaildetail  detaildet   a i ldetaildetaildetaildetaildetail  de t ai l de t ai l det a i ld e ta ilde ta  ild e ta i ld e ta ildetaildetaildetaildetaildetaildetaildetail',
      'posted_by': 'Pawan'
    },
    {
      'job_id': '3',
      'designation': "Python developer",
      'company': 'Celebal',
      'location': "Jaipur",
      'job_type': "Remote",
      'description': 'Hii cnjasnjbb bjhb  detaildetaildetaildetaildetaildetaild etaild etaild  e t ai ld e tai ld eta i lde ta i lde t ai l de ta i l det a ildet  a i ld e tai l deta il de t ai l d et ai l d e t ai l d et    a il d et a il d et a il de t ai l de tai  ld e ta il de t ail detaildetaildetaildetaildetaildetail  detaildet   a i ldetaildetaildetaildetaildetail  de t ai l de t ai l det a i ld e ta ilde ta  ild e ta i ld e ta ildetaildetaildetaildetaildetaildetaildetail',
      'posted_by': 'Nikhil'
    },
    {
      'job_id': '4',
      'designation': "Java developer",
      'company': 'Celebal',
      'location': "Jaipur",
      'job_type': 'Remote',
      'description': 'Hii cnjasnjbb bjhb  detaildetaildetaildetaildetaildetaild etaild etaild  e t ai ld e tai ld eta i lde ta i lde t ai l de ta i l det a ildet  a i ld e tai l deta il de t ai l d et ai l d e t ai l d et    a il d et a il d et a il de t ai l de tai  ld e ta il de t ail detaildetaildetaildetaildetaildetail  detaildet   a i ldetaildetaildetaildetaildetail  de t ai l de t ai l det a i ld e ta ilde ta  ild e ta i ld e ta ildetaildetaildetaildetaildetaildetaildetail',
      'posted_by': 'Pawan'
    },
  ]

  return (
    <>
      <JobsLayout jobDetail={jobDetail} />
    </>
  )
}

export default Jobs