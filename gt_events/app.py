"""Prototype flask component."""
import flask
import queries

app = flask.Flask(__name__)


@app.route('/')
def eventslist():
    """Draw the events list with test data."""
    events = queries.list_events()
    events = [Event(*event) for event in events]
    return flask.render_template('test.html', events=events)


class Event:
    """Information holding class representing an event."""

    rowid = 0
    name = ''
    datetime = ''
    org = ''

    def __init__(self, rowid, name, datetime, org):
        """Construct an Event object."""
        self.rowid = rowid
        self.name = name
        self.datetime = datetime
        self.org = org
