// create object to store the data types and variable names for props to be passed into meetingagnda
interface MeetingAgendaProps {
    title: string;
    time: string;
    duration: string;
    attendees: string;
    description: string;
    location: string;
    notes: string;
    // string list of action items
    actionItems: string[];
}



export default function MeetingAgenda( { title, time, duration, attendees, description, location, notes, actionItems }: MeetingAgendaProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Time: {time}</p>
      <p>Duration: {duration}</p>
      <p>Attendees: {attendees}</p>
      <p>Description: {description}</p>
      <p>Location: {location}</p>
      <p>Notes: {notes}</p>
      <p>Action Items: {actionItems}</p>
    </div>
  );
}