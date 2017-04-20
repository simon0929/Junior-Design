"""Prototype flask component."""
import flask
import queries

app = flask.Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/events/')
def events_list():
    """Draw the events list with test data."""
    events = queries.list_events()
    events = [Event(*event) for event in events]
    return flask.render_template('eventslist.html', events=events)


@app.route('/events/<event_id>')
def event_details(event_id):
    """Render event details."""
    event = Event(*queries.get_event(event_id))
    # print(event.name + '\n')
    return flask.render_template('eventdetails.html', event=event)


class Event:
    """Information holding class representing an event."""

    rowid = 0
    name = ''
    datetime = ''
    org = ''
    description = ''
    location = ''

    def __init__(self, rowid, name, datetime, org, description, location):
        """Construct an Event object."""
        self.rowid = rowid
        self.name = name
        self.datetime = datetime
        self.org = org
        self.description = description
        self.location = location
