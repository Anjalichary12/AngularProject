import { Component } from '@angular/core';
// export class AppComponent {
//   title = 'SeaT-Reservation'; // Add this line to define 'title'
// }
// // Define a Seat interface
// interface Seat {
//   status: string;
// }

// export class AppComponent {
//   // Assuming rows is a 2D array of seats
//   rows: Seat[][] = [];

//   someMethod() {
//     this.rows.forEach(row => row.forEach((seat: Seat) => {
//       seat.status = 'available';
//     }));
//   }
// }

interface Seat {
  seatNo: number;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// interface Seat {
//   seatNo: number;
//   status: string;
// }


export class AppComponent {
  title = 'SeaT-Reservation'; 

  
  rows: any[] = [];
  bookedSeats: number[] = [];
  maxSeatsInRow = 7;

  constructor() {
    this.initializeSeats();
  }

  // Initialize seat structure
  initializeSeats() {
    let seatNo = 1;
    for (let row = 1; row <= 10; row++) {
      const seats = [];
      for (let seat = 1; seat <= this.maxSeatsInRow; seat++) {
        seats.push({ seatNo, status: 'available' });
        seatNo++;
      }
      this.rows.push(seats);
    }
    const lastRow = [];
    for (let seat = 1; seat <= 3; seat++) {
      lastRow.push({ seatNo, status: 'available' });
      seatNo++;
    }
    this.rows.push(lastRow);
  }

  bookSeats(seatCount: number) {
    if (seatCount < 1 || seatCount > 7) {
      alert('You can book between 1 to 7 seats.');
      return;
    }

    let seatsToBook = [];
    for (const row of this.rows) {
      const availableSeats = row.filter((seat: any) => seat.status === 'available');
      if (availableSeats.length >= seatCount) {
        seatsToBook = availableSeats.slice(0, seatCount);
        break;
      }
    }

    if (seatsToBook.length === 0) {
      seatsToBook = this.findNearbySeats(seatCount);
    }

    if (seatsToBook.length === seatCount) {
      seatsToBook.forEach((seat: any) => {
        seat.status = 'booked';
        this.bookedSeats.push(seat.seatNo);
      });
    } else {
      alert('Not enough seats available');
    }
  }

  findNearbySeats(seatCount: number) {
    const seatsToBook = [];
    for (const row of this.rows) {
      for (const seat of row) {
        if (seat.status === 'available') {
          seatsToBook.push(seat);
          if (seatsToBook.length === seatCount) {
            return seatsToBook;
          }
        }
      }
    }
    return seatsToBook;
  }

  resetBookings() {
    this.bookedSeats = [];
    // this.rows.forEach(row => row.forEach(seat => seat.status = 'available'));
    this.rows.forEach((row: any) => row.forEach((seat: any) => seat.status = 'available'));

  }
}
