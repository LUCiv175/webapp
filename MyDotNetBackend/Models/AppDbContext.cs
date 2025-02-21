// Data/MyDbContext.cs
using Microsoft.EntityFrameworkCore;
using MyReservationApp.Models;

namespace MyReservationApp.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura l'entità User
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user"); // Nome della tabella
                entity.Property(u => u.Id).HasColumnName("id");
                entity.Property(u => u.Name).HasColumnName("name");
                entity.Property(u => u.Surname).HasColumnName("surname");
                entity.Property(u => u.Birth).HasColumnName("birth");
                entity.Property(u => u.Email).HasColumnName("email");
                entity.Property(u => u.Password).HasColumnName("password");
                entity.Property(u => u.Phone).HasColumnName("phone");
            });

            // Configura l'entità Reservation
            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("reservation"); // Nome della tabella
                entity.Property(r => r.Id).HasColumnName("id");
                entity.Property(r => r.UserId).HasColumnName("fk_user");
                entity.Property(r => r.ArrivalDate).HasColumnName("arrival_date");
                entity.Property(r => r.DepartureDate).HasColumnName("departure_date");
            });

            // Configura la relazione tra User e Reservation
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}