using Microsoft.EntityFrameworkCore;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Data
{
    public class ExpenseTrackerContext : DbContext
    {
        public string ridesSchema = "rd";
        public ExpenseTrackerContext(DbContextOptions<ExpenseTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<Ride> Rides { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tell entity framework to use schema
            modelBuilder.Entity<Ride>().ToTable("Rides", ridesSchema); // Maps Ride entity to rd.Rides in database
            modelBuilder.Entity<User>().ToTable("Users", ridesSchema); // Maps User entity to rd.Users in database

            // Populate CreatedAt and UpdatedAt with current datetime
            modelBuilder.Entity<Ride>()
                .Property(r => r.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Ride>()
                .Property(r=> r.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
            
        }
    }
}
