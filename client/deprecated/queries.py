"""Python wrapper around SQLite Queries."""
import sqlite3


def add_event(name, datetime, org, description, location):
    """Add a new event to the database."""
    conn = sqlite3.connect('events.db')
    cur = conn.cursor()

    event_info = [name, datetime, org, description, location]
    cur.execute('INSERT INTO events VALUES (?,?,?,?,?)', event_info)

    conn.commit()
    conn.close()


def list_events():
    """Get a list of all events in the database."""
    conn = sqlite3.connect('events.db')
    cur = conn.cursor()

    cur.execute('SELECT rowid ,name, datetime, org, description, location  FROM events')
    res = cur.fetchall()

    conn.commit()
    conn.close()

    return res


def get_event(rowid):
    """Pull down details of a specific event by its rowid."""
    conn = sqlite3.connect('events.db')
    cur = conn.cursor()

    cur.execute('SELECT rowid, * FROM events WHERE rowid=?', [rowid])
    res = cur.fetchone()

    conn.commit()
    conn.close()

    return res
