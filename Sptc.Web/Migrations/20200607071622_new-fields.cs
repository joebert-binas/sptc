using Microsoft.EntityFrameworkCore.Migrations;

namespace Sptc.Web.Migrations
{
    public partial class newfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnrollmentStatus",
                table: "Registration");

            migrationBuilder.RenameColumn(
                name: "RelationshipToGuardian",
                table: "Registration",
                newName: "RelationshipWithGuardian");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Registration",
                newName: "PresumedAverage");

            migrationBuilder.RenameColumn(
                name: "DOB",
                table: "Registration",
                newName: "DateOfBirth");

            migrationBuilder.AddColumn<int>(
                name: "GenderId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "InternetAccessSurveyId",
                table: "Registration",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModeOfLearningId",
                table: "Registration",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatusOfEnrollmentId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StrandOfChoiceId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TrackOfChoiceId",
                table: "Registration",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "InternetAccessSurveyId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "ModeOfLearningId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "StatusOfEnrollmentId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "StrandOfChoiceId",
                table: "Registration");

            migrationBuilder.DropColumn(
                name: "TrackOfChoiceId",
                table: "Registration");

            migrationBuilder.RenameColumn(
                name: "RelationshipWithGuardian",
                table: "Registration",
                newName: "RelationshipToGuardian");

            migrationBuilder.RenameColumn(
                name: "PresumedAverage",
                table: "Registration",
                newName: "Gender");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Registration",
                newName: "DOB");

            migrationBuilder.AddColumn<int>(
                name: "EnrollmentStatus",
                table: "Registration",
                nullable: false,
                defaultValue: 0);
        }
    }
}
