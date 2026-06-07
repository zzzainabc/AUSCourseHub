import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

@WebServlet("/toggleTask")
public class ToggleTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String taskId = request.getParameter("task_id");

        try (Connection conn = DBConnection.getConnection()) {

            String sql = "UPDATE tasks SET completed = NOT completed WHERE task_id = ?";

            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, Integer.parseInt(taskId));

            ps.executeUpdate();

            ps.close();
            conn.close();

            response.setContentType("text/plain");
            response.getWriter().print("success");

        } 
        
        catch (Exception e) {
            response.setStatus(500);
            response.getWriter().println("Error toggling task: " + e.getMessage());
        }
    }
}
