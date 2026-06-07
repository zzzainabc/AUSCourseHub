import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/HomepageTodoServlet")
public class HomepageTodoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\":false,\"message\":\"Not logged in\"}");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "SELECT todo_id, task_text, completed FROM homepage_todos WHERE user_id = ? ORDER BY todo_id DESC";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ResultSet rs = ps.executeQuery();

            StringBuilder json = new StringBuilder();
            json.append("{\"success\":true,\"todos\":[");
            boolean first = true;

            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"todo_id\":").append(rs.getInt("todo_id")).append(",")
                    .append("\"task_text\":\"").append(escapeJson(rs.getString("task_text"))).append("\",")
                    .append("\"completed\":").append(rs.getBoolean("completed"))
                    .append("}");
                first = false;
            }

            json.append("]}");
            out.print(json.toString());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\":false,\"message\":\"Not logged in\"}");
            return;
        }

        String action = request.getParameter("action");

        try (Connection conn = DBConnection.getConnection()) {

            if ("add".equals(action)) {
                String taskText = request.getParameter("taskText");

                if (taskText == null || taskText.trim().isEmpty()) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print("{\"success\":false,\"message\":\"Task text is required\"}");
                    return;
                }

                String sql = "INSERT INTO homepage_todos (user_id, task_text, completed) VALUES (?, ?, false)";
                PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, userId);
                ps.setString(2, taskText.trim());
                ps.executeUpdate();

                ResultSet rs = ps.getGeneratedKeys();
                int newId = 0;
                if (rs.next()) {
                    newId = rs.getInt(1);
                }

                out.print("{\"success\":true,\"todo\":{\"todo_id\":" + newId +
                        ",\"task_text\":\"" + escapeJson(taskText.trim()) + "\",\"completed\":false}}");
            }

            else if ("toggle".equals(action)) {
                String todoId = request.getParameter("todoId");
                String completed = request.getParameter("completed");

                String sql = "UPDATE homepage_todos SET completed = ? WHERE todo_id = ? AND user_id = ?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setBoolean(1, Boolean.parseBoolean(completed));
                ps.setInt(2, Integer.parseInt(todoId));
                ps.setString(3, userId);

                int updated = ps.executeUpdate();
                out.print("{\"success\":" + (updated > 0) + "}");
            }

            else if ("delete".equals(action)) {
                String todoId = request.getParameter("todoId");

                String sql = "DELETE FROM homepage_todos WHERE todo_id = ? AND user_id = ?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setInt(1, Integer.parseInt(todoId));
                ps.setString(2, userId);

                int deleted = ps.executeUpdate();
                out.print("{\"success\":" + (deleted > 0) + "}");
            }

            else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"success\":false,\"message\":\"Invalid action\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}