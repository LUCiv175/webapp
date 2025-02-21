// Models/User.cs
using System;
using System.Collections.Generic;

namespace MyReservationApp.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long? Phone { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}

