"""Script to initialize a fresh database."""
import sqlite3
from queries import add_event

conn = sqlite3.connect('events.db')
cur = conn.cursor()

cur.execute('PRAGMA foreign_keys = ON;')

cur.execute('CREATE TABLE events(name TEXT, datetime TEXT, org TEXT, description TEXT, location TEXT)')

conn.commit()
conn.close()

# Add a bunch of fake events for testing purposes. Remove later
add_event(
    'Pizza Party 2017',
    '2017-04-14 18:00',
    'GT Pizza Society',
    'Come eat pizza with us!',
    'Student Center Ballroom'
)
add_event(
    'GT Webdev Meeting',
    '2017-04-10 18:30',
    'GT WebDev Club',
    'This week, we\'re gonna use javascript or something',
    'College of Computing Building'
)
add_event(
    'GITMAD Meeting',
    '2017-04-12 18:00',
    'GITMAD',
    'We do stuff with android',
    'College of Computing Building'
)
add_event(
    'GT Spring Game',
    'TBA',
    'GT Athletics',
    'FOOTBALL!',
    'Bobby Dodd Stadium'
)
add_event(
    'Underwater Basket Weaving Competition',
    '2017-04-15 13:00',
    'Underwater Basket Weaving Club',
    'Come explore the intersectional art form of underwater basket weaving!',
    'Campus Recreation Center'
)
add_event(
    '( ͡° ͜ʖ ͡°)',
    '2017-04-20 16:20',
    'That Guy',
    '...',
    'Skiles Garden'
)
add_event(
    'Atlanta Falcons Day',
    '2017-03-28',
    'Atlanta Falcons Day Awareness Society',
    'The Falcons blew a 28-3 Lead.',
    'Campus Wide'
)
add_event(
    'LUG InstallFest',
    '2017-04-23 18:30',
    'GT Linux Users Group',
    "We'll help you escape windows",
    'Student Center Ballroom'
)
add_event(
    'Semester Ends',
    '2017-05-05',
    'Georgia Institute of Technology',
    "We'll spare you, for now",
    'Anywhere but here'
)
add_event(
    'Patriots\' Day',
    '2017-04-17',
    'Commonwealth of Massachusetts',
    "This isn't about the football team. Please don't be mad at us.",
    'FROM SEA TO SHINING SEA'
)
add_event(
    'Community Dinner',
    '2017-04-16 18:30',
    'GT Catholic Student Organization',
    'Free food and stuff',
    'GT Catholic Center'
)
add_event(
    'Pizza Party 2017 II',
    '2017-04-24 18:00',
    'GT Pizza Society',
    'Come eat pizza with us-- again!',
    'Student Center Ballroom'
)
add_event(
    'HackGT',
    '2017-03-20',
    'HackGT',
    'Hack things! Don\t sleep!',
    'Klaus'
)
add_event(
    'Capstone Expo',
    '2017-04-30 14:00',
    'GT College of Engineering',
    'Some of this stuff is kinda neat',
    'Student Center Ballroom'
)
add_event(
    'Swing Dance',
    '2017-04-20 19:00',
    'GT Swing Dancing Club',
    'Dance around like crazed Texans',
    'Student Center Ballroom'
)
add_event(
    'CyberSecurity Talk',
    '2017-04-12 12:00',
    'GT College of Computing',
    'Everything is broken beyond repair and your data has been hacked.',
    'Klaus'
)
add_event(
    'Midnight Bud',
    '2017-04-024 22:00',
    'Unidentified Musical Enthusiasts',
    'IT\'S MIDNIGHT BUD!!!!!!',
    'Brittain Dining Hall'
)
add_event(
    'Taste of Latin America',
    '2017-04-07 17:00',
    'Society of Hispanic Professional Engineers',
    "I don't actually know what this event is, but there's music and food",
    'Student Center'
)
add_event(
    'Therapy Dogs',
    '2017-05-02 11:00',
    'GT Counseling Center',
    'Apparently you can\'t handle finals, so here\'s some PTSD dogs',
    'GT Library'
)
add_event(
    'GT Music Showcase',
    '2017-03-31 19:00',
    'Musicians Network',
    'A bunch of student musicians playing music',
    'Under the Couch'
)
