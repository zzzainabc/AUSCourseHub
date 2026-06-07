import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/RemoveCourseServlet")
public class RemoveCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        String courseId = request.getParameter("courseId");
        String userId = (String) request.getSession().getAttribute("userId");

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "DELETE FROM courses WHERE course_id = ? AND user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(courseId));
            pstmt.setString(2, userId);
            int rows = pstmt.executeUpdate();
            response.getWriter().print("{\"success\": " + (rows > 0) + "}");
        } 
        
        catch (Exception e) {
            response.setStatus(500);
            response.getWriter().print("{\"success\": false, \"message\": \"" + e.getMessage() + "\"}");
        }
    }
}