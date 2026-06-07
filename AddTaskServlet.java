import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/addTask")
public class AddTaskServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String courseId = request.getParameter("course_id");
        String taskName = request.getParameter("taskName");
        String dueDate = request.getParameter("taskDueDate");
        
        System.out.println("ADD TASK HIT");
        System.out.println("courseId = [" + courseId + "]");
        System.out.println("taskName = [" + taskName + "]");
        System.out.println("dueDate = [" + dueDate + "]");

        if (courseId == null || taskName == null || dueDate == null ||
            courseId.trim().isEmpty() || taskName.trim().isEmpty() || dueDate.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\":false,\"message\":\"Missing task fields\"}");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO tasks (course_id, task_name, due_date) VALUES (?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setInt(1, Integer.parseInt(courseId));
            ps.setString(2, taskName);
            ps.setDate(3, Date.valueOf(dueDate));

            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            int newTaskId = 0;
            if (rs.next()) {
                newTaskId = rs.getInt(1);
            }

            out.print("{\"success\":true,\"task\":{\"task_id\":" + newTaskId +
                    ",\"task_name\":\"" + escapeJson(taskName) + "\"," +
                    "\"due_date\":\"" + escapeJson(dueDate) + "\"," +
                    "\"course_id\":" + courseId + "}}");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}