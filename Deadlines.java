public class Deadlines {

    // attributes
    private String title;
    private String dueDate;
    private String type;
    private double grade;
    private double weight;
    private boolean completed;

    // constructor
    public Deadlines(String title, String dueDate, String type, double grade, boolean completed, double weight) {
        this.title = title;
        this.dueDate = dueDate;
        this.type = type;
        this.grade = grade;
        this.weight = weight;
        this.completed = completed;
    }

    // getters
    public String getTitle() {
        return title;
    }

    public String getDueDate() {
        return dueDate;
    }

    public String getType() {
        return type;
    }
    
    public double getGrade() {
        return grade;
    }
    
    public double getWeight() {
        return weight;
    }
    
    public boolean getCompleted() {
        return completed;
    }

    // setters
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public void setGrade(float grade) {
        this.grade = grade;
    }
    
    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}