"""Script to initialize a fresh database."""
import sqlite3

conn = sqlite3.connect('events.db')
cur = conn.cursor()

cur.execute('PRAGMA foreign_keys = ON;')

cur.execute('CREATE TABLE events(name TEXT, datetime TEXT, org TEXT, description TEXT, location TEXT)')

conn.commit()
conn.close()
