import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

@WebServlet("/deleteGrade")
public class DeletedGradesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String gradeId = request.getParameter("grade_id");
        String courseId = request.getParameter("course_id");

        try (Connection conn = DBConnection.getConnection()) {

            String sql = "DELETE FROM grades WHERE grade_id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);

            ps.setInt(1, Integer.parseInt(gradeId));

            ps.executeUpdate();

            ps.close();
            conn.close();

            response.sendRedirect("workspace?course_id=" + courseId + "&tab=grades");

        } 
        
        catch (Exception e) {
            response.getWriter().println("Error deleting grade: " + e.getMessage());
        }
    }
}
