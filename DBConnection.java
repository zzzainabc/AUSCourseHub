import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	private static final String URL = "jdbc:mysql://localhost:3306/CourseHubDB";
	private static final String USER = "root";
	private static final String PASSWORD = "l@mi22127"; // put ur password <3
	
	public static Connection getConnection() throws SQLException {
	    try {
	        // This line forces the driver to load
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    }
	    catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    }
	    return DriverManager.getConnection(URL, USER, PASSWORD);
	}
}