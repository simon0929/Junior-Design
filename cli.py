"""Command line interface for the Team 7140 GT Event Finder Prototype."""
import argparse
import queries


def main():
    """Implementation of CL."""
    parser = argparse.ArgumentParser(
        description="Prototype interface to GT events listing.",
        usage='usage: gt-events {list,add,get}'
    )
    subparsers = parser.add_subparsers(dest="subparser_name")

    # list-events parser
    parse_list = subparsers.add_parser(
        'list',
        usage='usage: gt-events list',
        description='List events in the database.'
    )
    parse_list.set_defaults(func=list_func)

    # get-event parser
    parse_get = subparsers.add_parser(
        'get',
        usage='usage: gt-events get [EVENT_ID]',
        description='Pull a single event from the database.'
    )
    parse_get.add_argument(
        'event_id',
        nargs=1,
        metavar='EVENT_ID',
        help='Index of event in events table.'
    )
    parse_get.set_defaults(func=get_func)

    # Add-event parser
    parse_add = subparsers.add_parser(
        'add',
        usage='usage: gt-events add NAME TIME ORG DESCRIPTION LOCATION',
        description='Add an event event to the database.'
    )
    parse_add.add_argument(
        'name',
        nargs=1,
        metavar='NAME',
        help='Human-readable name of event.'
    )
    parse_add.add_argument(
        'time',
        nargs=1,
        metavar='TIME',
        help='ISO 8601 compliant timestamp'
    )
    parse_add.add_argument(
        'org',
        nargs=1,
        metavar='ORG',
        help="Organization hosting the event"
    )
    parse_add.add_argument(
        'description',
        nargs=1,
        metavar='DESCRIPTION',
        help="Longer description of the event"
    )
    parse_add.add_argument(
        'location',
        nargs=1,
        metavar='LOCATION',
        help="Where the event is being held."
    )
    parse_add.set_defaults(func=add_func)

    # CLI processing
    cli_args = parser.parse_args()
    if (cli_args.subparser_name is None):
        print(parser.description + '\n' + parser.usage)
    else:
        try:
            cli_args.func(cli_args)
        except (ValueError, AttributeError) as e:
            print(e)


def list_func(args):
    """Print a list of all events in the database."""
    events = queries.list_events()
    for event in events:
        print(u"[{}] {}".format(*event))


def add_func(args):
    """Add a new event to the database."""
    # try:
    queries.add_event(args.name[0], args.time[0], args.org[0], args.description[0], args.location[0])
    print(u"\"{}\" added to events listing.".format(args.name[0]))
    # except (ValueError) as e:
    #     print(e)


def get_func(args):
    """Return a specific event from the database."""
    try:
        event_data = queries.get_event(args.event_id[0])
    except (ValueError) as e:
        print(e)
    print(
        u"*** {} ***\n".format(event_data[0]) +
        u"Hosted by the {} \n".format(event_data[2]) +
        u"{}\n{}\n\n".format(event_data[1], event_data[4]) +
        u"{}".format(event_data[3])
    )

if __name__ == '__main__':
    main()
