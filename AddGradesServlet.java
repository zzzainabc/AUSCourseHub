import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

@WebServlet("/addGrade")
public class AddGradesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String courseId = request.getParameter("course_id");
        String name = request.getParameter("name");
        String grade = request.getParameter("grade");
        String weight = request.getParameter("weight");

        try (Connection conn = DBConnection.getConnection()) {

            String sql = "INSERT INTO grades (course_id, name, grade, weight) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            ps.setInt(1, Integer.parseInt(courseId));
            ps.setString(2, name);
            ps.setDouble(3, Double.parseDouble(grade));
            ps.setDouble(4, Double.parseDouble(weight));

            ps.executeUpdate();

            ps.close();
            conn.close();

            response.sendRedirect("workspace?course_id=" + courseId + "&tab=grades");

        } 
        
        catch (Exception e) {
            response.getWriter().println("Error adding grade: " + e.getMessage());
        }
    }
}
