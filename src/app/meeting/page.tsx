import WeekViewCalendar from '../ui/week-view-calendar';

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl mb-4">Here are the common availabilities within your team</h1>
      <WeekViewCalendar />
    </div>
  );
}
