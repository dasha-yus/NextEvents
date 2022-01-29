import { Fragment } from "react/cjs/react.production.min";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "./../../components/event-detail/event-summary";
import EventLogistics from "./../../components/event-detail/event-logistics";
import EventContent from "./../../components/event-detail/event-content";

const EventDetailPage = (props) => {
  const { event } = props;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: paths,
    fallback: true, // true - у нас могут быть и другие events, помимо тех, которые в paths
                    // false - paths содержит все нужные id  других не предвидется => 404
                    // 'blocking' - страница не отрисуется, пока не подгрузятся все данные
  };
}

export default EventDetailPage;
