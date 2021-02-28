import React from 'react'



function EventList() {
  const eventList = [
    {
      id: 1,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Event 1',
      text: "Don't miss it",
    },
    {
      id: 2,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Event 2',
      text: "Don't miss it",
    },
    {
      id: 3,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Event 3',
      text: "Don't miss it",
    },
  ];
  return (
    <div style={{ textAlign: 'center', margin: '5rem 0' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Events</h2>
      <ul className="main_list events">
        {eventList.map((event) => (
          <li key={event.id}>
            <img src={event.image} alt="event"/>
            <p style={{ fontWeight: 'bold' }}>{event.name}</p>
            <span style={{ fontSize: '0.8rem' }}>{event.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;