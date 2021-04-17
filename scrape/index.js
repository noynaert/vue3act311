console.log("Starting");

const cheerio = require("cheerio");
const fs = require("fs");

let departments = [];
let sections = [];

//main()
fs.readFile("departments.json", "utf8", function (err, data) {
  if (err) throw err;
  
  departments = JSON.parse(data);
  
  for (d of departments) {
    parseDept(d.dept);
  }
  //console.log(sections);
  try {
    fs.writeFileSync("sections.json",JSON.stringify(sections))
  } catch (err) {
    console.error(err)
  }
});

//end of main
function readhtml(dept) {
  let fileName = "./data/" + dept + ".html";
  let html = "empty string";
  //console.log("fileName is ", fileName);
  html = fs.readFileSync(fileName, "utf8", function (err, data) {
    if (err) {
      throw err;
    }
  });
  return html;
}
function parseDept(dept) {
  // if (dept != "BIO") return;  //To just debug one department
  console.log(">>>>DEPT>>>>", dept);
  let html = readhtml(dept);
  let $ = cheerio.load(html);
  let section = {};
        /*
          There are two types of list_row classes.
          The usual type has the following tds
          * crn                  [0]
          * course id and url  [1]
          * section number       [2]
          * mode                 [3]
          * title                [4]
          * credits              [5]
          * days                 [6]
          * times                [7]
          * room                 [8]
          * instructor           [9]
          
          Meeting-only fake list_rows have the following
          * &nbsp; which spans 6 columns
          * days
          * time
          * room
          * &nbsp; as dummy cell
          
           Fields are all set up as variables and initialized to empty for each section
           After the row is processed, the crn.length is used
           to determine if this is real or fake.
           
           If it is a real section, then the section is cleared
           and fields added.  If it is a fake section, then the meeting
           is added to the meetings array.
        */
  tds = $("#maincontent table tr").each((i, e) => {
    if (e.attribs.class == "list_row") {
      //initialize the variables for a list row
      let realSection = false;
      let temp_dept = dept;
      let temp_discipline = ""
      let temp_crn = ""
      let temp_course = ""
      let temp_url = ""
      let temp_section = ""
      let temp_mode = ""
      let temp_title=""
      let temp_credits = 0
      let meetings = [] //no need for a temp
      let meeting = {}  //one meeting
      let temp_instructor = ""

      $(e)
        .children("td")
        .each((ii, ee) => {
          if (ii === 0) {
            temp_crn = $(ee).text().trim();
            realSection = /\d\d\d\d\d+/.test(temp_crn)
            console.log("Processing:", temp_crn, realSection)
          } else if (realSection && ii == 1) {
            temp_course = $(ee).text().trim();
            temp_discipline = temp_course.substring(0, 3);
            temp_url = $(ee).children("a").last().attr("href");
          } else if (realSection && ii === 2) {
            temp_section = $(ee).text().trim();
          } else if (realSection && ii === 3) {
            temp_mode = $(ee).text();
          } else if (realSection && ii === 4) {
            temp_title = $(ee).text();
          } else if (realSection && ii === 5) {
            section.credits = parseInt($(ee).text().trim());
          } else if ((realSection && ii === 6) || (!realSection && ii===2)) {
            meeting.day = $(ee).text().trim();
          } else if ((realSection && ii === 7) || (!realSection && ii===3)) {
            meeting.time = $(ee).text().trim();
          } else if ((realSection && ii === 8)||(!realSection && ii === 4)) {
            meeting.room = $(ee).text().trim();
            //console.log(meeting);
            //if this list line is just for an additional meeting time
            // if (realSection) {
            //   section.meetings = [];
            //   section.meetings.push(meeting)
            // } else {
            //   //Update last element of sections array
            //   sections[sections.length - 1].meetings.push(meeting);
            // }
            //if (section) section.meetings.push(meeting);
          } else if (realSection && ii === 9) {
            section.instructor = $(ee).text().trim();
          }
          
        });
      if (realSection) {
        section = {};  //initialize section
        section.dept = temp_dept;
        section.discipline = temp_discipline
        section.crn = temp_crn
        section.id = temp_course
        section.url=temp_url
        section.sec = temp_section
        section.mode = temp_mode
        section.title = temp_title
        section.credits = temp_credits
        section.meetings = meetings
        section.meetings.push(meeting)
        section.instructor = temp_instructor = "";

      } else {
        section.meetings.push(meeting);
        }
    } else if (e.attribs.class == "detail_row") {
      /*
         There is a big blob of text in the middle of this cell that is
         not in a span.  My method of recovering it was to capture all of the text in the 
         detail_cell.  Then I recovered each of the labeled fields and replace the strings.

         What I had left was the unlabeled text.  I just trimmed it.
      */
      //console.log("in detail.row");
      let course_enrollment = {};
      let course_messages = {};
      let course_term = {};
      let course_dates = {};
      let course_text = $(e)
        .text()
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/\s+/gm, " ")
        .replace(/Maximum Enrollment:\s*\-*\d+/gm, " ")
        .replace(/Section Seats Available:\s*\-*\d+/gm, " ")
        .replace(/\u00A0/gm, " ") //&nbsp;
        .replace(/Course Begins:\s*\d+\/\d+\/\d+/gm, " ")
        .replace(/Course Ends:\s*\d+\/\d+\/\d+/gm, " ")
        .replace(/Crosslist Seats Available:\s*\-*\d+/gm, " ")
        .trim();
      $;
      
      let detail_cell = $(e).children(".detail_cell").first();
      $(detail_cell)
        .children()
        .each((ii, ee) => {
          //console.log("detail_cell: ", ii);
          let detailText = $(ee).text().replace(/\s+/gm, " ");
          //console.log("THE DETAILTEXT IS", detailText);
          if (ii === 0) {
            //console.log("In 00, should be course_enrollment", detailText);
            course_text = course_text.replace(/Maximum Enrollment:\s+\d+/, " ");
            course_text = course_text.replace(/Section Seats Avaiable:\s+\d+/, " ");
            let maxEnrollment = /Maximum Enrollment:\s+(\d+)/;
            let seatsAvailable = /Section Seats Available:\s+(\-*\d+)/;
            let crosslistSeats = /Crosslist Seats Available:\s+(\d+)/;
            
            let m1 = detailText.match(maxEnrollment);
            let m2 = detailText.match(seatsAvailable);
            let m3 = detailText.match(crosslistSeats);
            
            course_enrollment.maximum_enrollment = parseInt(m1[1]);
            
            course_enrollment.seats_available = parseInt(m2[1]);
            course_enrollment.enrolled = parseInt(m1[1]) - parseInt(m2[1]);
            if (m3 != null) {
              course_enrollment.crosslist_seats_available = parseInt(m3[1]);
            }
            let enrolled = parseInt(m1[1]) - parseInt(m2[1]);
            section.enrollment = course_enrollment;
            //console.log(course_enrollment);
          } else if (ii === 1) {
            //console.log("ii is 1, should be in course_messages");
            //console.log("ii is 1, detail text is ", detailText);
            section.course_messages = detailText.trim();
            course_text.replace(detailText, " ");
          } else if (ii === 2) {
            section.course_note = detailText.trim();
            //console.log("ii is 2.  It appears empty >>>", detailText, "<<<");
          } else if (ii === 3) {
            //console.log("ii is 3, should be in course_term >>>",detailText.trim());
            section.course_term = detailText.trim();
            course_text = course_text.replace(detailText.trim(), " ");
          } else if (ii === 4) {
            let d = $(ee).children().first().text().trim();
            //console.log("BEGIN COURSE DATE:", d);
            let dd = fixDate(d);
            course_dates.begin_date = dd;
            d = $(ee).children().last().text().trim();
            dd = fixDate(d);
            course_dates.end_date = dd;
            section.course_dates = course_dates;
            //console.log("ii is 4, should be in course_dates");
            course_text.replace(detailText, " ");
          } else if (ii === 5) {
            console.log("ii is 5, but I got nothin'");
          }
        });

      
      section.extra_text = course_text;
      sections.push(section);  //only pushes after it finds detail row
    }
    
    
  });

}
function fixDate(s) {
  const fields = s.split(":");
  const rawDate = fields[1].trim();
  const d = new Date(rawDate).toISOString().split("T");
  //console.log("DATE IS", d[0]);
  return d[0];
}
