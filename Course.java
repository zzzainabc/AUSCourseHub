import java.util.ArrayList;

public class Course {

    // attributes
    private String courseCode;
    private String courseName;
    private String semester;
    private String professorName;
    private String professorEmail;
    private String classTime;
    private ArrayList<Deadlines> deadlines;
    
    // constructor
    public Course(String courseCode, String courseName, String semester, String profName, String profEmail, String classTime) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.semester = semester;
        this.professorName = profName;
        this.professorEmail = profEmail;
        this.classTime = classTime;
        this.deadlines = new ArrayList<>();
    }

    public void addDeadline(Deadlines deadline) {
        deadlines.add(deadline);
    }
    
    // getters
    public ArrayList<Deadlines> getDeadlines() {
        return deadlines;
    }
    
    public String getCourseCode() {
        return courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getSemester() {
        return semester;
    }

    public String getProfName() {
        return professorName;
    }
    
    public String getProfEmail() {
        return professorEmail;
    }
    
    public String getClassTime() {
        return classTime;
    }
    
    // setters
    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public void setInstructor(String profName) {
        this.professorName = profName;
    }
    
    public void setProfEmail(String profEmail) {
        this.professorEmail = profEmail;
    }
    public void setClassTime(String classTime) {
        this.classTime = classTime;
    }
}