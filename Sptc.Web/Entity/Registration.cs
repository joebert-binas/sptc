using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sptc.Web.Entity
{
    public class Registration
    {  
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int YearLevelId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string MobileNo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender GenderId { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string MotherMaidenName { get; set; }
        public string MotherAddress{ get; set; }
        public string FatherName { get; set; }
        public string FatherAddress { get; set; }
        public string GuardianName { get; set; }
        public string GuardianAddress { get; set; }
        public string RelationshipWithGuardian { get; set; }
        public EnrollmentStatus StatusOfEnrollmentId { get; set; }
        public TrackOfChoice TrackOfChoiceId { get; set; }
        public StrandOfChoice StrandOfChoiceId { get; set; }
        public int PresumedAverage { get; set; }
        public string InternetAccessSurveyId { get; set; }
        public string ModeOfLearningId { get; set; }
        public float Weight { get; set; }
        public float Height { get; set; }
        public RegistrationStatus RegistrationStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public string EmailAddress { get; set; }
    }

    public enum Gender
    {
        Male = 1,
        Female = 2
    } 
    public enum EnrollmentStatus
    {
        New = 1,
        Old = 2,
        Returning = 3,
        Transferee = 4
    }

    public enum TrackOfChoice
    {
        None = 0,
        Academic = 1,
        TechVoc = 2, 
    }
    public enum StrandOfChoice
    {
        None = 0,
        HUMSS = 1,
        TVLHomeEconomics = 2,
        TVLIndustrialArts = 3
    }
    public enum RegistrationStatus
    {
        Pending = 1,
        Approved = 2
    }
}
