import java.util.ArrayList;

public class Users {
	
	// attributes
	private String id;
	private String name;
	private String email;
	private String password;
	private ArrayList<Course> courses;
	
	// constructor
	public Users(String id, String name, String email, String password) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.courses = new ArrayList<>();
	}
	
	// getters
	public void addCourse(Course course) {
	       courses.add(course);
	   }
	public ArrayList<Course> getCourses() {
	       return courses;
	   }
	
	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
		
	// setters
	public void setId(String id) {
		this.id = id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
