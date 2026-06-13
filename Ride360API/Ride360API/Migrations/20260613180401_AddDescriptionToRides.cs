using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ride360API.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionToRides : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "rd",
                table: "Rides",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "rd",
                table: "Rides");
        }
    }
}
