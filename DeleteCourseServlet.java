import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 * Servlet implementation class DeleteCourseServlet
 */
@WebServlet("/DeleteCourseServlet")
public class DeleteCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;
        String classId = request.getParameter("id");

        if (userId != null && classId != null) {
            try (Connection conn = DBConnection.getConnection()) {
                // Ensure we only delete if it belongs to the logged-in user
                String sql = "DELETE FROM UserSchedules WHERE id = ? AND user_id = ?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setInt(1, Integer.parseInt(classId));
                ps.setString(2, userId);
                ps.executeUpdate();
                response.setStatus(200);
            } 
            
            catch (Exception e) {
                e.printStackTrace();
                response.setStatus(500);
            }
        }
    }
}