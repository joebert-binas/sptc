using Microsoft.EntityFrameworkCore.Migrations;

namespace Sptc.Web.Migrations
{
    public partial class additionafields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "YearLevelId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "YearLevelId",
                table: "Registration");
        }
    }
}
