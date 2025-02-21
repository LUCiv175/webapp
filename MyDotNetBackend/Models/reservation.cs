using System;

namespace MyReservationApp.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
    }
}