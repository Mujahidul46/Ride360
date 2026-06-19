using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ride360API.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Categories_CategoryId",
                schema: "rd",
                table: "Rides");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                schema: "rd",
                table: "Rides",
                type: "timestamp with time zone",
                nullable: true,
                defaultValueSql: "NOW()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "NOW()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                schema: "rd",
                table: "Rides",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                schema: "rd",
                table: "Rides",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Categories_CategoryId",
                schema: "rd",
                table: "Rides",
                column: "CategoryId",
                principalSchema: "rd",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Categories_CategoryId",
                schema: "rd",
                table: "Rides");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                schema: "rd",
                table: "Rides",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true,
                oldDefaultValueSql: "NOW()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                schema: "rd",
                table: "Rides",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                schema: "rd",
                table: "Rides",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Categories_CategoryId",
                schema: "rd",
                table: "Rides",
                column: "CategoryId",
                principalSchema: "rd",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
