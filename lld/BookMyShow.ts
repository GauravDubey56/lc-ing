/*

-CinemaHall (name, cityId)
-MovieScreen (name, cinemaHallId, totalSeats)
-Movie (name, duration)
-MovieShow (movieId, screenId, startTime, endTime)
-Seat (screenId, row, column)
-City (cityId, name)
-User (userId, name)
-Ticket (ticketId, userId, movieShowId, seatId, bookingDate)

*/
function createArray(N: number) {
    return Array.from({ length: N }, (_, i) => i + 1);
}

function getSeatId (row: number, col: number): string {
    return `${row}-${col}`;
}

const ID_COUNTER = {
    cinema: 1,
    screen: 1,
    movie: 1,
    show: 1,
    city: 1,
    user: 1,
    ticket: 1
};
class CinemaHall {
    cinemaHallId: number;
    name: string;
    screenCount: number;
    cityId: number;
    constructor (name: string, cityId: number, screenCount: number) {
        this.name = name;
        this.cityId = cityId;
        this.screenCount = screenCount;
        this.cinemaHallId = ID_COUNTER.city;
        ID_COUNTER.cinema += 1;
    }
};

class MovieScreen {
    movieScreenId: number;
    name: string;
    cinemaHallId: number;
    totalSeats: number;
    screenRow: number;
    screenColumn: number;
    constructor (name: string, cinemaHallId: number, screenRow: number, screenColumn: number) {
        this.name = name;
        this.cinemaHallId = cinemaHallId;
        this.screenColumn = screenColumn;
        this.screenRow = screenRow;
        this.totalSeats = screenColumn * screenRow;
        this.movieScreenId = ID_COUNTER.screen;
        ID_COUNTER.screen += 1;
    }
}

class Movie {
    name: string;
    duration: number;
    movieId: number;
    constructor (name: string, duration: number) {
        this.name = name;
        this.duration = duration;
        this.movieId = ID_COUNTER.movie;
        ID_COUNTER.movie += 1;
    }
}

class MovieShow {
    showId: number;
    movieId: number;
    movieScreenId: number;
    startTime: number;
    endTime: number;

    constructor (movieId: number, movieScreenId: number, startTime: number, endTime: number) {
        this.movieId = movieId;
        this.movieScreenId = movieScreenId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.showId = ID_COUNTER.show;
        ID_COUNTER.show += 1;
    }

    getAvailableSeats (screens: MovieScreen[], tickets: Ticket[]) {
      const showTickets = tickets.filter(
        (ticket) => ticket.showId === this.showId
      );
      const bookedSeats = showTickets.map((ticket) =>
        getSeatId(ticket.row, ticket.column)
      );
      const bookedSeatsSet = new Set(bookedSeats);
      const showScreen = screens.find(
        (screen) => screen.movieScreenId === this.movieScreenId
      );
      if (!showScreen) {
        return [];
      }
      const rows = createArray(showScreen.screenRow);
      const columns = createArray(showScreen.screenColumn);
      const totalSeatsInShow: string[]= [];
      rows.forEach((row) => {
        columns.forEach((column) => {
            const seatId = getSeatId(row, column);
            totalSeatsInShow.push(seatId);
        });
      });
      const availableSeats = totalSeatsInShow.filter(seat => !bookedSeatsSet.has(seat));
      return availableSeats;
    }
    getSeatsForBooking (ticketCount: number, screens: MovieScreen[], tickets: Ticket[], userId: number) {
        const availableSeats = this.getAvailableSeats(screens, tickets);
        const seatsForBooking = availableSeats.splice(ticketCount);
        if (availableSeats.length < ticketCount) {
            return {
                bookedTickets: [],
                seatsForBooking
            }
        }

        const bookedTickets =  seatsForBooking.map(seat => {
            const [row, column] = seat.split("-");
            const ticket = new Ticket(this.showId, userId, Number(row), Number(column));
            return ticket;
        });
        return {
            bookedTickets,
            seatsForBooking
        }
    }
}

class City {
    name: string;
    cityId: number;
    constructor (name: string) {
        this.name = name;
        this.cityId = ID_COUNTER.city;
        ID_COUNTER.city += 1;
    }
}

class User {
    name: string;
    userId: number;
    cityId: number;
    constructor (name: string, cityId: number) {
        this.name = name;
        this.userId = ID_COUNTER.user;
        ID_COUNTER.user += 1;
        this.cityId = cityId;
    }
}

class Ticket {
    ticketId: number;
    userId: number;
    showId: number;
    row: number;
    column: number;
    constructor (showId: number, userId: number, row: number, column: number) {
        this.userId = userId;
        this.showId = showId;
        this.row = row;
        this.column = column;
        this.ticketId = ID_COUNTER.ticket;
        ID_COUNTER.ticket += 1;
    }
}
class Util {
    startTime: Date;
    log (...args: any[]) {
        console.log(args.join(" "));
    }
    error (...args: any[]) {
        console.log(args.join(" "));
    }
    constructor () {
        this.startTime = new Date();
    } 
}
class BookingSystem {

    cinemaHalls: CinemaHall[] = [];   
    movieScreens: MovieScreen[] = [];
    users: User[] = [];
    cities: City[] = [];
    shows: MovieShow[] = [];
    movies: Movie[] = [];
    tickets: Ticket[] = [];
    util: Util;

    constructor(util: Util) {
        console.log('System initiated');
        this.util = util;
    }

    static validateShowTime (showTime: string) {
        const parts = showTime.split(":");
        const hour = Number(parts[0]);
        const minute = Number(parts[1]);
        if (Number.isNaN(hour) || !(hour >= 0 && hour <= 23)) {
            return false;
        }
        if (Number.isNaN(minute) || !(minute >= 0 && minute <= 59)) {
            return false;
        }
        return true;
    }

    addCity (name: string) {
        const city = new City(name);
        this.cities.push(city);
        return true;
    }
    
    addUser (name: string, cityId: number) {
        const user = new User(name, cityId);
        this.users.push(user);
        return true;
    }

    addCinema (name: string, cityId: number, screenCount: number, screeRow: number, screenColumn: number) {
        const city = this.cities.find(city => city.cityId === cityId);
        if (!city) {
            this.util.error(`City ID ${cityId} does not exist`);
            return;
        }
        const cinema = new CinemaHall(name, cityId, screenCount);
        this.cinemaHalls.push(cinema);

        const movieScreen = new MovieScreen(
          `${cinema.cinemaHallId}-SCREEN`,
          cinema.cinemaHallId,
          screeRow,
          screenColumn
        );
        this.movieScreens.push(movieScreen);
        return true;
    }

    addMovie (movieName: string, duration: number) {
        const movie = new Movie(movieName, duration);
        this.movies.push(movie);
        return true;
    }

    addShow (movieId: number, screenId: number, startTime: number, endTime: number) {
        const movie = this.movies.find(movie => movie.movieId === movieId);
        if (!movie) {
            this.util.error(`Movie ${movieId} not found`);
            return false;
        }
        const screen = this.movieScreens.find(screen => screen.movieScreenId === screenId);
        if (!screen) {
            this.util.error(`Screen ${screenId} not found`);
            return false;
        }
        const show = this.shows.find(show => show.movieId === movieId && show.movieScreenId === screenId);
        if (show) {
            this.util.error(`Show ${show.showId} alread exists for this movie and screen`);
            return false;
        }
        const overlappingShow = this.shows.find(show => show.endTime > startTime || show.startTime < endTime);
        if (overlappingShow) {
            this.util.error(`Show has overlapping timings`);
            return false;
        }
        const newShow = new MovieShow(movieId, screenId, startTime, endTime);
        this.shows.push(newShow);
        return true;
    }

    bookTicket (userId: number, showId: number, ticketCount: number) {
        const user = this.users.find(user => user.userId === userId);
        if (!user) {
            this.util.error(`User does not exist`);
            return false;
        }
        const show = this.shows.find(show => show.showId === showId);
        if (!show) {
            this.util.error(`Show does not exist`);
            return false;
        }
        const ticket = this.tickets.find(ticket => ticket.showId == showId || ticket.userId);
        if (ticket) {
            this.util.error(`Ticket already booked`);
            return false;
        }
        const availableSeats = show.getSeatsForBooking(ticketCount, this.movieScreens, this.tickets, userId);
        this.tickets.push(...availableSeats.bookedTickets);
        return availableSeats.seatsForBooking;
    }

    cancelTicket (ticketId: number) {
        const ticket = this.tickets.find(ticket => ticket.ticketId === ticketId);
        if (!ticket) {
            return false;
        }
        this.tickets = this.tickets.filter(ticket => ticket.ticketId !== ticketId);
        return false;
    }

    getFreeSeatsCount (showId: number) {
        const show = this.shows.find(show => show.showId === showId);
        if (!show) {
            return 0;
        }
        const seats = show.getAvailableSeats(this.movieScreens, this.tickets);
        return seats.length;
    }

    listCinemas (movieId: number, cityId: number) {
        const screenIds = this.shows.filter(show => show.movieId === movieId).map(show => show.movieScreenId);
        const screenIdSet = new Set(screenIds);
        const cinemaIds = this.movieScreens.filter(screen => screenIdSet.has(screen.movieScreenId)).map(screen => screen.cinemaHallId);
        const cinemaIdSet = new Set(cinemaIds);
        const cinemas = this.cinemaHalls.filter(cinema => cinemaIdSet.has(cinema.cinemaHallId) && cinema.cityId === cityId);
        return cinemas;
    }

    listShows (movieId: number, cinemaId: number) {
        const screens = new Set(this.movieScreens.filter(screen => screen.cinemaHallId === cinemaId).map(screen => screen.movieScreenId));
        const shows = this.shows.filter(show => screens.has(show.movieScreenId) && show.movieId === movieId);
        return shows;
    }

}