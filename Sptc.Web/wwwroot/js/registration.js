const courses = [
    { Id: 1, CourseName: 'Senior High School' },
    { Id: 3, CourseName: 'Bachelor of Science in Information System (BSIS)' },
    { Id: 4, CourseName: 'Bachelor of Science in Information Technology (BSIT)' },
    { Id: 5, CourseName: 'Bachelor of Technical-Vocatonal Teacher Education (BTVTEd) - Major in Food & Service Management (CFSM)' },
    { Id: 6, CourseName: 'Bachelor of Technical-Vocatonal Teacher Education (BTVTEd) - Major in Electrical Installation and Maintenance (EIM)' },
    { Id: 7, CourseName: 'Bachelor of Technical-Vocatonal Teacher Education (BTVTEd) - Major in Computer Hardware & Servicing/Computer Systems Servicing (CSS)' },
    { Id: 2, CourseName: 'Associalte in Computer Technology (ACT)' },
    { Id: 8, CourseName: 'Electrical Technology (2 years) - Bundled Program (EIM NC II & EIM NC III)' },
    { Id: 9, CourseName: 'EPDLC (Lineman) NC II' },
    { Id: 10, CourseName: 'Cookery NC II' },
    { Id: 11, CourseName: 'Computer System Servicing NC II' }
];

const yearLevels = [
    { Id: 1, levelName: 'Grade 11' },
    { Id: 2, levelName: 'Grade 12' },
    { Id: 3, levelName: 'First Year' },
    { Id: 4, levelName: 'Second Year' },
    { Id: 5, levelName: 'Third Year' },
    { Id: 6, levelName: 'Fourth Year' }
];

const statusOfEnrollment = [
    { Id: 1, StatusName: 'New Student' },
    { Id: 2, StatusName: 'Old Student' },
    { Id: 3, StatusName: 'Returning Student' },
    { Id: 4, StatusName: 'Transferee' }
];

const presumedFinalAverages = [
    { Id: 1, Description: '95 - 100' },
    { Id: 2, Description: '90 - 94' },
    { Id: 3, Description: '85 - 89' },
    { Id: 3, Description: '80 - 84' },
    { Id: 4, Description: '75 - 79' },
    { Id: 5, Description: 'Below 75' },
    { Id: 6, Description: "I don't know" }
];

const modeOfLeanings = [
    { Id: 1, Description: 'Online Learning & Teaching (OLT)' },
    { Id: 2, Description: 'Module Learning (ML)' },
    { Id: 3, Description: 'Home-based Schooling (HBS)' },
    { Id: 4, Description: 'Classroom-based / Face to Face Instruction (CB-FFI)' }
];

const internetAccessSurvey = [
    { Id: 1, Description: 'With Access to internet thru Personal Laptop/PC' },
    { Id: 2, Description: 'With Access to Internet thru Cellphone' },
    { Id: 3, Description: 'Without Access to internet but has a Laptop/PC' },
    { Id: 4, Description: 'Without Access to internet but has a Cellphone' },
    { Id: 5, Description: 'With access to Internet' },
    { Id: 6, Description: 'Without access to Internet' }
];

const trackOfChoices = [
    { Id: 1, Description: 'Academic' },
    { Id: 2, Description: 'TVL (Tech Voc)' }

];

const strandOfChoices = [
    { Id: 1, Description: 'HUMSS (Humanities & Social Agenicies' },
    { Id: 2, Description: 'TVL - Home Econmics - Cookery' },
    { Id: 3, Description: 'TVL - IA (Industrial Arts) - Electrical Installation & Maintenance (EIM)' }
];

let current_fs, next_fs, previous_fs; //fieldsets
let opacity;
let current = 1;
let steps = 0;
const payload = {};

const registration = {

    initEvents: function () {

        $(".next").click(function () { 

            var thisNext = this;

            if (current === 1) {
            

                if (!registration.validateStep1()) {
                    return;
                }

                if (registration.isSeniorHigh()) {
                    $('.seniorHighProgram').show();
                } else {
                    $('.seniorHighProgram').hide();
                }

                $(window).scrollTop(0);

                registration.nextStep(thisNext);
        
            } else if (current === 2) {
                const isStep2Valid = registration.validateStep2();

                const isValid = $('#msform').valid();

                if (!isValid || !isStep2Valid) { 
                    return;
                }
                registration.populateReview($('#msform').serializeArray()); 


                $(window).scrollTop(0);

                registration.nextStep(thisNext);

            } else if (current === 3) {

                let formData = $('#msform').serializeArray();

                $('.btn-submit').prop('disabled', true);
                $('.btn-submit').val('Submitting');
                const payload = {};
                $.each(formData,
                    function (i, v) {
                        payload[v.name] = v.value;
                    });

                $.ajax({
                    type: "POST",
                    url: '/registration/create',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: function (response) { 

                        if (response === 1) {
                            registration.nextStep(thisNext);
                        }

                    }, complete: function () {
                        $('.btn-submit').remove('disabled');
                        $('.btn-submit').prop('disabled', false);
                    }
                });
            } else  if (current === 4) {
                location.href = "/registration";
            }
             

          

        });

        $(".previous").click(function () {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 500
            });

            if (current > 1) {
                current--;
            }

        });

        $(".submit").click(function () {
            return false;
        })

        $(document).on('change', '.course', function (e) {

            const value = $(this).val();
            $('#CourseId').val(value);
            $('#YearLevelId').val(0);

            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }
            registration.initYearLevels();
        });


        $(document).on('change', '.average', function (e) {

            const value = $(this).val();
            $('#AverageId').val(value);
            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }
        });


        $(document).on('change', '.mode-learning', function (e) {

            let selectedValues = '';
            $('.mode-learning:checked').each(function () {
                selectedValues += ($(this).val() + ',');
            });

            $('#ModeOfLearningId').val(selectedValues);
            if (selectedValues !== '') {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }
        });


        $(document).on('change', '.internet-access-survey', function (e) {

            let selectedValues = '';
            $('.internet-access-survey:checked').each(function () {
                selectedValues += ($(this).val() + ',');
            });

            $('#InternetAccessSurveyId').val(selectedValues);
            if (selectedValues !== '') {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }
        });



        $(document).on('change', '#SelectYearLevel', function (e) {
            const value = $(this).val();
            $('#YearLevelId').val(value);
            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }

        });

        $(document).on('change', '#SelectStatusOfEnrollment', function (e) {
            const value = $(this).val();
            $('#StatusOfEnrollmentId').val(value);
            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }

        });

        $(document).on('change', '#SelectGender', function (e) {
            const value = $(this).val();
            $('#GenderId').val(value);

            if (parseInt(value) > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }
        });

        $(document).on('change', '#SelectTrackOfChoice', function (e) {
            const value = $(this).val();
            $('#TrackOfChoiceId').val(value);
            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }

        });

        $(document).on('change', '#SelectStrandOfChoice', function (e) {
            const value = $(this).val();
            $('#StrandOfChoiceId').val(value);
            if (value > 0) {
                $(this).closest('.form-group').removeClass('has-error')
                $(this).closest('.form-group').find('.has-error').hide();
            }

        });


    },
    initCourses: function () {

        courses.forEach((course, index) => {
            var radioBtnCourse = $(
                `<div class="form-check">
                 <input type="radio" class="form-check-input course" id="course-${index}" name="Course" value=${course.Id}>
                  <label class="form-check-label" style="cursor:pointer" for="course-${index}"">${course.CourseName}</label>
             </div>`
            );
            radioBtnCourse.appendTo('.courses');
        });
    },

    initYearLevels: function () {
        const courseId = parseInt($('#CourseId').val() || '0');
        let levels = yearLevels;
        $('#SelectYearLevel').empty();

        if (courseId === 1) {
            levels = levels.filter(x => x.Id === 1 || x.Id === 2);
        } else if (registration.isNonDegree(courseId)) {
            levels = levels.filter(x => x.Id === 3 || x.Id === 4);
        } else {
            levels = levels.filter(x => x.Id > 2);
        }

        $('<option selected value="0">Choose</option>').appendTo('#SelectYearLevel');

        levels.forEach((level, index) => {
            var option = $(
                `<option value=${level.Id}>${level.levelName}</option>`
            );
            option.appendTo('#SelectYearLevel');
        });

    },
    initModeOfLearnings: function () {
        modeOfLeanings.forEach((item, index) => {
            var element = $(
                `<div class="form-check">
                 <input type="checkbox" class="form-check-input mode-learning" id="mode-${index}"  value=${item.Id}>
                  <label class="form-check-label" style="cursor:pointer" for="mode-${index}"">${item.Description}</label>
             </div>`
            );
            element.appendTo('.modeOfLearnings');
        });
    },
    initInternetAccessSurvey: function () {
        internetAccessSurvey.forEach((item, index) => {
            var element = $(
                `<div class="form-check">
                 <input type="checkbox" class="form-check-input internet-access-survey" id="survey-${index}"   value=${item.Id}>
                  <label class="form-check-label" style="cursor:pointer" for="survey-${index}"">${item.Description}</label>
             </div>`
            );
            element.appendTo('.internetAccessSurvies');
        });
    },
    initStatusOfEnrollment: function () {

        $('<option selected value="0">Choose</option>').appendTo('#SelectStatusOfEnrollment');

        statusOfEnrollment.forEach((item, index) => {
            var option = $(
                `<option value=${item.Id}>${item.StatusName}</option>`
            );
            option.appendTo('#SelectStatusOfEnrollment');
        });

    },
    initPresumedFinalAverage: function () {

        presumedFinalAverages.forEach((average, index) => {
            var radioBtnCourse = $(
                `<div class="form-check">
                 <input type="radio" class="form-check-input average" id="average-${index}" name="presumedAverage"  value=${average.Id}>
                  <label class="form-check-label" style="cursor:pointer" for="average-${index}"">${average.Description}</label>
             </div>`
            );
            radioBtnCourse.appendTo('.averages');
        });
    },
    initTrackOfChoice: function () {

        $('<option selected value="0">Choose</option>').appendTo('#SelectTrackOfChoice');

        trackOfChoices.forEach((item, index) => {
            var option = $(
                `<option value=${item.Id}>${item.Description}</option>`
            );
            option.appendTo('#SelectTrackOfChoice');
        });

    },
    initStrandOfChoice: function () {

        $('<option selected value="0">Choose</option>').appendTo('#SelectStrandOfChoice');

        strandOfChoices.forEach((item, index) => {
            var option = $(
                `<option value=${item.Id}>${item.Description}</option>`
            );
            option.appendTo('#SelectStrandOfChoice');
        });

    },

    isNonDegree: function (courseId) {
        return courseId === 2 || courseId === 8 || courseId === 9 || courseId === 10 || courseId === 11;
    },
    isSeniorHigh: function () {
        return $('#CourseId').val() === '1';
    },
    validateStep1: function () {

        const yearLevel = $('#YearLevelId');
        const yearLevelValue = parseInt(yearLevel.val() || '0');
        if (yearLevelValue <= 0) {
            yearLevel.closest('.form-group').addClass('has-error');
            yearLevel.closest('.form-group').find('.has-error').show();
        } else {
            yearLevel.closest('.form-group').removeClass('has-error')
            yearLevel.closest('.form-group').find('.has-error').hide();
        }

        const course = $('#CourseId');
        const courseValue = parseInt(course.val() || '0');
        if (courseValue <= 0) {
            course.closest('.form-group').addClass('has-error');
            course.closest('.form-group').find('.has-error').show();
        } else {
            course.closest('.form-group').removeClass('has-error')
            course.closest('.form-group').find('.has-error').hide();
        }




        return yearLevelValue > 0 && courseValue > 0;

    },
    validateStep2: function () {

        const statusOfEnrollment = $('#StatusOfEnrollmentId');
        const statusOfEnrollmentValue = parseInt(statusOfEnrollment.val() || '0');
        if (statusOfEnrollmentValue <= 0) {
            statusOfEnrollment.closest('.form-group').addClass('has-error');
            statusOfEnrollment.closest('.form-group').find('.has-error').show();
        } else {
            statusOfEnrollment.closest('.form-group').removeClass('has-error')
            statusOfEnrollment.closest('.form-group').find('.has-error').hide();
        }

        const average = $('#AverageId');
        const averageValue = parseInt(average.val() || '0');
        if (averageValue <= 0) {
            average.closest('.form-group').addClass('has-error');
            average.closest('.form-group').find('.has-error').show();
        } else {
            average.closest('.form-group').removeClass('has-error')
            average.closest('.form-group').find('.has-error').hide();
        }


        const gender = $('#GenderId');
        const genderValue = parseInt(gender.val() || '0');

        if (genderValue <= 0) {
            gender.closest('.form-group').addClass('has-error');
            gender.closest('.form-group').find('.has-error').show();
        } else {
            gender.closest('.form-group').removeClass('has-error')
            gender.closest('.form-group').find('.has-error').hide();
        }


        const dateOfBirth = $('#DateOfBirth');
        const dateOfBirthValue = dateOfBirth.val();


        if (dateOfBirthValue === '') {
            dateOfBirth.closest('.form-group').addClass('has-error');
            dateOfBirth.closest('.form-group').find('.has-error').show();
        } else {
            dateOfBirth.closest('.form-group').removeClass('has-error')
            dateOfBirth.closest('.form-group').find('.has-error').hide();
        }


        const modeOfLearning = $('#ModeOfLearningId');
        const modeOfLearningValue = modeOfLearning.val();
        if (modeOfLearningValue === '') {
            modeOfLearning.closest('.form-group').addClass('has-error');
            modeOfLearning.closest('.form-group').find('.has-error').show();
        } else {
            modeOfLearning.closest('.form-group').removeClass('has-error')
            modeOfLearning.closest('.form-group').find('.has-error').hide();
        }

        const internetAccessSurvey = $('#InternetAccessSurveyId');
        const internetAccessSurveyValue = internetAccessSurvey.val();
        if (internetAccessSurveyValue === '') {
            internetAccessSurvey.closest('.form-group').addClass('has-error');
            internetAccessSurvey.closest('.form-group').find('.has-error').show();
        } else {
            internetAccessSurvey.closest('.form-group').removeClass('has-error')
            internetAccessSurvey.closest('.form-group').find('.has-error').hide();
        }

        let isTrackOfChoice = true;
        let isStrandOfChoide = true;

        if (registration.isSeniorHigh()) {

            const trackOfChoice = $('#TrackOfChoiceId');
            const trackOfChoiceValue = parseInt(trackOfChoice.val() || '0');
            if (trackOfChoiceValue <= 0) {
                trackOfChoice.closest('.form-group').addClass('has-error');
                trackOfChoice.closest('.form-group').find('.has-error').show();
            } else {
                trackOfChoice.closest('.form-group').removeClass('has-error')
                trackOfChoice.closest('.form-group').find('.has-error').hide();
            }
            isTrackOfChoice = trackOfChoiceValue > 0;

            const strandOfChoice = $('#StrandOfChoiceId');
            const strandOfChoiceValue = parseInt(strandOfChoice.val() || '0');

            if (strandOfChoiceValue <= 0) {
                strandOfChoice.closest('.form-group').addClass('has-error');
                strandOfChoice.closest('.form-group').find('.has-error').show();
            } else {
                strandOfChoice.closest('.form-group').removeClass('has-error')
                strandOfChoice.closest('.form-group').find('.has-error').hide();
            }

            isStrandOfChoide = strandOfChoiceValue > 0;

        }


        return statusOfEnrollmentValue > 0 &&
            averageValue > 0 &&
            genderValue > 0 &&
            dateOfBirthValue !== '' &&
            modeOfLearningValue !== '' &&
            internetAccessSurveyValue !== '' &&
            isTrackOfChoice &&
            isStrandOfChoide;

    },
    populateReview: function (fields) {
        $('.reviews').empty();

        fields.forEach(item => { 
            let labelName = '';
            let labelValue = item.value;;

            if (item.name === 'CourseId') {
                labelName = 'Course';
                labelValue = courses.filter(x => x.Id === parseInt(item.value))[0].CourseName;

            } else if (item.name === 'YearLevelId') {
                labelName = 'Year Level';
                labelValue = yearLevels.filter(x => x.Id === parseInt(item.value))[0].levelName;
            } else if (item.name === 'LastName') {
                labelName = 'Last Name'; 
            } else if (item.name === 'FirstName') {
                labelName = 'First Name'; 
            } else if (item.name === 'Middle Name') {
                labelName = 'Middle Name'; 
            } else if (item.name === 'Age') {
                labelName = 'Age';
            }  else if (item.name === 'GenderId') {
                labelName = 'Gender';
                labelValue = item.value === '1' ? "Male" : "Female";
            } else if (item.name === 'DateOfBirth') {
                labelName = 'Date of Birth'; 
            } else if (item.name === 'MobileNo') {
                labelName = 'Mobile No.';
            } else if (item.name === 'Height') {
                labelName = 'Height';
            } else if (item.name === 'Weight') {
                labelName = 'Weight';
            } else if (item.name === 'Address') {
                labelName = 'Address';
            } else if (item.name === 'EmailAddress') {
                labelName = 'Email Address';
            } else if (item.name === 'MotherMaidenName') {
                labelName = "Mother's Maiden Name";
            } else if (item.name === 'FatherName') {
                labelName = "Father's Name";
            } else if (item.name === 'GuardianName') {
                labelName = "Guardian's Name";
            } else if (item.name === 'RelationshipWithGuardian') {
                labelName = "Relationship with Guardian";
            } else if (item.name === 'StatusOfEnrollmentId') {
                labelName = 'Status of Enrollment';
                labelValue = statusOfEnrollment.filter(x => x.Id === parseInt(item.value))[0].StatusName;
            } else if (item.name === 'TrackOfChoiceId' && registration.isSeniorHigh()) {
                labelName = 'Track of Choice';
                labelValue = trackOfChoices.filter(x => x.Id === parseInt(item.value))[0].Description;
            } else if (item.name === 'StrandOfChoiceId' && registration.isSeniorHigh()) {
                labelName = 'Strand of Choice';
                labelValue = strandOfChoices.filter(x => x.Id === parseInt(item.value))[0].Description;
            } else if (item.name === 'AverageId') {
                labelName = 'Presumed final average obtained last SY 2019-2020';
                labelValue = presumedFinalAverages.filter(x => x.Id === parseInt(item.value))[0].Description;
            } else if (item.name === 'InternetAccessSurveyId') {
                labelName = 'Internet Access Survey';
                labelValue = '';
                $('.internet-access-survey:checked').each(function () {
                    const selectedValue  = $(this).val();
                    labelValue += (internetAccessSurvey.filter(x => x.Id === parseInt(selectedValue))[0].Description + '<br/>');
                });  
            } else if (item.name === 'ModeOfLearningId') {
                labelName = 'Preferred Mode of Learning';
                labelValue = '';
                $('.mode-learning:checked').each(function () {
                    const selectedValue = $(this).val();
                    labelValue += (modeOfLeanings.filter(x => x.Id === parseInt(selectedValue))[0].Description + '<br/>');
                });
            }                       

            if (labelName) {
                var element = $(
                    `<div class="row">
                            <div class="col-md-3">
                                <b>${labelName}</b>
                            </div>
                            <div class="col-md-9">
                                <label>${labelValue}</label>
                            </div>
                        </div>
                        <hr/>
                        ` 
                );

                element.appendTo('.reviews'); 
            }

        });
    }, 
    nextStep: function (e) {

        current_fs = $(e).parent();
        next_fs = $(e).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");


        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });

        if (steps > current) {
            current++;
        }

    }

}

$(document).ready(function () {

    steps = $("fieldset").length;
    $('#msform').validate({

        rules: {
            EmailAddress: { 
                required: true,
                email: true
            }
        },
  
        messages: {
            EmailAddress: "Please enter a valid email address"
        },
        highlight: function (element, errorClass) { 
            $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function (element, errorClass) {
 
            if ($(element).attr('type') === undefined) {
                return;
            }
            $(element).closest(".form-group").removeClass("has-error");
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().next());
        },
        errorPlacement: function (error, element) { 
            if (element.attr("type") == "checkbox") {
                element.closest(".form-group").children(0).prepend(error);
            }
            else {
                error.insertAfter(element);
            }

        }
    });

    $('#PickerDateOfBirth').datepicker({
        autoclose: true
    }).on('changeDate', function (selected) {
        const date = new Date(selected.date);
        const value = moment(date).format('MM/DD/YYYY');

        $('#DateOfBirth').val(value);

        $('#DateOfBirth').closest('.form-group').removeClass('has-error')
        $('#DateOfBirth').closest('.form-group').find('.has-error').hide();

    });


    registration.initEvents();
    registration.initCourses();
    registration.initYearLevels();
    registration.initStatusOfEnrollment();
    registration.initPresumedFinalAverage();
    registration.initModeOfLearnings();
    registration.initInternetAccessSurvey();
    registration.initStrandOfChoice();
    registration.initTrackOfChoice();


});
