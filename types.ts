interface Group {
  users: User[]
  leader: User
  arrangement_period: TimeSet // There can only exist one 'arrangement period' at a time
  time_sets: TimeSet[]
  meetings: Meeting[]
}

interface User{
  username: string
  email: string
}

interface TimeSet {
  user: User
  times: Period[]
}

interface Period {
  startDatetime: Date
  endDatetime: Date
}

interface Meeting {
  meetingPeriod: Period
  meetingDocuments: MeetingDocument[]
  attendees: User[]
}


// For meeting documents

interface MeetingDocument {
  sections: Section[]
}

interface Section {
  points: Points[]
}

interface Points {
  text: string
  checkable: boolean
  checked: boolean
}

// END For meeting documents
